FROM node:16.17.1 as builder-front
LABEL stage=builder-front
WORKDIR /app/front/
COPY ./front/ /app/front/
RUN npm install && npm run build

FROM node:16.17.1 as builder-back
LABEL stage=builder-back
WORKDIR /app/back/
COPY ./back/ /app/back/
RUN npm install && npm run build

FROM node:16.17.1
WORKDIR /app/back/
COPY --from=builder-front /app/front/build /app/front/
COPY --from=builder-back /app/back/build /app/back/build/
COPY --from=builder-back /app/back/build/ /app/back/build/
COPY --from=builder-back /app/back/package.json /app/back/package-lock.json /app/back/swagger.yaml ./
COPY --from=builder-back /app/back/node_modules /app/back/node_modules/

ENTRYPOINT [ "npm" ]
CMD [ "run", "start" ]
EXPOSE 3000