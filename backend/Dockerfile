FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install \
  --no-cache-dir \
  -i https://mirrors.aliyun.com/pypi/simple/ \
  -r requirements.txt

COPY src/ai_chatbot/main.py .
COPY src/ai_chatbot/database.py .
COPY src/ai_chatbot/models.py .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]