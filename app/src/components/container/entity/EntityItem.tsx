import { Box, Typography } from '@mui/material';
import React, { memo } from 'react'
import { Handle, Position } from 'reactflow';

type Props = {
	// type: HandleType;
	handleId?: string;
	column: any;
}

export const EntityItem = memo(({ handleId, column }: Props) => {
	return (
		<Box position='relative'>
			<Box py={.5} pl={1}>
				<Typography fontSize={8}>
					{column.name}
				</Typography>
			</Box>
			{
				(column.isPK || column.isFK) ? (
					<Handle
						id={handleId}
						type={column.isPK ? 'source' : 'target'}
						position={column.isPK ? Position.Right : Position.Left}
					/>
				) : null
			}
		</Box>
	)
})
