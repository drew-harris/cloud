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

FROM base AS server
COPY --from=build /usr/src/app/server/dist /prod/server/dist
WORKDIR /prod/server

EXPOSE 3000

CMD ["node", "dist/index.js"]

