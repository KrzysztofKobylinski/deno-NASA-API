import { Application } from "https://deno.land/x/oak@v5.0.0/mod.ts";

const app = new Application();
const PORT = 8000;

app.use((ctx) => {
  ctx.response.body = 'Hello world';
})

if (import.meta.main) {
  await app.listen({
    port: PORT,
  });
}

