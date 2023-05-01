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

  public set = async (key: string, value: string) =>
    await this._redisClient.set(key, value);

  public scan = async () => {
    return await this._redisClient.scan(0);
  };

  // client.flushall((err, succeeded) => {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }
  
  //   console.log(`Flushed ${succeeded ? 'successfully' : 'unsuccessfully'}`);
  // });
}

export default new Redis();
