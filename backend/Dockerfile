FROM python:3.8

ENV PYTHONUNBUFFERED=1
WORKDIR /heywork

COPY server/ ./server/
COPY docker-entrypoint.sh .

RUN pip install --no-cache-dir -r ./server/requirements.txt
ENTRYPOINT ["sh","./docker-entrypoint.sh"]


