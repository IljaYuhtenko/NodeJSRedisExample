const redis = require('redis');
const cred = require('./credentials');
const bluebird = require('bluebird');
const redisPass = 'mySuperStrongRedisDatabasePass';
const redisID = 0;

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

var client = redis.createClient(cred.port, cred.host);
client.auth(redisPass);

client.on("error", (err) => {
    console.log("Error: " + err);
})

module.exports.client = client;
module.exports.redisID = redisID;