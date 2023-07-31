import { Checkbox as MuiCheckbox, FormControlLabel, FormControlLabelProps } from '@mui/material'
import React, { ReactElement } from 'react'
import { Controller } from 'react-hook-form';
import { FormProps } from '../FormSetting';

type Props = {
	size?: "small" | "medium";
	control?: ReactElement<any, any>;
} & Omit<FormControlLabelProps, "control">;

export const CheckBox = (props: Props) => {
	const { control = <MuiCheckbox size={props.size ?? 'small'} /> } = props;
	return (
		<FormControlLabel
			{...props}
			control={control}
		/>
	)
}

export const FormCheckBox = (props: Props & FormProps) => {
	const { control, name } = props;
	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, ref, value }, fieldState: { error } }) =>
<>
				<CheckBox
					onChange={onChange}
					ref={ref}
					checked={value}
					value={value}
					{...props}
				/>
</>
			} />
	)
}
