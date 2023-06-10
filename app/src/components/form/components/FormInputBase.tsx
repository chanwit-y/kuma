import { InputBase } from '@mui/material'
import { blue } from '@mui/material/colors'
import React, { memo } from 'react'
import { Controller } from 'react-hook-form'

type Props = {
	name: string;
}

export const FormInputBase = memo(({ name }: Props) => {
	return (
		<Controller
			name={name}
			render={({ field: { value, onChange, onBlur },
				fieldState: { error } }) => (
				<InputBase
					value={value}
					onChange={onChange}
					onBlur={onBlur}
					sx={{
						borderRadius: .5,
						bgcolor: blue[50],
						fontSize: 7,
					}} />
			)}
		/>
	)
})
