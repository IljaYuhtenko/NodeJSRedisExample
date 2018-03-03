const redis = require('redis');
const redisPadd = 'mySuperStrongRedisDatabasePass';

var client = require.redis.createClient();
client.auth(require.redisPass);

client.on("error", (err) => {
    console.log("Error: " + err);
})

module.exports = client;