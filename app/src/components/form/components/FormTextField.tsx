import {
  FC,
  useEffect,
  KeyboardEvent,
  useState,
  useCallback,
  ChangeEvent,
  memo,
  useMemo,
  ReactNode,
} from "react";
import { InputProps, TextField as MuiTextField, TextFieldProps } from "@mui/material";
import { Control, Controller, FieldError, FieldValues } from "react-hook-form";
import { isEmpty } from "lodash";
import { withValidate } from "../withValidate";
// import { withValidate } from "@banpudev/react-form";

// type TextFieldXProps = {
//   ref?: any;
//   value: unknown;
//   error?: FieldError;
//   onBlur?: VoidFunction;
//   onChange: Function;
// };

type Props = {
  name: string;
  type?: string;
  value?: unknown;
  onChange?: InputProps["onChange"];
  defaultValue?: unknown;
  fullWidth?: boolean;
  variant?: "filled" | "outlined" | "standard";
  disabled?: boolean;
  size?: "small" | "medium";
  backIcon?: ReactNode;
  frontIcon?: ReactNode;
  panttern?: RegExp;
  multiline?: boolean;
  rows?: number;
  maxLength?: number;
  showMessageError?: boolean;

  required?: boolean;
  requiredHelperText?: string;
  placeholder?: string;
  pattern?: RegExp;

  control?: Control<FieldValues, object>;
  inputRef?: any;

  hidden?: boolean;
};

const TextFieldFC: FC<Props & TextFieldProps> = ({
  name,
  type,
  value = undefined,
  onChange,
  defaultValue,
  fullWidth = true,
  variant = "outlined",
  disabled = undefined,
  size = "small",
  placeholder,
  backIcon,
  frontIcon,
  panttern,
  maxLength,
  multiline = false,
  rows = 1,
  showMessageError = true,
  required = false,
  requiredHelperText = "",

  control,
  inputRef,

  hidden = false,
  label,
  sx
}) => {
  const [regExpPanttern, setRegExpPanttern] = useState<RegExp>();
  const [textValue, setTextValue] = useState<unknown>("");
  const [textDisabled, setTextDisabled] = useState<boolean>();

  const isInValidRequired = useMemo(
    () => required && textValue === "",
    [required, textValue]
  );

  useEffect(() => {
    // console.log("input disabled", disabled);
    setTextDisabled(disabled);
  }, [disabled]);

  useEffect(() => setRegExpPanttern(panttern), [panttern]);

  useEffect(() => {
    switch (type) {
      case "number":
        setRegExpPanttern(/[0-9]|\./);
        break;
    }
  }, [type]);

  useEffect(() => {
    defaultValue && setTextValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    setTextValue(value ?? "");
  }, [value]);

  const validateNumber = (
    evt: KeyboardEvent<HTMLDivElement>,
    regex: RegExp
  ) => {
    if (!regex.test(evt.key)) {
      if (evt.preventDefault) evt.preventDefault();
    }
  };

  const textField = useCallback(
    (textFieldProps: {
      ref?: any;
      value: unknown;
      error?: FieldError;
      onBlur?: VoidFunction;
      onChange: Function;
      // textDisabledX?: boolean;
    }) => {
      const { ref, value, error, onBlur, onChange } = textFieldProps;

      return (
        <>
          {/* {String(disabled)}
          {String(textDisabled)} */}
          <MuiTextField
            name={name}
            type={type}
            label={label}
            placeholder={placeholder}
            fullWidth={fullWidth}
            variant={variant}
            size={size}
            inputRef={ref}
            value={value}
            multiline={multiline}
            rows={rows}
            disabled={textDisabled}
            inputProps={{
              maxLength,
            }}
            InputProps={{
              disabled: textDisabled,
              startAdornment: frontIcon,
              endAdornment: backIcon,
            }}
            onBlur={onBlur}
            error={!isEmpty(error)}
            onChange={(e: any) => {
              onChange(e);
            }}
            onKeyPress={(e: any) =>
              regExpPanttern && validateNumber(e, regExpPanttern)
            }
            helperText={showMessageError && error?.message}
            sx={{
              display: hidden ? "none" : undefined,
              ...sx
            }}
          />
        </>
      );
    },
    [frontIcon, backIcon, maxLength, disabled, textDisabled]
  );

  return control ? (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, name, ref, value },
        fieldState: { error },
      }) =>
        textField({
          ref,
          value,
          error,
          onBlur,
          onChange,
        })
      }
    />
  ) : (
    textField({
      ref: inputRef,
      value: textValue,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        setTextValue(e.target.value);
        onChange && onChange(e);
      },
      error: required
        ? { message: requiredHelperText, type: "required" }
        : undefined,
    })
  );
};

export const TextField = memo(TextFieldFC);
export const FormTextField = withValidate(TextFieldFC);
