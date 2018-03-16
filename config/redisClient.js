const redis = require('redis');
const cred = require('./credentials');
const bluebird = require('bluebird');
var redisID = 0;

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

var client = redis.createClient(cred.port, cred.host);
client.auth(cred.redisPass);

client.on("error", (err) => {
    console.log("Error: " + err);
})

/* client.on("ready", async () => {
    let res = await pgClient.query('SELECT "redisID" FROM "public"."RedisID"');
    redisID = res.rows[0].redisID;
    module.exports.redisID = redisID;
    redisID = res.rows[0].redisID;
    console.log("Successfully synced, " + redisID);
})
 */
module.exports.client = client;
module.exports.redisID = redisID;