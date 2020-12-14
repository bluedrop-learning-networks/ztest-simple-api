FROM node:8.17-alpine AS build

# The 'newrelic' npm module builds on `npm install --production`, it requires g++, make, and python
RUN apk --no-cache add \
	g++ \
	make \
	python

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --production \
    && npm install --production 'newrelic@^6.13.0'

FROM node:8.17-alpine

WORKDIR /app

COPY --from=build /app/ ./
COPY . ./

ENV NEW_RELIC_NO_CONFIG_FILE=true

CMD ["node", "src/start.js"]
