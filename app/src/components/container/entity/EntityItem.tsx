import { Box, Divider, Typography } from '@mui/material';
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
				p={.5} py={.3} >
				<Box display="flex" alignItems='center'  >
					<DragIndicatorIcon sx={{ fontSize: 10, color: grey[400] }} />
					{column.isPK ? <Box p={.1} px={.2} mr={.5} borderRadius={.2} sx={{ backgroundColor: blue[400] }} >
						<Typography fontSize={6} color="white" letterSpacing={.1}>PK</Typography>
					</Box> : null}
					<Typography fontSize={8} letterSpacing={.1}>
						{`${column.name}`}
					</Typography>
					{/* <Divider orientation='vertical' sx={{color: red}} /> */}
					<Typography mx={.5} fontSize={8} color={blue[900]} fontWeight='bold' letterSpacing={.4}>
						{`${column.dataType}`}
					</Typography>
					{column.length && (<Box 
					// component='span'
					px={.3}
					// py={.1}
					borderRadius={1}
					bgcolor={blue[100]}
					fontSize={6} 
					fontWeight='bold'
					alignSelf="center" 
					letterSpacing={.4}>
						{column.length}
					</Box>)}

				</Box>
				<Box>
					<MoreVertIcon sx={{ fontSize: 7 }} />
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
