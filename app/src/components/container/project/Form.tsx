import React, { memo, useEffect } from 'react'
import { Box, Button, Grid } from '@mui/material'
import { GroupTextField } from '@/components/common/GroupTextField'
import { Project } from '@/@types'
import { FormProvider, useForm } from 'react-hook-form'
import { FormSetting } from '@/components/form/FormSetting'
import { schema } from './Form.schema'

type Props = {
	createProject: (data: Project) => Promise<void>;
}

export const Form = memo(({ createProject }: Props) => {
	const formSetting = useForm(FormSetting.getDefaultForm(schema, {}));

	useEffect(() => {
		formSetting.trigger();
	}, [])

	return (
		<FormProvider {...formSetting} >
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
							onClick={formSetting.handleSubmit((data) => {
								createProject(data as Project);
							})}>Add</Button>
					</Grid>
				</Grid>
			</Box>
		</FormProvider>
	)
})
