FROM node:20-alpine
WORKDIR /app
RUN npm install -g serve
COPY build ./build
EXPOSE 80
CMD ["serve", "-s", "build", "-l", "80"]