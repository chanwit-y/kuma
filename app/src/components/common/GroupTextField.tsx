import React, { memo } from 'react'
import { TextField } from '..'
import { Box, Typography } from '@mui/material';
import { TextFieldPropsType } from '../hoc/createTextField';

type Props = {
	lable: string;
	textFieldProps: TextFieldPropsType;
}

export const GroupTextField = memo(({ lable, textFieldProps }: Props) => {
	return (
		<Box>
			<Typography>{lable}</Typography>
			<TextField {...textFieldProps} />
		</Box>
	)
});
