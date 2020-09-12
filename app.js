const Koa = require('koa');
const app = new Koa();
const router = require('./router');
const cors = require('koa2-cors');
const connection = require('./db'); // 连接数据库

app.use(cors());

app.use(async (ctx, next) => {
    console.log(`请求方法: ${ctx.method}`);
    console.log(`请求路径: ${ctx.url}`);

    await next();
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(4044, () => {
    console.log("please visit http://localhost:4044");
});