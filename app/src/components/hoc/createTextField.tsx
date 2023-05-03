import { InputBaseProps, InputProps, TextFieldProps } from '@mui/material';
import { isEmpty } from 'lodash';
import {
  ComponentType,
  KeyboardEvent,
  useState,
  useMemo,
  ChangeEvent,
  useEffect,
} from 'react';

type Props = {
  name: string;
  type?: string;
  pattern?: RegExp;
  isDisabled?: boolean;
  isHidden?: boolean;
  isShowMessageError?: boolean;
  placeholder?: string;

  value?: unknown;
  onBlur?: InputBaseProps['onBlur'];
  onChange?: InputProps["onChange"];

  multiline?: boolean;
  rows?: number;
  maxLength?: number;

  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;

  isRequired?: boolean;
  requiredHelperText?: string;

  inputRef?: any;
  fieldError?: any;
};

export type TextFieldPropsType = TextFieldProps & Props;

export const createTextField = (Component: ComponentType<TextFieldPropsType>) => {
  return (props: TextFieldPropsType) => {
    const {
      name,
      type,
      pattern,
      isDisabled = false,
      isHidden = false,
      isShowMessageError = true,

      value,
      onBlur,
      onChange,
      placeholder,
      multiline,
      maxLength,
      rows,

      fullWidth = true,
      variant = 'outlined',
      size = 'small',
      startAdornment,
      endAdornment,
      isRequired,
      requiredHelperText,

      inputRef,
      fieldError,
    } = props;

    const [textFieldValue, setTextFieldValue] = useState<unknown>();
    const [regExpPattern, setRegExpPattern] = useState<RegExp>();

    const isInValidRequired = useMemo(() => isRequired && textFieldValue === "", [isRequired, textFieldValue])

    const validateNumber = (
      evt: KeyboardEvent<HTMLDivElement>,
      regex: RegExp
    ) => {
      if (!regex.test(evt.key)) {
        if (evt.preventDefault) evt.preventDefault();
      }
    };

    useEffect(() => {
      setTextFieldValue(value);
    }, [value])

    useEffect(() => setRegExpPattern(pattern), [pattern]);

    return (<Component
      placeholder={placeholder}
      fullWidth={fullWidth}
      variant={variant}
      size={size}
      inputRef={inputRef}
      value={textFieldValue}
      multiline={multiline}
      rows={rows}
      disabled={isDisabled}
      inputProps={{
        type,
        name,
        maxLength,
      }}
      InputProps={{
        disabled: isDisabled,
        startAdornment: startAdornment,
        endAdornment: endAdornment,
      }}
      onBlur={onBlur}
      error={!isEmpty(fieldError) || isInValidRequired}
      helperText={fieldError && isShowMessageError ? fieldError.message : isInValidRequired ? requiredHelperText : ""}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        setTextFieldValue(e.target.value);
        onChange && onChange(e);
      }}
      onKeyPress={(e: KeyboardEvent<HTMLDivElement>) =>
        regExpPattern && validateNumber(e, regExpPattern)
      }
      sx={{
        display: isHidden ? "none" : undefined,
      }}
      {...props}
    />)
  };
};



// import { InputProps, TextFieldProps } from '@mui/material';
// import { isEmpty } from 'lodash';
// import {
//   ComponentType,
//   KeyboardEvent,
//   JSXElementConstructor,
//   useState,
//   useMemo,
//   ChangeEvent,
//   useCallback,
// } from 'react';
// import { Control, Controller, DeepMap, FieldError, FieldValues } from 'react-hook-form';

// // export type WithTextFieldProps = {
// //   xxxx: string;
// //   name: string;
// //   type?: string;
// //   fullWidth?: boolean;
// //   placeholder?: string;
// //   variant?: 'filled' | 'outlined' | 'standard';
// //   disabled?: boolean;
// //   size?: 'small' | 'medium';
// //   value?: string | number;
// //   minRows?: number;
// //   maxRows?: number;
// //   multiline?: boolean;
// //   required?: boolean;
// //   startAdornment?: React.ReactNode;
// //   endAdornment?: React.ReactNode;
// //   error?: string;
// //   dataCy?: string;
// //   disabledErrorMessage?: boolean;
// //   pattern?: RegExp;
// //   onChange?: ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
// //   // requiredHelperText?: string;
// //   className?: string;
// //   animatedPlaceholder?: boolean;
// //   classes?: any;
// //   sx?: any;
// //   inputComponent?: JSXElementConstructor<any>;
// // };
// type Props = {
//   name: string;
//   type?: string;
//   isDisabled?: boolean;
//   isHidden?: boolean;
//   isShowMessageError?: boolean;
//   placeholder?: string;

//   onChange?: InputProps["onChange"];

//   multiline?: boolean;
//   rows?: number;
//   maxLength?: number;

//   startAdornment?: React.ReactNode;
//   endAdornment?: React.ReactNode;
//   inputComponent?: JSXElementConstructor<any>;

//   isRequired?: boolean;
//   requiredHelperText?: string;

//   control?: Control<FieldValues, object>;
//   inputRef?: any;
//   errors?: DeepMap<Record<string, any>, FieldError>;
//   setValue?: any;
// };

// export type TextFieldPropsType = TextFieldProps & Props;

