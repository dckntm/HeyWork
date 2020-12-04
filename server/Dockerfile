FROM python:3.8
ENV PYTHONUNBUFFERED=1
RUN mkdir /heywork
WORKDIR /heywork
COPY requirements.txt /heywork/
RUN pip install -r requirements.txt
COPY . /heywork/