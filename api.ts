import { Router } from "https://deno.land/x/oak@v5.0.0/mod.ts";
import * as planets from './models/planets.ts'
import * as launches from './models/launches.ts'

const router = new Router();

// router.get('/', (ctx) => {
//   ctx.response.body = 'hello world2'
// })

router.get('/planets', (ctx) => {
  // ctx.throw(501, 'no planets yet!')
  ctx.response.body = planets.getAllPlanets();
})

router.get('/launches', (ctx) => {
  ctx.response.body = launches.getAllLaunches();
})

router.get('/launches/:id', (ctx) => {
  if (ctx.params?.id) {
    const launchesList = launches.getOneLaunch(Number(ctx.params.id))
    if (launchesList) {
      ctx.response.body = launchesList;
    } else {
      ctx.throw(400, 'Launch does not exists')
    }
  } 
})

export default router;