// import { array, bool, number, object, string } from "yup";
import { z } from "zod";

const relationSchema = z.object({
  table: z.string().min(1),
  column: z.string().min(1),
});

export const schemaColumn = z
  .object({
    name: z.string().min(1),
    dataType: z.string().min(1),
    length: z.number(),
    isPK: z.boolean(),
    isFK: z.boolean(),
    fkTableName: z.string(),
    // .when("isFK", {
    //   is: (f: boolean) => f,
    //   then: () => string().required("Foreign key table name is required"),
    //   otherwise: () => string(),
    // }),
    fkColumnName: z.string(),
    // .when("isFK", {
    //   is: (f: boolean) => f,
    //   then: () => string().required("Foreign key column name is required"),
    //   otherwise: () => string(),
    // }),
    // relations: array().when("isFK", {
    //   is: (f: boolean) => f,
    //   then: () => array(relationSchema).min(1, "At least one relation is required"),
    //   otherwise: () => array(relationSchema),
    // }),
  })
  .refine(
    (data) => (data.isFK ? data.fkTableName : true),
    {
      message: "Foreign key table name is required",
      path: ["fkTableName"],
    }
  ).refine(
    (data) => (data.isFK ? data.fkColumnName : true),
    {
      message: "Foreign key column name is required",
      path: ["fkColumnName"],
    }
  );

export const schema = z.object({
  name: z.string().min(1),
  // columns: array(schemaColumn).min(1, "At least one column is required"),
  columns: z.array(schemaColumn),
});
