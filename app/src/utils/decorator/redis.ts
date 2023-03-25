import { Redis } from "../common/redis";
import { v4 as uuidv4 } from 'uuid';

enum CasheType {
  Get,
  Add,
  Update,
  Delete,
}

type CasheOption = {
  redis: Redis;
  cacheKey: string;
  uniqueKey: string;
  type: CasheType;
};

function Cashe({ redis, cacheKey, uniqueKey, type }: CasheOption) {
  return (_: any, _2: string, descriptor: PropertyDescriptor) => {
    const method = descriptor.value;
    descriptor.value = async function () {
      const arg = arguments.length > 0 ? arguments[0] : undefined;

      let data: any[] = [];
      const casheData = (await redis.get(cacheKey)) ?? "";

      if (casheData !== "") data = JSON.parse(casheData);

      switch (type) {
        case CasheType.Get: {
          if (data.length !== 0) {
            data = await method.apply(this, arguments);
            redis.set(cacheKey, JSON.stringify(data));
          }
          return typeof arg["f"] === "function" ? data.filter(arg["f"]) : data;
        }
        case CasheType.Add: {
          // add to db
          await method.apply(this, arguments);
          // add cash when casheData != ""
        }
        case CasheType.Update: {
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
