import * as Koa from 'koa';
import * as http from 'http';
import * as Router from 'koa-router';
import * as bodyparser from 'koa-bodyparser';

import validate from './lib/controllers/validate';

import login from './lib/routes/auth/login';
import register from './lib/routes/auth/register';
import setting from './lib/routes/auth/setting';

const app = new Koa();
const server = http.createServer(app.callback());
const router = new Router({
  prefix: '/api',
});

// logger
app.use(async (ctx, next) => {
  console.time(`${ctx.method} ${ctx.url}`);
  await next();
  console.timeEnd(`${ctx.method} ${ctx.url}`);
})

app
  .use(bodyparser())
  .use(validate)
  .use(router.routes())
  .use(router.allowedMethods())

router
  .use('/auth', login.routes(), login.allowedMethods())
  .use('/auth', register.routes(), register.allowedMethods())
  .use('/user', setting.routes(), setting.allowedMethods())

export default server;