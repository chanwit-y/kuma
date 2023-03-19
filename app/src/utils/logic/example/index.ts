import { get } from "lodash";
import { DataType, Field } from "../@types";

const Employee: Field[] = [
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
];

const ApproverDetail: Field[] = [
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
];

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

export { ApproverDetail, Employee, getFieldModel };

// getFieldModel()
