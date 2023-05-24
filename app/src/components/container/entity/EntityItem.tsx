import { Box, Typography } from '@mui/material';
import { blue, red } from '@mui/material/colors';
import React, { memo, useEffect } from 'react'
import { Handle, Position } from 'reactflow';

type Props = {
	// type: HandleType;
	handleId?: string;
	column: any;
}

export const EntityItem = memo(({ handleId, column }: Props) => {
	useEffect(() => {
		console.log(column)
	}, [column]);
	return (
		<Box position='relative'>
			<Box display="flex" py={.5} pl={1} >
				{column.isPK ? <Box p={.1} px={.2} mr={.5} borderRadius={.2} sx={{ backgroundColor: blue[400] }} >
					<Typography fontSize={6} color="white">PK</Typography>
				</Box> : null}
				<Typography fontSize={8}>
					{`${column.name}:`}
				</Typography>
				<Typography mx={.7} fontSize={8} letterSpacing={.4}>
					{`[${column.dataType}]`}
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
