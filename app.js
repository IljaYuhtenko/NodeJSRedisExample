var requires = require('./config/requires');
var client = require('./config/redisClient');

const app = new requires.koa();
const router = new requires.router();

app.use(requires.bodyParser())
    .use(requires.logger());

router.get('/', async ctx => {
    ctx.body = "Hello, World";
});

app.use(router.routes())
    .use(router.allowedMethods());

app.listen(8000, () => {
    console.log("Server running on port 8000");
});