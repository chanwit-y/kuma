import { DataType, Function, StatementType, Variable } from "./@types";

const func1: Function = {
  name: "f1",
  arguments: [
    {
      fieldName: "userIds",
      dataType: DataType.ArrayString,
      scope: "f1",
    },
  ],
  statements: [
    {
      type: StatementType.GetAPI,
      getAPI: {
        url: "/user-profile/users",
        stringArray: [
          {
            fieldName: "name",
            dataType: DataType.String,
          },
          {
            fieldName: "values",
            dataType: DataType.ArrayString,
          },
        ],
	respone: [
		{
			fieldName: "Data",
			dataType: DataType.ArrayOject,
			objectName: "Employee"
		}
	]
      },
    },
  ],
  result: {
    fieldName: "Data",
    dataType: DataType.ArrayOject,
    objectName: "Employee",
  },
};

export {};
