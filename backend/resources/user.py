from .common import (
    Resource, jwt_required, ValidationError, user_schema, users_schema, db, bcrypt, request, get_jwt_identity, create_access_token, create_refresh_token
)

from backend.models.models import User


class UserResource(Resource):
    @jwt_required()
    def get(self, id):
        user = User.query.get_or_404(id)
        return user_schema.dump(user)

    def put(self, id):
        user = User.query.get_or_404(id)

        try:
            args = user_schema.load(request.json)
        except ValidationError as err:
            return err.messages, 400

        if not user.check_password(args['password']):
            user.set_password(args['password'])

        user.username = args['username']
        user.email = args['email']
        user.status = args['status']
        user.role = args['role']

        db.session.commit()
        return user_schema.dump(user)

    @jwt_required()
    # @limiter.limit("5 per minute")
    def delete(self, id):
        current_user = get_jwt_identity()
        user = User.query.get_or_404(id)

        if current_user.role != 'admin':
            return {'message': 'Permission denied'}, 403
        # Call the archive and delete function
        # archive_and_delete_user(id)
        db.session.delete(user)
        db.session.commit()
        return {'message': 'User deleted'}


class UserListResource(Resource):
    @jwt_required()
    def get(self):
        users = User.query.all()
        return users_schema.dump(users)

    def post(self):
        try:
            args = user_schema.load(request.json)
        except ValidationError as err:
            return err.messages, 400

        hashed_password = bcrypt.generate_password_hash(
            args['password']).decode('utf-8')
        new_user = User(
            username=args['username'],
            email=args['email'],
            # status=args['status'],
            role=args['role']
        )
        new_user.set_password(args['password'])

        db.session.add(new_user)
        db.session.commit()
        return user_schema.dump(new_user), 201

# resource endpoint to fetch all matches (both current and historical) for a specific user.
# class UserMatchResource(Resource):
    # @jwt_required()
#     def get(self, user_id):
#         matches = get_all_matches_for_user(user_id)
#         # Convert matches to appropriate schema or format before returning
#         return {"matches": [match_schema.dump(match) for match in matches]}


class UserRegistrationResource(Resource):
    def post(self):
        try:
            args = user_schema.load(request.json)

            if User.query.filter_by(username=args['username']).first():
                return {'message': 'Username already exists'}, 400

            if User.query.filter_by(email=args['email']).first():
                return {'message': 'Email already exists'}, 400

            hashed_password = bcrypt.generate_password_hash(
                args['password']).decode('utf-8')
            new_user = User(
                username=args['username'],
                email=args['email'],
                # default to 'user' if no role provided
                role=args.get('role', 'user')
            )
            new_user.set_password(args['password'])
            db.session.add(new_user)
            db.session.commit()

            access_token = create_access_token(identity=new_user.user_id)
            return {
                "user": user_schema.dump(new_user),
                "access_token": access_token
            }, 201
        except ValidationError as err:
            return err.messages, 400


class UserLoginResource(Resource):
    def post(self):
        try:
            data = request.get_json()
            username = data.get('username')
            password = data.get('password')
        except ValidationError as err:
            return err.messages, 400

        user = User.query.filter_by(username=username).first()

        if user and user.check_password(password):
            access_token = create_access_token(identity=user.user_id, fresh=True)
            refresh_token = create_refresh_token(identity=user.user_id)
            user_data = user_schema.dump(user)
            return {
                "user": user_data,  # include user data
                "access_token": access_token,
                "refresh_token": refresh_token,
            }, 200
        else:
            return {"message": "Invalid credentials"}, 401

class TokenRefreshResource(Resource):
    @jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity()
        new_access_token = create_access_token(identity=current_user, fresh=False)
        return {'access_token': new_access_token}, 200
