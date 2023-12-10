# Flask and Flask-RESTful related imports
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, create_refresh_token
from flask import request



# Marshmallow related imports
from marshmallow import ValidationError

# Model and Schema related imports
from ..models.models import (
    User, Tournament, Match,
    UserSchema, TournamentSchema, MatchSchema, RegistrationSchema,
    bcrypt, db
)

# Instantiate Schemas here for use across the resources
user_schema = UserSchema()
users_schema = UserSchema(many=True)

tournament_schema = TournamentSchema()
tournaments_schema = TournamentSchema(many=True)

match_schema = MatchSchema()
matches_schema = MatchSchema(many=True)

registration_schema = RegistrationSchema()