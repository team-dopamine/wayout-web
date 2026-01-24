FROM node:21.2.0-alpine
WORKDIR /app
RUN npm install -g serve
COPY build ./build
EXPOSE 80
CMD ["serve", "-s", "build", "-l", "80"]