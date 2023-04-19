import { Box, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import React from 'react'

function createData(
	name: string,
	calories: number,
	fat: number,
	carbs: number,
	protein: number,
) {
	return { name, calories, fat, carbs, protein };
}

const rows = [
	createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
	createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
	createData('Eclair', 262, 16.0, 24, 6.0),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export const TableModel = () => {
	return (
		<Paper sx={{ width: '100%' }}>

			<Box p={1} display="flex" justifyContent="space-between">
				<Typography>[Table Name]</Typography>
				
			</Box>
			<TableContainer >

				<Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
					<TableHead>
						<TableRow>
							<TableCell sx={{ backgroundColor: blue[500], borderRight: 1 }}>Dessert (100g serving)</TableCell>
							<TableCell sx={{ backgroundColor: blue[500] }} align="right">Calories</TableCell>
							<TableCell sx={{ backgroundColor: blue[500] }} align="right">Fat&nbsp;(g)</TableCell>
							<TableCell sx={{ backgroundColor: blue[500] }} align="right">Carbs&nbsp;(g)</TableCell>
							<TableCell sx={{ backgroundColor: blue[500] }} align="right">Protein&nbsp;(g)</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow
								key={row.name}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									{row.name}
								</TableCell>
								<TableCell align="right">{row.calories}</TableCell>
								<TableCell align="right">{row.fat}</TableCell>
								<TableCell align="right">{row.carbs}</TableCell>
								<TableCell align="right">{row.protein}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>

			</TableContainer>
			{/* <TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={100}
				rowsPerPage={10}
				page={1}
				onPageChange={() => {}}
				// onRowsPerPageChange={handleChangeRowsPerPage}
			/> */}
		</Paper>
	)
}
