import { Box, Typography } from '@mui/material';
import { blue, grey, red } from '@mui/material/colors';
import React, { memo, useEffect } from 'react'
import { Handle, Position } from 'reactflow';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

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
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				p={.5} >
				<Box display="flex"  >
					<DragIndicatorIcon  sx={{fontSize: 10, color: grey[400]}} />
					{column.isPK ? <Box p={.1} px={.2} mr={.5} borderRadius={.2} sx={{ backgroundColor: blue[400] }} >
						<Typography fontSize={6} color="white">PK</Typography>
					</Box> : null}
					<Typography fontSize={8}>
						{`${column.name}:`}
					</Typography>
					<Typography mx={.5} fontSize={8} letterSpacing={.4}>
						{`${column.dataType}`}
					</Typography>
					{column.length && (<Typography fontSize={8} letterSpacing={.4}>
						{`(${column.length})`}
					</Typography>)}

				</Box>
				<Box>
					<MoreVertIcon sx={{fontSize: 7}} />
				</Box>
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
