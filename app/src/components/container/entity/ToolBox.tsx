import { Box, Button } from '@mui/material'
import React, { useMemo } from 'react'
import { useEntity } from './Context'
import { maxBy } from 'lodash';

export const ToolBox = () => {
	const { addEntity, nodes } = useEntity();
	const nextId = useMemo(() => Number(maxBy(nodes, 'id')?.id) + 1, [nodes]);

	return (
		<Box>
			<Button onClick={() => addEntity(nextId.toString())}>Add</Button>
			<Button onClick={() => { }}>Save</Button>
		</Box>
	)
}
