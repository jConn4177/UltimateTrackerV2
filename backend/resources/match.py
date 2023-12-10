from .common import (
    Resource, jwt_required, ValidationError, match_schema, matches_schema, db, request
)
from backend.models.models import Match


class MatchResource(Resource):
    @jwt_required()
    def get(self, id):
        match = Match.query.get_or_404(id)
        return match_schema.dump(match)

    def put(self, id):
        match = Match.query.get_or_404(id)

        try:
            args = match_schema.load(request.json)
        except ValidationError as err:
            return err.messages, 400

        match.description = args['description']
        # ... Assign other fields from args ...

        db.session.commit()
        return match_schema.dump(match)

    def delete(self, id):
        match = Match.query.get_or_404(id)
        db.session.delete(match)
        db.session.commit()
        return {'message': 'Match deleted'}


class MatchListResource(Resource):
    @jwt_required()
    def get(self):
        matches = Match.query.all()
        return matches_schema.dump(matches)

    def post(self):
        try:
            args = match_schema.load(request.json)
        except ValidationError as err:
            return err.messages, 400

        new_match = Match(description=args['description'])
        # ... Assign other fields from args ...

        db.session.add(new_match)
        db.session.commit()
        return match_schema.dump(new_match), 201
