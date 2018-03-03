const client = require('../config/redisClient').client;
var redisID = require('../config/redisClient').redisID;

module.exports = {
    create: async (ctx) => {

        var title = ctx.request.body.title;
        var body = ctx.request.body.body;
        var key = redisID;

        res = await client.hmset(key.toString(), "title", title, "body", body);

        redisID++;

        console.log(res);
    }
}