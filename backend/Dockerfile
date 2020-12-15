FROM python:3.8
ENV PYTHONUNBUFFERED=1
WORKDIR /heywork
COPY server/ .
RUN pip install --no-cache-dir -r requirements.txt

ENTRYPOINT ["python", "manage.py","runserver", "127.0.0.1:4200"]