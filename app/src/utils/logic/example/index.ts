import { get } from "lodash";
import { DataType, Field, Function, Model, StatementType } from "../@types";

const Employee: Model = {
  name: "Employee",
  fields: [
    {
      fieldName: "UserID",
      dataType: DataType.String,
      alias: "userId",
    },
    {
      fieldName: "PersonID",
      dataType: DataType.String,
      alias: "personId",
    },
    {
      fieldName: "JobLevelDoa",
      dataType: DataType.String,
      alias: "jobLevelDoa",
    },
    {
      fieldName: "JobLevelDoaNew",
      dataType: DataType.String,
      alias: "jobLevelDoaNew",
    },
  ],
};

const ApproverDetail: Model = {
  name: "ApproverDetail",
  fields: [
    {
      fieldName: "UserID",
      dataType: DataType.String,
      alias: "userId",
    },
    {
      fieldName: "Profile",
      dataType: DataType.Object,
      objectName: "Employee",
      alias: "profile",
    },
  ],
};

const MappingDataType = {
  Employee: Employee,
  ApproverDetail: ApproverDetail,
};

const getFieldModel = (models: Field[], fieldName: string) => {
  const current = models.find((m) => m.fieldName === fieldName);
  // is primitive datatype
  if (current && ![DataType.String].includes(current.dataType)) {
    const getMappingDataType = get(
      MappingDataType,
      current.objectName ?? "",
      {} as Field
    );
    console.log(getMappingDataType);
  }
};

const func1: Function = {
  name: "f1",
  arguments: [
    {
      fieldName: "userIds",
      dataType: DataType.ArrayString,
    },
  ],
  statements: [
    {
      type: StatementType.GetAPI,
      getAPI: {
        url: "/user-profile/users",
        configName: "azure service principal apvc",
        stringArray: [
          {
            fieldName: "name",
            dataType: DataType.String,
          },
          {
            fieldName: "values",
            dataType: DataType.ArrayString,
          },
        ], // get api and send string query array type
        respone: [
          {
            fieldName: "Data",
            dataType: DataType.ArrayOject,
            objectName: "Employee",
          },
        ],
      },
    },
  ],
  result: {
    fieldName: "Data",
    dataType: DataType.ArrayOject,
    objectName: "Employee",
  },
};

//TODO: run func 1 process

export { ApproverDetail, Employee, getFieldModel };
