module.exports = {
    pg: require('pg'),
    koa: require('koa'),
    router: require('koa-router'), 
    logger: require('koa-logger'),
    bodyParser: require('koa-bodyparser'),
    redisPass: 'mySuperStrongRedisDatabasePass'
};