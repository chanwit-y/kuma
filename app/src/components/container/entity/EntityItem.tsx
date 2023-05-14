import { Box } from '@mui/material';
import React, { memo } from 'react'
import { Handle, HandleType, Position } from 'reactflow';

type Props = {
	type: HandleType;
	handleId?: string;
}

export const EntityItem = memo(({ type, handleId }: Props) => {
	return (
		<Box position='relative'>
			<Box py={.5}>
				{handleId}
			</Box>
			<Handle type={type} position={Position.Right} id={handleId} />
		</Box>
	)
})