// // export const withTextField = <P extends TextFieldProps & WithTextFieldProps>(
// export const createTextField = (Component: ComponentType<TextFieldPropsType>) => {
//   return (props: TextFieldPropsType) => {
//     // return (props: P ) => {
//     const {
//       // type,
//       // animatedPlaceholder = true,
//       name,
//       type,
//       isDisabled = false,
//       isHidden = false,
//       isShowMessageError = true,
//       onChange,
//       placeholder,
//       multiline,
//       maxLength,
//       rows,

//       fullWidth = true,
//       variant = 'outlined',
//       size = 'small',
//       startAdornment,
//       endAdornment,
//       inputComponent,
//       isRequired,
//       requiredHelperText,

//       control,
//       inputRef,
//       errors,
//       setValue,
//     } = props;

//     const [textFieldValue, setTextFieldValue] = useState<unknown>();
//     const [regExpPattern, setRegExpPattern] = useState<RegExp>();

//     const isInValidRequired = useMemo(() => isRequired && textFieldValue === "", [isRequired, textFieldValue])
//     const validateNumber = (
//       evt: KeyboardEvent<HTMLDivElement>,
//       regex: RegExp
//     ) => {
//       if (!regex.test(evt.key)) {
//         if (evt.preventDefault) evt.preventDefault();
//       }
//     };

//     const settingTextField = useCallback(
//       (textFieldProps: {
//         ref?: any;
//         value: unknown;
//         error?: FieldError;
//         onBlur?: VoidFunction;
//         onChange: Function;
//       }) => {
//         const { ref, value, error, onBlur, onChange } = textFieldProps;

//         return (
//           <Component
//             name={name}
//             type={type}
//             placeholder={placeholder}
//             fullWidth={fullWidth}
//             variant={variant}
//             size={size}
//             inputRef={ref}
//             value={value}
//             multiline={multiline}
//             rows={rows}
//             disabled={isDisabled}
//             inputProps={{
//               maxLength,
//             }}
//             InputProps={{
//               disabled: isDisabled,
//               startAdornment: startAdornment,
//               endAdornment: endAdornment,
//             }}
//             onBlur={onBlur}
//             // error={!isEmpty(error)}
//             error={((errors && !!errors[name]) || isInValidRequired)}
//             onChange={(e: ChangeEvent<HTMLInputElement>) => {
//               onChange(e);
//             }}
//             onKeyPress={(e: KeyboardEvent<HTMLDivElement>) =>
//               regExpPattern && validateNumber(e, regExpPattern)
//             }
//             helperText={isShowMessageError && error?.message}
//             sx={{
//               display: isHidden ? "none" : undefined,
//             }}
//           />
//         );
//       },
//       [startAdornment, endAdornment, maxLength, isDisabled, isHidden]
//     );

//     return control ? (
//       <Controller
//         control={control}
//         name={name}
//         render={({
//           field: { onChange, onBlur, name, ref, value },
//           fieldState: { error },
//         }) =>
//           settingTextField({
//             ref,
//             value,
//             error,
//             onBlur,
//             onChange,
//           })
//         }
//       />
//     ) : (
//       settingTextField({
//         ref: inputRef,
//         value: textFieldValue,
//         onChange: (e: ChangeEvent<HTMLInputElement>) => {
//           setTextFieldValue(e.target.value);
//           onChange && onChange(e);
//         },
//         error: isRequired
//           ? { message: requiredHelperText, type: "required" }
//           : undefined,
//       })
//     );

//     // useEffect(() => setRegExpPattern(pattern), [pattern]);

//     // useEffect(() => {
//     //   switch (type) {
//     //     case 'number':
//     //       setRegExpPattern(/[0-9]|\./);
//     //       break;
//     //   }
//     // }, [type]);

//     // const placeholderProps = animatedPlaceholder
//     //   ? { label: placeholder }
//     //   : { placeholder: placeholder };

//     // return (
//     //   <Component
//     //     InputProps={{
//     //       startAdornment,
//     //       endAdornment,
//     //       inputComponent,
//     //     }}
//     //     size={size}
//     //     variant={variant}
//     //     fullWidth={fullWidth}
//     //     onKeyPress={(e: KeyboardEvent<HTMLDivElement>) =>
//     //       regExpPattern && validateNumber(e, regExpPattern)
//     //     }
//     //     onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     //       setTextFieldValue(e.target.value);
//     //       // onTextFieldStateChange && onTextFieldStateChange(e);
//     //       // onChange && onChange(e);

//     //       setValue && setValue(name, e.target.value);
//     //     }}
//     //     sx={{
//     //       bgcolor: '#fff'
//     //     }}
//     //     error={((errors && !!errors[name]) || isInValidRequired)}
//     //     helperText={errors && errors[name] ? errors[name].message : isInValidRequired ? requiredHelperText : ""}
//     //     {...props}

//     //   // className={className}
//     //   // sx={sx}
//     //   // name={name}
//     //   // classes={classes}
//     //   // type={type}
//     //   // {...placeholderProps}
//     //   // minRows={minRows}
//     //   // maxRows={maxRows}
//     //   // disabled={disabled}
//     //   // value={value}
//     //   // required={required}
//     //   // multiline={multiline}
//     //   // inputProps={{
//     //   //   'data-cy': dataCy ?? name,
//     //   // }}
//     //   // InputProps={{
//     //   //   startAdornment,
//     //   //   endAdornment,
//     //   //   inputComponent,
//     //   // }}
//     //   // error={!isEmpty(error)}
//     //   // onChange={onChange}
//     //   />
//     // );
//   };
// };
