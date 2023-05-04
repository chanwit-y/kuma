import { Box, IconButton } from '@mui/material'

import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useCallback } from 'react';
import { useModal } from '@/components/context/Modal';
import { Form } from './Form';
import { useProject } from './Context';

export const Toolbar = () => {

	const { createProject } = useProject();
	const { displayModal } = useModal();

	const handleAdd = useCallback(() => {
		displayModal("Add project", true, <Form createProject={createProject} />)
	}, [createProject])

	return (
		<Box display="flex" justifyContent="end">
			<IconButton onClick={handleAdd}>
				<AddCircleIcon />
			</IconButton>
		</Box>
	)
}
