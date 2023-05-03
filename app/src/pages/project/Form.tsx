import { GroupTextField } from '@/components/common/GroupTextField'
import { Box, Grid } from '@mui/material'
import React from 'react'

export const Form = () => {
	return (
		<Box p={1}>
			<Grid container spacing={2}>
				<Grid item md={12} sm={12}>
					<GroupTextField lable='Name' textFieldProps={{name: 'name'}} />
				</Grid>
				<Grid item md={12} sm={12}>
					<GroupTextField lable='Description' textFieldProps={{name: 'description'}} />
				</Grid>
			</Grid>
		</Box>
	)
}
