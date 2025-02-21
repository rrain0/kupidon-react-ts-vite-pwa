FROM node:20-alpine AS build
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile
COPY . .
ARG BACKEND_BASE_URL
ENV BACKEND_BASE_URL=$BACKEND_BASE_URL
RUN yarn run build


FROM nginx:1.25.5-alpine
WORKDIR /app
COPY --from=build /app/dist .


LABEL authors="rrain"