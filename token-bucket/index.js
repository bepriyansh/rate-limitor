import TokenBucket from "./bucket.js";

const bucket = new TokenBucket(4, 4, 2);

const id = setInterval(() => {
  bucket.handleRequest('user1');
}, 200);


setTimeout(() => {
  clearInterval(id)
}, 10*1000);
