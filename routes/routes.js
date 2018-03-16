const client = require('../config/redisClient').client;
const pgClient = require('../config/postgresql').pgClient;
var redisID = require('../config/redisClient').redisID;

async function sync () {
    let res = await pgClient.query('SELECT "redisID" FROM "public"."RedisID"');
    redisID = res.rows[0].redisID;

    res = await pgClient.query('SELECT * FROM "public"."Notes"');

    for(let row of res.rows) {
        client.hmsetAsync(row.redisID, "title", row.title, "body", row.body);
    }
}

module.exports = {
    create: async (ctx) => {

        let title = ctx.request.body.title;
        let body = ctx.request.body.body;
        let key = redisID;

        if (key == 0) {
            await sync();
            key = redisID;
        }
 
        client.hmsetAsync(key.toString(), "title", title, "body", body);

        pgClient.query('INSERT INTO "Notes" VALUES($1, $2, $3)', [redisID, title, body]);

        redisID++;

        pgClient.query('UPDATE "public"."RedisID" SET "redisID" = $1', [redisID]);

        ctx.status = 200;


    },
    getAll: async (ctx) => {
        let test = await sync();
        let keys = await client.keysAsync("*");

        if (keys.length === 0) {
            await sync();
            keys = await client.keysAsync("*");
        }

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

        if (title === null || body === null) {
            await sync();
            title = await client.hgetAsync(key, 'title');
            body = await client.hgetAsync(key, 'body');
        }
        
        ctx.body = title + ": " + body + "\n";
    },
    update: async (ctx) => {
        let key = ctx.params.id;
        let title = ctx.request.body.title;
        let body = ctx.request.body.body;

        let check = await client.hgetAsync(key, 'title');

        if (check === null) {
            await sync();
            check = await client.hgetAsync(key, 'title');
        }
        if (check !== null) {
            client.hmsetAsync(key, 'title', title, 'body', body);

            pgClient.query('UPDATE "public"."Notes" SET "title" = $1, "body" = $2 WHERE "redisID" = $3', 
                [title, body, key]);
            
        }

        ctx.redirect('/' + key);
    },
    delete: async (ctx) => {
        let key = ctx.params.id;

        client.hdelAsync(key, 'title', 'body');

        pgClient.query('DELETE FROM "public"."Notes" WHERE "redisID" = $1', [key]);

        ctx.redirect('/');
    }
}