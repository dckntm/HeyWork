FROM python:3.8
ENV PYTHONUNBUFFERED 1
RUN mkdir /project
WORKDIR /project
COPY requirements.txt /project/
RUN pip install --upgrade pip && pip install -r requirements.txt
ADD . /project/ 