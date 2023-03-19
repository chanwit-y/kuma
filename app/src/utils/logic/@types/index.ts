export type AzureToken = {
  token: string;
  expiresOnTimestamp: number;
};

export enum StatementType {
  Variable,
  If,
  For,
  ForEach,
  Map,
  Query,
  Function,
}

export enum BooleanOpterator {
  Equal = "==",
  GreaterThan = ">",
  GreaterThanOrEqual = ">=",
  LessThan = "<",
  LessThanOrEqual = "<=",
  NotEqual = "!=",
}

export enum Conjunction {
  And,
  Or,
}

export type Condition = {
  value1: any;
  value2: any;
  operator: BooleanOpterator;
};

export enum DataType {
  String,
  Number,
  Object,
  ArrayOject,
}

// Custom type
export type KeyValue = { [key: string]: any };

export type Field = {
  fieldName: string;
  dataType: DataType;
  objectName?: string;
  alias?: string;
};

export type Variable = {
  name: string;
  dataType: DataType | KeyValue;
  scope: string;
  value: any;
};

export type If = {
  conditions: (Condition | Conjunction)[];
  result: boolean;
};

export type IfStatement = {
  scope: string;
  ifs: If[];
  sentences: Statement[];
};

export type For = {
  scope: string;
  i: number;
  n: number;
  sentences: Statement[];
};

export type ForEach = {
  scope: string;
  data: any[];
  sentences: Statement[];
};

export type Map = {
  scope: string;
  data: any[];
  sentences: Statement[];
  result: Variable;
};

export type CallFunction = {
  name: string;
  arguments: Variable[];
  result: Variable;
};

export type Statement = {
  type: StatementType;
  variable: Variable;
  if: IfStatement;
  for: For;
  forEach: ForEach;
  map: Map;
  callFunction: CallFunction;
};

export type StringArray = {
    name: string
    values: string[]
}

export type GetAPIRequest = {
  url: string;
  parameter?: object; // /:param1/:param2
  stringQuery?: object; // convert objection to string query
  stringArray?: StringArray; // convert objection to string query
};

export type Function = {
  name: string;
  arguments: Variable[];
  statements: Statement[];
  result: Variable;
};
