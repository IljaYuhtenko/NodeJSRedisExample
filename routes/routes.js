const client = require('../config/redisClient').client;
var redisID = require('../config/redisClient').redisID;

module.exports = {
    create: async (ctx) => {

        var title = ctx.request.body.title;
        var body = ctx.request.body.body;
        var key = redisID;

        let res = await client.hmsetAsync(key.toString(), "title", title, "body", body);

        redisID++;

        console.log(res);
    },
    getAll: async (ctx) => {
        let keys = await client.keysAsync("*");
        ctx.body = "";
        for (let key of keys) {
            let title = await client.hgetAsync(key, 'title');
            let body = await client.hgetAsync(key, 'body');
            ctx.body += title + ": " + body + "\n";
        };
    }
}