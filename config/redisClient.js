const redis = require('redis');
const bluebird = require('bluebird');
const redisPass = 'mySuperStrongRedisDatabasePass';

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

var client = redis.createClient(6789, '185.124.188.91');
client.auth(redisPass);

client.on("error", (err) => {
    console.log("Error: " + err);
})

module.exports = client;