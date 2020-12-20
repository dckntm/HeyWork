FROM python:3.8
ENV PYTHONUNBUFFERED=1
WORKDIR /heywork
COPY server/ .
COPY docker-entrypoint.sh .
RUN pip install --no-cache-dir -r requirements.txt
#ENTRYPOINT ["python", "manage.py","runserver", "0.0.0.0:8000"]
ENTRYPOINT ["./docker-entrypoint.sh"]