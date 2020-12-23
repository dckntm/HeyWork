FROM python:3.8
ENV PYTHONUNBUFFERED=1
WORKDIR /heywork
COPY server/ .
COPY docker-entrypoint.sh .
RUN pip install --no-cache-dir -r requirements.txt
ENTRYPOINT ["./docker-entrypoint.sh"]