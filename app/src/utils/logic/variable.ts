import { KeyValue } from "./index.d";

export function getValueFromNestedObject(obj: KeyValue, key: string): any {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      const value = obj[prop];
      if (prop === key) {
        return value;
      } else if (typeof value === "object") {
        const nestedValue = getValueFromNestedObject(value, key);
        if (nestedValue !== undefined) {
          return nestedValue;
        }
      }
    }
  }
  return undefined;
}
