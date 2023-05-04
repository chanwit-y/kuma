import React, { memo } from 'react'
import { Box, Typography } from '@mui/material';
import { TextFieldPropsType } from '../hoc/createTextField';
import { FormTextField } from '../form/components/FormTextField';

type Props = {
	lable: string;
	textFieldProps: TextFieldPropsType;
}

export const GroupTextField = memo(({ lable, textFieldProps }: Props) => {
	return (
		<Box>
			<Typography>{lable}</Typography>
			<FormTextField {...textFieldProps} />
		</Box>
	)
});
