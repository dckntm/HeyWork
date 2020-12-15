FROM node:alpine AS builder   

WORKDIR /heywork
COPY client .

RUN npm install
RUN npm run ng -- build --prod
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /heywork/dist/client /var/www/html