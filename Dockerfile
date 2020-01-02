FROM nginx
MAINTAINER mydoge "mydoge@foxmail.com"

COPY ./dist/ /usr/share/nginx/html/
RUN rm /etc/nginx/conf.d/*
COPY ./nginx.conf /etc/nginx/conf.d/vue-cli3-demo.conf

EXPOSE 80

ENTRYPOINT ["nginx","-g","daemon off;"]
