#-------------------Stage 1 dependency build-------------------
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev


#------------Stage 2: Production------------#
FROM node:20-alpine AS production

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

EXPOSE 3000

USER node

CMD ["node", "server.js"]
