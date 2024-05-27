FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN pnpm install turbo --global

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

RUN pnpm run build

RUN pnpm deploy --filter=site --prod /prod/site
RUN pnpm deploy --filter=worker --prod /prod/worker

FROM base AS site
COPY --from=build /prod/site /prod/site
WORKDIR /prod/site
EXPOSE 3000
CMD ["node", "dist/server.js"]

FROM base AS worker
COPY --from=build /prod/worker /prod/worker
WORKDIR /prod/worker
CMD ["node", "dist/index.js"]
