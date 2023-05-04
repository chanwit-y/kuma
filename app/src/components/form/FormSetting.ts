import { yupResolver } from "@hookform/resolvers/yup";
import {
  DeepPartial,
  FieldValues,
  UnpackNestedValue,
  UseFormProps,
} from "react-hook-form";

export class FormSetting {
  public static getDefaultForm = <T>(
    schema: any,
    defaultValues?: UnpackNestedValue<DeepPartial<T>>
  ): UseFormProps<FieldValues, object> => {
    return {
      mode: "all",
      // reValidateMode: "onChange",
      // criteriaMode: "firstError",
      // shouldFocusError: true,
      // shouldUnregister: true,
      resolver: yupResolver(schema),
      defaultValues,
    };
  };
}
