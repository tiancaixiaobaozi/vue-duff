FROM nginx
COPY ./dist/ /usr/share/nginx/html/
COPY ./nginx.conf /etc/nginx/conf.d/vue-cli3-demo.conf
EXPOSE 80
