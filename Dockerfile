FROM node:20-alpine AS build
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
ARG API_BASE_URL
ENV API_BASE_URL $API_BASE_URL
RUN yarn run build


FROM nginx:1.25.5-alpine
WORKDIR /app
COPY --from=build /app/dist .


LABEL authors="rrain"