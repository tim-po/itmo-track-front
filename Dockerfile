FROM node:16.14.0

ARG TAG
ARG DOMAIN

LABEL application="itmo.track-frontend"
LABEL traefik.http.routers.itmo-track-frontend-${TAG}.rule=Host(`${DOMAIN}`)
LABEL traefik.http.routers.itmo-track-frontend-${TAG}.entrypoints=websecure
LABEL traefik.http.routers.itmo-track-frontend-${TAG}.tls.certresolver=myresolver
LABEL entrypoints.web.http.redirections.entryPoint.to=websecure
LABEL traefik.enable=true

COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["serve", "-s", "build"]
