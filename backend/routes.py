
# , UserMatchResource,
from backend.resources.user import UserResource, UserListResource, UserRegistrationResource, UserLoginResource, TokenRefreshResource
from backend.resources.tournament import TournamentResource, TournamentListResource, TournamentRegistrationResource
from backend.resources.match import MatchResource, MatchListResource


def initialize_routes(api):

    api.add_resource(UserResource, '/users/<int:id>')
    api.add_resource(UserListResource, '/users')
    api.add_resource(TournamentResource, '/tournaments/<int:id>')
    api.add_resource(TournamentListResource, '/tournaments')
    api.add_resource(MatchResource, '/matches/<int:id>')
    api.add_resource(MatchListResource, '/matches')
    api.add_resource(UserRegistrationResource, '/register')
    api.add_resource(UserLoginResource, '/login')
    api.add_resource(TournamentRegistrationResource, '/registerTournament')
    api.add_resource(TokenRefreshResource, '/refresh')
    # api.add_resource(UserMatchResource, '/users/<int:user_id>/matches')
