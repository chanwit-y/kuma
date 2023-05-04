import { GroupTextField } from '@/components/common/GroupTextField'
import { Box, Button, Grid } from '@mui/material'
import React, { memo, useCallback } from 'react'
import { useProject } from './Context'
import { Project } from '@/@types'

type Props = {
	createProject: (data: Project) => Promise<void>;
}

export const Form = memo(({ createProject }: Props) => {

	const handleAdd = useCallback(() => {
		createProject({
			name: "Hi",
			description: "test"
		});
	}, [createProject]);

	return (
		<Box p={1}>
			<Grid container spacing={2}>
				<Grid item md={12} sm={12}>
					<GroupTextField lable='Name' textFieldProps={{ name: 'name' }} />
				</Grid>
				<Grid item md={12} sm={12}>
					<GroupTextField lable='Description' textFieldProps={{ name: 'description' }} />
				</Grid>
				<Grid item md={12} sm={12} display="flex" justifyContent="end">
					<Button
						variant='contained'
						onClick={handleAdd}>Add</Button>
				</Grid>
			</Grid>
		</Box>
	)
})
