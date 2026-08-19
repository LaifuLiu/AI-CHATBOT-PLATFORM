from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://chatbot:chatbot_password@postgres:5432/chatbot_db"


engine = create_engine(DATABASE_URL)


SessionLocal = sessionmaker(bind=engine)
