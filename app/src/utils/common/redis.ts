import { createClient } from "redis";

export class Redis {
  private _redisClient = createClient();
  constructor() {
    this._redisClient.connect();

    this._redisClient.on("connect", () => {
      console.log("Redis client connected");
    });
  }

  public get = async (key: string) => await this._redisClient.get(key);

  public set = async (key: string, value: string) => await this._redisClient.set(key, value);

}

export default new Redis();
