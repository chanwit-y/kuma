import firebase, { Firebase } from "@/utils/common/firebase";
import redis from "@/utils/common/redis";
import { Cashe, CasheType } from "@/utils/decorator/redis";
import { Configuraion } from "./@types/config";

class Config {
  constructor(private _firebase: Firebase) {
    console.log("new config");
  }

  @Cashe({
    redis: redis,
    cacheKey: "config",
    uniqueKey: "id",
    type: CasheType.Get,
  })
  public async findBy(_: { f: (c: Configuraion) => boolean }) {
    return await this._firebase.findAll<Configuraion>("configuraions");
  }
}

export default new Config(firebase);
