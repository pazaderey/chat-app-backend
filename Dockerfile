FROM node:20-alpine AS appbuild
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile && yarn cache clean
COPY . .
RUN yarn build

FROM node:20-alpine
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile && yarn cache clean
COPY --from=appbuild /usr/src/app/dist ./dist
EXPOSE 9000
CMD ["yarn", "start:prod"]