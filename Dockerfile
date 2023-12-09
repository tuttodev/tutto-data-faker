FROM node:16-alpine

RUN npm i -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

EXPOSE 2426

RUN adduser -D tdf
USER tdf

CMD ["npm", "run", "start"]