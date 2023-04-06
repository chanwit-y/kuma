import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'

export const ModelItem = () => {
	return (
		<Box display="flex" py={1} gap={1}>
			<TextField variant='outlined' label="Name" size="small" />
			<FormControl fullWidth size='small' sx={{ padding: 0 }} >
				<InputLabel>Datatype</InputLabel>
				<Select
					// value={age}
					label="Datatype"
					// size='small'
					variant='outlined'
					sx={{
						fontSize: 13,
						padding: 0,
					}}
				// onChange={handleChange}
				>
					<MenuItem value={10}>Number</MenuItem>
					<MenuItem value={20}>String</MenuItem>
					<MenuItem value={30}>Boolean</MenuItem>
				</Select>
			</FormControl>
		</Box>
	)
}
