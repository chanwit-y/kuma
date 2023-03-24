import { Redis } from "../common/redis";

enum CasheType {
  Get,
  Add,
  Update,
  Delete,
}

type CasheOption = {
  redis: Redis;
  key: string;
  type: CasheType;
};

function Cashe({redis, key, type}: CasheOption) {
  return (_: any, _2: string, descriptor: PropertyDescriptor) => {
    const method = descriptor.value;
    descriptor.value = async function () {
      const data = await method.apply(this, arguments);
      const arg = arguments.length > 0 ? arguments[0]: undefined;

      console.log("in decorator");
      console.log("data", data);
      console.log("args", arg);

      return data;
    };
  };
}

export { Cashe, CasheType };
// export type {CasheType}
