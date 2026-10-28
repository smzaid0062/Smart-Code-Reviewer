#-------------------Stage 1: dependency build-------------------
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

#-------------------Stage 2: Production-------------------
FROM node:20-alpine AS production
ENV NODE_ENV=production
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Create writable folders for the named volumes, owned by the node user
RUN mkdir -p /app/data /app/logs && chown -R node:node /app/data /app/logs

EXPOSE 3000

USER node

CMD ["node", "server.js"]