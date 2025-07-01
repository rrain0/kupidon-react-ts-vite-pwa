FROM node:20-alpine AS build
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile
COPY . .
ARG BACKEND_HOST
ARG BACKEND_PORT
ENV BACKEND_HOST=$BACKEND_HOST
ENV BACKEND_PORT=$BACKEND_PORT
RUN yarn run build


FROM nginx:1.25.5-alpine
WORKDIR /app
COPY --from=build /app/dist .


LABEL authors="rrain"