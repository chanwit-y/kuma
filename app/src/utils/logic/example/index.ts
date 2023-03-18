import { get } from "lodash";
import { Field } from "../index.d";

const Employee: Field[] = [
  {
    fieldName: "UserID",
    dataType: "string",
    alias: "userId",
  },
  {
    fieldName: "PersonID",
    dataType: "string",
    alias: "personId",
  },
  {
    fieldName: "JobLevelDoa",
    dataType: "string",
    alias: "jobLevelDoa",
  },
  {
    fieldName: "JobLevelDoaNew",
    dataType: "string",
    alias: "jobLevelDoaNew",
  },
];

const ApproverDetail: Field[] = [
  {
    fieldName: "UserID",
    dataType: "string",
    alias: "userId",
  },
  {
    fieldName: "Profile",
    dataType: "Employee",
    alias: "profile",
  },
];

const MappingDataType = {
  Employee: Employee,
  ApproverDetail: ApproverDetail,
};

const getFieldModel = (models: Field[], fieldName: string) => {
  // is primitive datatype
  const current = models.find((m) => m.fieldName === fieldName);
  if (current && !["string"].includes(current.dataType)) {
    const getMappingDataType = get(
      MappingDataType,
      current.dataType,
      {} as Field
    );
    console.log(getMappingDataType);
  }
};

export { ApproverDetail, Employee, getFieldModel };

// getFieldModel()
