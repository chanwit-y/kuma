import { array, bool, number, object, string } from "yup";

const relationSchema = object().shape({
  table: string().required(),
  column: string().required(),
});

export const schema = object().shape({
  name: string().required(),
  dataType: string().required(),
  length: number(),
  pk: bool(),
  fk: bool(),
  relations: array().when("fk", {
    is: (f: boolean) => f,
    then: () => array(relationSchema).min(1, "At least one relation is required"),
    otherwise: () => array(relationSchema),
  }),
});
