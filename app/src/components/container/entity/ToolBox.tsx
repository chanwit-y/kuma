import { Box, Button } from '@mui/material'
import React, { useMemo } from 'react'
import { useEntity } from './Context'
import { maxBy } from 'lodash';

export const ToolBox = () => {
	const { addEntity, nodes, createEntity, updateEntity } = useEntity();
	// const nextId = useMemo(() => Number(maxBy(nodes, 'id')?.id) + 1, [nodes]);

	return (
		<Box>
			<Button onClick={() => addEntity()}>Add</Button>
			<Button onClick={async () => {
				console.log(nodes)
				await createEntity();
			}}>Create</Button>
			<Button onClick={async () => {
				console.log(nodes)
				await updateEntity();
			}}>Update</Button>
		</Box>
	)
}
