"""added new tournament fields

Revision ID: 9f93c3277764
Revises: 
Create Date: 2023-12-10 08:57:12.274782

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '9f93c3277764'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('match_histories')
    with op.batch_alter_table('tournaments', schema=None) as batch_op:
        batch_op.add_column(sa.Column('rules', sa.String(length=1000), nullable=True))
        batch_op.add_column(sa.Column('player_cap', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('entry_cost', sa.Float(), nullable=True))
        batch_op.add_column(sa.Column('start_time', sa.DateTime(), nullable=True))
        batch_op.add_column(sa.Column('stage', sa.String(length=50), nullable=True))
        batch_op.alter_column('start_date',
               existing_type=sa.DATE(),
               type_=sa.DateTime(),
               existing_nullable=True)
        batch_op.alter_column('end_date',
               existing_type=sa.DATE(),
               type_=sa.DateTime(),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tournaments', schema=None) as batch_op:
        batch_op.alter_column('end_date',
               existing_type=sa.DateTime(),
               type_=sa.DATE(),
               existing_nullable=True)
        batch_op.alter_column('start_date',
               existing_type=sa.DateTime(),
               type_=sa.DATE(),
               existing_nullable=True)
        batch_op.drop_column('stage')
        batch_op.drop_column('start_time')
        batch_op.drop_column('entry_cost')
        batch_op.drop_column('player_cap')
        batch_op.drop_column('rules')

    op.create_table('match_histories',
    sa.Column('match_history_id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('original_match_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('tournament_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('player1', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('player2', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('winner', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('archived_on', postgresql.TIMESTAMP(), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('match_history_id', name='match_histories_pkey')
    )
    # ### end Alembic commands ###