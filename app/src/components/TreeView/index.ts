import { TreeView } from "./TreeView";
import { DatabaseTreeView } from "./DatabaseTreeView";
import { TreeItem } from "./TreeItem";
import { TransitionComponent } from "./TransitionComponent";

export enum DataType {
  String,
  Int,
  Boolean,
  Object,
  ArrayOfObject,
}

export type Database = {
  name: string;
  tables: Table[];
};

export type Table = {};

export type Field = {
  name: string;
  dataType: DataType;
  objectName?: string;
  fields: Field[];
};

export { TreeView, DatabaseTreeView, TreeItem, TransitionComponent };
