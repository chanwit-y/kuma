export enum DataType {
  String,
  Int,
  Boolean,
  Object,
  ArrayOfObject,
}

export type Field = {
  name: string;
  dataType: DataType;
  objectName?: string;
  fields: Field[];
};
