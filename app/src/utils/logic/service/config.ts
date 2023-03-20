import redis, { createClient } from "redis";

export class Config {
  private _redisClient = createClient();

  constructor() {
    this._redisClient.connect();

    this._redisClient.on("connect", () => {
      console.log("Redis client connected");
    });
  }

  public get = async () => await this._redisClient.get("test");

  public test = () => {
    // redis.createClient({
    // })
    //     this._redisClient.on("connect", () => {
    //       console.log("Redis client connected");
    //     });
  };
}
