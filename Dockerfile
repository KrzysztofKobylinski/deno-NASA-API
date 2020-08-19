FROM hayd/deno:alpine-1.3.0

WORKDIR /app

COPY . .

USER deno

CMD ["run," "--allow-net", "--allow-read", "src/mod.ts"]

EXPOSE 8000