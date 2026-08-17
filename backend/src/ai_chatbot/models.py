from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import Column, Integer, String, Text, ForeignKey


class Base(DeclarativeBase):
    pass







class Message(Base):

    __tablename__ = "messages"

    id = Column(
        Integer,
        primary_key=True
    )

    conversation_id = Column(
        Integer
    )

    role = Column(
        String
    )

    content = Column(
        Text
    )