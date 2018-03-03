const requires = require('./config/requires');
const routes = require('./routes/routes');

const app = new requires.koa();
const router = new requires.router();

app.use(requires.bodyParser())
    .use(requires.logger());

//Create routes
router.post('/', routes.create);

//Read routes
router.get('/', routes.getAll);
/* router.get('/:id', routes.get);

//Update routes
router.put('/:id', routes.update);

//Delete route
router.delete('/:id', routes.delete); */

app.use(router.routes())
    .use(router.allowedMethods());

app.listen(8000, () => {
    console.log("Server running on port 8000");
});