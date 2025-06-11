FROM node:23-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install

FROM node:23-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV RUN_MIGRATION=true

COPY --from=deps /app/node_modules ./node_modules
COPY . .

EXPOSE 3000

CMD if [ "$RUN_MIGRATION" = "true" ]; then \
   echo "Running DB migration..." && \
   npx @better-auth/cli migrate --y || exit 1; \
  fi && \
  echo "Running build..." && \
  npm run build && \
  npm start
