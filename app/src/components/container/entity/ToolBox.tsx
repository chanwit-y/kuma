import { Box, Button } from '@mui/material'
import React from 'react'
import { useEntity } from './Context'

export const ToolBox = () => {
	const { addEntity } = useEntity();
	return (
		<Box>
			<Button onClick={addEntity}>Add</Button>
		</Box>
	)
}
