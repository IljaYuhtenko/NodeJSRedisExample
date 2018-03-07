const client = require('../config/redisClient').client;
const redisID = require('../config/redisClient').redisID;

module.exports = {
    create: async (ctx) => {

        let title = ctx.request.body.title;
        let body = ctx.request.body.body;
        let key = redisID;

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
            ctx.body += key + ") " + title + ": " + body + "\n";
        };
    },
    get: async (ctx) => {
        let key = ctx.params.id;
        let title = await client.hgetAsync(key, 'title');
        let body = await client.hgetAsync(key, 'body');
        ctx.body = title + ": " + body + "\n";
    },
    update: async (ctx) => {
        let key = ctx.params.id;
        let title = ctx.request.body.title;
        let body = ctx.request.body.body;

        client.hmsetAsync(key, 'title', title, 'body', body);

        ctx.redirect('/' + key);
    },
    delete: async (ctx) => {
        let key = ctx.params.id;

        client.hdelAsync(key, 'title', 'body');

        ctx.redirect('/');
    }
}