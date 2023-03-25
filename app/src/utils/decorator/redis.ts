import { KeyValue } from "@/utils/logic/@types";
import { Redis } from "../common/redis";
import { v4 as uuidv4 } from "uuid";

enum CasheType {
  Get,
  Add,
  Update,
  Delete,
}

type CasheOption = {
  redis: Redis;
  cacheKey: string;
  uniqueKey?: string;
  type: CasheType;
};

function Cashe({ redis, cacheKey, uniqueKey = "docId", type }: CasheOption) {
  return (_: any, _2: string, descriptor: PropertyDescriptor) => {
    const method = descriptor.value;
    descriptor.value = async function () {
      const arg = arguments.length > 0 ? arguments[0] : undefined;

      let data: any[] = [];
      const casheData = (await redis.get(cacheKey)) ?? "";

      if (casheData !== "") {
        data = JSON.parse(casheData);
        console.log("in cache");
      }

      switch (type) {
        case CasheType.Get: {
          if (data.length === 0) {
            data = await method.apply(this, arguments);
            redis.set(cacheKey, JSON.stringify(data));
          }
          return typeof arg["f"] === "function" ? data.filter(arg["f"]) : data;
        }
        case CasheType.Add: {
          // add to db
          const uuid = uuidv4();
          arguments[0][uniqueKey] = uuid;
          await method.apply(this, arguments);

          // add cash when casheData != ""
          data = [...data, arguments[0]];
          return data;
        }
        case CasheType.Update: {
          // const uuid = arguments[0][uniqueKey];
          // console.log("update", arguments)
          // console.log(uuid)

          // const params = arguments[0];
          // console.log(arguments)

          // const newArgs = Object.entries(params).reduce(
          //   (r, [_, v], i) => ({ ...r, [i.toString()]: v }),
          //   {}
          // );

          // console.log()
          console.table(arguments)

          await method.apply(this, arguments);
        }
        case CasheType.Delete: {
        }
      }

      return data;
    };
  };
}

export { Cashe, CasheType };
// export type {CasheType}
