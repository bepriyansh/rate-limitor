import LeakyBucket from "./bucket.js";

const bucket = new LeakyBucket(5, 1); // Bucket capacity of 4 and leak rate of 1 request per second

const id = setInterval(() => {
    bucket.handleRequest('user1');
  }, 200);

setTimeout(() => {
    clearInterval(id);
}, 10 * 1000);