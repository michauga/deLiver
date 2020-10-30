# podpinamy się pod jakiś już gotowy obraz
# podstawowa konfiguracja
FROM python:3-slim
WORKDIR /app

ADD app.py .
ADD requirements.txt .

RUN python -m pip install -r requirements.txt

CMD ["python", "app.py"]