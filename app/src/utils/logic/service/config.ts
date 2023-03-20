import firebase, { Firebase } from "@/utils/common/firebase";
import redis, { Redis } from "@/utils/common/redis";
import { Configuraion } from "./@types/config";

class Config {
  constructor(private _redis: Redis, private _firebase: Firebase) {}

  // change cache to decorator
  public async findBy(query: Configuraion) {
    let key = "";
    const filter = new Map<string, any>();
    Object.entries(query).map(([k, v]) => {
      v && filter.set(k, v);
      key += `${k}:${v}`.split(' ').join('-');
    });


    let config: Configuraion[] = [];
    const cache = await this._redis.get(key);
    if (cache === null) {
      config = await this._firebase.findBy("configuraions", filter);
      await this._redis.set(key, JSON.stringify(config));
      console.log('no cache')
    } else {
      console.log('in cache')
      config = JSON.parse(cache)
    }

    return config;
  }
}

export default new Config(redis, firebase);
