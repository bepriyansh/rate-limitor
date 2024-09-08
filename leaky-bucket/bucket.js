import chalk from 'chalk';

export default class LeakyBucket {
  constructor(capacity, leakRate) {
    this.capacity = capacity; // Maximum capacity of the bucket
    this.leakRate = leakRate; // Rate at which the bucket leaks (requests per second)
    this.db = {};
  }

  createBucket(key) {
    if (this.db[key] === undefined) {
      this.db[key] = {
        water: 0, // Current number of requests in the bucket
        ts: Date.now(), // Timestamp of the last leak
      };
    }
    return this.db[key];
  }

  leakBucket(key) {
    if (this.db[key] === undefined) return null;

    const bucket = this.db[key];
    const currentTime = Date.now();
    const elapsedTime = (currentTime - bucket.ts) / 1000; // Convert to seconds
    const leakedWater = elapsedTime * this.leakRate;

    // Calculate the remaining water after leaking
    bucket.water = Math.max(0, bucket.water - leakedWater);
    bucket.ts = currentTime; // Update the timestamp after leaking

    return bucket;
  }

  handleRequest(key) {
    let bucket = this.createBucket(key);

    bucket = this.leakBucket(key); // Leak water first

    // If the bucket is full, reject the request
    if (bucket.water >= this.capacity) {
      console.log(
        chalk.red(
          `Request[REJECTED] for ${key} (water - ${
            bucket.water.toFixed(2)
          }) -- ${new Date().toLocaleTimeString()}`
        )
      );
      return false;
    }

    // Accept the request and add it to the bucket
    bucket.water += 1;
    console.log(
      chalk.green(
        `Request[ACCEPTED] for ${key} (water - ${
          bucket.water.toFixed(2)
        }) -- ${new Date().toLocaleTimeString()}`
      )
    );

    return true;
  }
}