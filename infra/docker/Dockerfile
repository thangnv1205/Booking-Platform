# Generic Dockerfile for every service in this monorepo — build with:
#   docker build -f infra/docker/Dockerfile --build-arg APP_NAME=booking-service -t booking-service .
#
# One Dockerfile instead of seven near-identical copies: every app here is a
# plain Node process (Nest webpack bundle or esbuild bundle) that only differs
# by name, so the only thing that changes between builds is APP_NAME.
#
# Runtime deps come from installing the WHOLE workspace's root package.json,
# not each app's Nx-generated scoped package.json (dist/apps/<app>/package.json).
# That scoped file is built by statically scanning source for import/require
# calls, which misses anything only reached via dynamic require — TypeORM picks
# its DB driver (`pg`) that way, so a Postgres-backed service would build fine
# and then crash on boot with "Postgres package has not been found installed."
# Installing the full workspace trades a larger image for not having to special-
# case every driver-style dependency by hand.

FROM node:22-alpine AS build
ARG APP_NAME
WORKDIR /workspace

RUN corepack enable
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps ./apps
COPY libs ./libs
COPY tsconfig.base.json nx.json ./

RUN pnpm install --frozen-lockfile
RUN pnpm exec nx build ${APP_NAME} --configuration=production

FROM node:22-alpine AS runtime
ARG APP_NAME
ENV NODE_ENV=production
WORKDIR /app

RUN corepack enable
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile --ignore-scripts
COPY --from=build /workspace/dist/apps/${APP_NAME}/main.js ./main.js

# The RS256 keypair is dev-only material — never baked into the image. Mount it read-only
# at runtime instead (docker run -v $(pwd)/infra/keys:/app/infra/keys:ro), and set
# JWT_PUBLIC_KEY_PATH/JWT_PRIVATE_KEY_PATH accordingly; a real deployment sources it from
# Vault/K8s Secret rather than a mounted file at all.

EXPOSE 4000-4006
CMD ["node", "main.js"]
