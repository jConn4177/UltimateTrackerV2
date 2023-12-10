from .common import (
    Resource, jwt_required, db, request, ValidationError, tournament_schema, tournaments_schema, user_schema, registration_schema
)

from backend.models.models import Tournament


class TournamentResource(Resource):
    # @jwt_required()
    def get(self, id):
        tournament = Tournament.query.get_or_404(id)
        return tournament_schema.dump(tournament)

    def put(self, id):
        tournament = Tournament.query.get_or_404(id)

        try:
            args = tournament_schema.load(request.json)
        except ValidationError as err:
            return err.messages, 400

        tournament.name = args['name'],
        tournament.format=args['format'],
        tournament.venue=args['venue'],
        tournament.start_date=args['start_date'],
        tournament.end_date=args['end_date'],
        tournament.rules = args['rules']
        tournament.player_cap = args['player_cap']
        tournament.entry_cost = args['entry_cost']
        tournament.start_time = args['start_time']
        tournament.stage = 'next_stage'  # Update this as required

        db.session.commit()
        return tournament_schema.dump(tournament)

    def delete(self, id):
        tournament = Tournament.query.get_or_404(id)
        db.session.delete(tournament)
        db.session.commit()
        return {'message': 'Tournament deleted'}


class TournamentListResource(Resource):
    # @jwt_required()
    def get(self):
        tournaments = Tournament.query.all()
        return tournaments_schema.dump(tournaments), 200

    def post(self):
        try:
            args = tournament_schema.load(request.json)
        except ValidationError as err:
            return err.messages, 400

        new_tournament = Tournament(
            name=args['name'],
            format=args['format'],
            venue=args['venue'],
            start_date=args['start_date'],
            end_date=args['end_date']
            # Other fields can be added as needed
        )

        db.session.add(new_tournament)
        db.session.commit()
        return {"id": new_tournament.tournament_id, "data": tournament_schema.dump(new_tournament)}, 201

class TournamentRegistrationResource(Resource):
    @jwt_required()
    def post(self, tournament_id):
        current_user_id = get_jwt_identity()  # Get this from JWT token
        new_registration = Registration(
            tournament_id=tournament_id,
            user_id=current_user_id
        )
        db.session.add(new_registration)
        db.session.commit()
        return {"message": "Registered successfully"}, 201