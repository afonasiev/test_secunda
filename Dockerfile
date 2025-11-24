FROM node:20-alpine AS base
#FROM node:20-slim AS base

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm i

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN corepack enable && pnpm run build

FROM base AS runner
WORKDIR /app
COPY --from=builder /app .
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]