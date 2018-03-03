module.exports = {
    koa: require('koa'),
    redis: require('redis'),
    router: require('koa-router'), 
    logger: require('koa-logger'),
    bluebird: require('bluebird'),
    bodyParser: require('koa-bodyparser'),
    redisPass: 'mySuperStrongRedisDatabasePass'
};