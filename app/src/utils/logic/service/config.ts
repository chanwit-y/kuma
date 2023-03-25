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
    type: CasheType.Get,
  })
  public async findBy(_: { f?: (c: Configuraion) => boolean }) {
    return await this._firebase.findAll("configuraions");
  }

  @Cashe({
    redis: redis,
    cacheKey: "config",
    type: CasheType.Add,
  })
  public async add(item: Configuraion) {
    await this._firebase.add("configuraions", item);
  }

  @Cashe({
    redis: redis,
    cacheKey: "config",
    type: CasheType.Update,
  })
  public async update(item: Configuraion) {
    const params = Object.entries(item).reduce(
      (r, [_, v], i) => ({ ...r, [i.toString()]: v }),
      {}
    );
    console.log("params", params)
    // await this._firebase.update("configuraions", item.docId, "docId", item.docId, params);
    // await this._firebase.update("configuraions", item.docId, "docId", item.docId, "name", "beer");
    // await this._firebase.update(name, id, field, value, ...moreFieldValues);
  }
}

export default new Config(firebase);
