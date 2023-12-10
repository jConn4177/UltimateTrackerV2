"""
models.py

This module defines the database models and relationships using SQLAlchemy ORM.
It also sets up essential utilities like Bcrypt for password hashing.
"""

from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from marshmallow import Schema, fields


metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)
bcrypt = Bcrypt()


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    role = db.Column(db.String(80), nullable=True)

    registrations = db.relationship(
        'Registration', back_populates='user', lazy=True)

    serialize_rules = ('-registrations.user',)

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(
            password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

    @validates('username')
    def validate_name(self, key, name):
        if not isinstance(name, str):
            raise AssertionError('Name must be a string')
        if len(name) < 2:
            raise AssertionError('Name must be at least two characters long')
        return name

    @validates("email")
    def validate_email(self, key, email):
        if not isinstance(email, str):
            raise AssertionError("Email must be a string")
        if len(email) < 2:
            raise AssertionError(
                "Email must be a minimum of 2 characters long")
        return email

    def __repr__(self):
        return f'(id={self.user_id}, name={self.username} email={self.email})'


class UserSchema(Schema):
    # Only included when serializing to JSON.
    user_id = fields.Int(dump_only=True)
    username = fields.Str(required=True)
    email = fields.Email(required=True)
    # Only included when deserializing from JSON.
    password = fields.Str(load_only=True)
    role = fields.Str()


class Tournament(db.Model, SerializerMixin):
    __tablename__ = 'tournaments'
    tournament_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    format = db.Column(db.String(80))
    venue = db.Column(db.String(80))
    start_date = db.Column(db.DateTime)
    end_date = db.Column(db.DateTime)
    rules = db.Column(db.String(1000))  # Assuming 1000 characters limit
    player_cap = db.Column(db.Integer)
    entry_cost = db.Column(db.Float, nullable=True)  # Optional
    start_time = db.Column(db.DateTime)
    stage = db.Column(db.String(50), default='preliminary')

    matches = db.relationship('Match', back_populates='tournament', lazy=True)
    registrations = db.relationship(
        'Registration', back_populates='tournament', lazy=True)

    serialize_rules = ('-matches', '-registrations')


class TournamentSchema(Schema):
    class Meta:
        model = Tournament

    # Only included when serializing to JSON.
    tournament_id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    format = fields.Str(required=True)
    venue = fields.Str(required=True)
    start_date = fields.DateTime(required=True)
    end_date = fields.DateTime(required=True)
    rules = fields.Str()
    player_cap = fields.Int()
    entry_cost = fields.Float()
    start_time = fields.DateTime()
    stage = fields.Str()


class Match(db.Model, SerializerMixin):
    __tablename__ = 'matches'
    match_id = db.Column(db.Integer, primary_key=True)
    tournament_id = db.Column(db.Integer, db.ForeignKey(
        'tournaments.tournament_id'), nullable=False)
    player1 = db.Column(db.Integer, db.ForeignKey(
        'users.user_id'), nullable=False)
    player2 = db.Column(db.Integer, db.ForeignKey(
        'users.user_id'), nullable=False)
    winner = db.Column(db.Integer, db.ForeignKey('users.user_id'))

    tournament = db.relationship('Tournament', back_populates='matches')

    serialize_rules = ('-tournament',)


class MatchSchema(Schema):
    # Only included when serializing to JSON.
    match_id = fields.Int(dump_only=True)
    tournament_id = fields.Int(required=True)
    player1 = fields.Int(required=True)
    player2 = fields.Int(required=True)
    winner = fields.Int(allow_none=True)


class Registration(db.Model, SerializerMixin):
    __tablename__ = 'registrations'
    registration_id = db.Column(db.Integer, primary_key=True)
    tournament_id = db.Column(db.Integer, db.ForeignKey(
        'tournaments.tournament_id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.user_id'), nullable=False)

    user = db.relationship('User', back_populates='registrations')
    tournament = db.relationship('Tournament', back_populates='registrations')

    serialize_rules = ('-user', '-tournament')


class RegistrationSchema(Schema):
    registration_id = fields.Int(dump_only=True)
    tournament_id = fields.Int(required=True)
    user_id = fields.Int(required=True)

# class MatchHistory(db.Model, SerializerMixin):
#     __tablename__ = 'match_histories'
#     match_history_id = db.Column(db.Integer, primary_key=True)
#     original_match_id = db.Column(db.Integer, nullable=False)
#     tournament_id = db.Column(db.Integer, nullable=False)
#     player1 = db.Column(db.Integer, nullable=True)
#     player2 = db.Column(db.Integer, nullable=True)
#     winner = db.Column(db.Integer, nullable=True)
#     archived_on = db.Column(db.DateTime, default=db.func.current_timestamp())
#     serialize_rules = ()