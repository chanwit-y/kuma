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

function UpdateCasheParam() {
  return (_: any, _2: string, descriptor: PropertyDescriptor) => {
    const method = descriptor.value;
    descriptor.value = async function () {
      console.log("param");
      console.table(arguments);

      const data = await method.apply(this, arguments);
    };
  };
}

function Cashe({ redis, cacheKey, uniqueKey = "docId", type }: CasheOption) {
  return (_: any, _2: string, descriptor: PropertyDescriptor) => {
    const method = descriptor.value;
    descriptor.value = async function () {
      console.log("cashe");
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
          const { firebase, name, params } = await method.apply(
            this,
            arguments
          );
          const newParams = Object.entries(params).reduce(
            (r, [k, v], _) => ([...r, k, v]),
            [] as any[]
          );

          await firebase.update(
            name,
            params[uniqueKey],
            "docId",
            params[uniqueKey],
            ...newParams
          );

          const index = data.findIndex((d) => d[uniqueKey] === params[uniqueKey])
          data[index] = params 
          redis.set(cacheKey, JSON.stringify(data))
        }
        case CasheType.Delete: {
        }
      }

      return data;
    };
  };
}

export { Cashe, UpdateCasheParam, CasheType };
// export type {CasheType}
