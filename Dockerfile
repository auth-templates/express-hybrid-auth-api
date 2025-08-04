# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --ignore-scripts

COPY . .
RUN npm run prisma:generate
RUN npm run build  # e.g., tsc to compile TS to JS

# Stage 2: Production image
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production --ignore-scripts

# Install tsx for seeding in production
RUN npm install -g tsx

COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./
COPY --from=builder /app/generated/prisma ./generated/prisma
COPY --from=builder /app/public ./public
COPY --from=builder /app/src/swagger-extra.yaml ./src/swagger-extra.yaml
# COPY --from=builder /app/.env ./.env

EXPOSE 3000

CMD ["node", "src/index.js"]
