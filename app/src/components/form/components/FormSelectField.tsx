import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectProps } from '@mui/material'
import React from 'react'
import { FormProps } from '../FormSetting';
import { Controller, FieldError } from 'react-hook-form';
import { isEmpty } from 'lodash';
import { withValidate, withValidate2 } from '../withValidate';

type Props<T> = {
	label: string;
	items: T[];
	widthLabel?: number;
	unwrapLabel?: (item: T) => string;
	unwrapValue?: (
		item: T
	) => string | ReadonlyArray<string> | number | undefined;
	variant?: 'standard' | 'outlined' | 'filled';
	small?: 'small' | 'medium';
	formError?: FieldError;
} & SelectProps;

export function SelectField<T>(props: Props<T>) {
	const {
		label,
		items,
		unwrapValue,
		unwrapLabel,
		variant = 'outlined',
		small = 'small',
		formError,
	 } = props;
	return (
		<FormControl size={small} error={!isEmpty(formError)} sx={{ width: "70%" }}>
			<InputLabel >{label}</InputLabel>
			<Select
				variant={variant}
				sx={{
					fontSize: 14,
				}}
				{...props}
			>
				{items.map((item, index) => (
					<MenuItem
						key={`menu-item-${name}-${item}-${index}`}
						value={unwrapValue ? unwrapValue(item) : String(item)}
					>
						{unwrapLabel ? unwrapLabel(item) : String(item)}
					</MenuItem>
				))}
			</Select>
			<FormHelperText>{formError?.message}</FormHelperText>
		</FormControl>
	)
}

export function FormSelectFieldFC<T>(props: Props<T> & FormProps) {
	const { control, name } = props;
	return <Controller
		control={control}
		name={name}
		render={({ field: { onChange, onBlur, ref, value }, fieldState: { error } }) =>
			<SelectField
				onChange={onChange}
				onBlur={onBlur}
				value={value}
				ref={ref}
				formError={error}
				{...props} />
		}
	/>
}

export const FormSelectFieldString = withValidate2<Props<string> & FormProps, string>(FormSelectFieldFC);
