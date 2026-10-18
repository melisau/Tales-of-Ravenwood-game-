FROM node:22-bookworm-slim AS build
WORKDIR /app
COPY client/package*.json ./client/
COPY server/package*.json ./server/
RUN npm ci --prefix client && npm ci --prefix server
COPY client ./client
COPY server ./server
COPY shared ./shared
COPY story ./story
RUN npm run typecheck --prefix server && npm test --prefix server \
    && npm run build --prefix client && npm run build --prefix server

FROM node:22-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY server/package*.json ./server/
RUN npm ci --prefix server --omit=dev && npm cache clean --force
COPY --from=build /app/server/dist ./server/dist
COPY --from=build /app/client/dist ./client/dist
COPY --from=build /app/story ./story
USER node
EXPOSE 3000
CMD ["node", "server/dist/index.js"]
