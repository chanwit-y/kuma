import { array, bool, number, object, string } from "yup";

const relationSchema = object().shape({
  table: string().required(),
  column: string().required(),
});

export const schemaColumn = object().shape({
  name: string().required(),
  dataType: string().required(),
  length: number(),
  isPK: bool(),
  isFK: bool(),
  relations: array().when("isFK", {
    is: (f: boolean) => f,
    then: () => array(relationSchema).min(1, "At least one relation is required"),
    otherwise: () => array(relationSchema),
  }),
});

export const schema = object().shape({
  name: string().required(),
  // columns: array(schemaColumn).min(1, "At least one column is required"),
  columns: array(schemaColumn),
})