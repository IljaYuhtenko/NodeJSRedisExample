var bluebird = require('bluebird');

var redis = require('redis');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

//In case your DB in other server use redis.createClient(port, host)
var client = redis.createClient();
client.auth('mySuperStrongRedisDatabasePass');

client.on("error", (err) => {
    console.log("Error: " + err);
})

client.set("test", "test body", redis.print);
client.get("test", redis.print);
client.del("test", redis.print);
client.getAsync("test").then( (res) => {
    console.log(res);
})

client.quit();