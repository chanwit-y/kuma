import { Box, Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import { useState } from "react";

export const ColumnInfo = () => {

	const [age, setAge] = useState('');

	const handleChange = (event: SelectChangeEvent) => {
		setAge(event.target.value);
	};

	return (
		<Box p={2} display='flex' flexDirection='column' minWidth={320} >
			<TextField label="Name" variant="outlined" size="small" sx={{ my: 1.5 }} />
			<Box display='flex' mb={1} justifyContent="space-between" gap={1}>
				<FormControl size="small" sx={{ width: "70%"}}>
					<InputLabel >Data type</InputLabel>
					<Select
						value={age}
						label="Data type"
						onChange={handleChange}
					>
						<MenuItem value="">
							<em>None</em>
						</MenuItem>
						<MenuItem value={10}>Ten</MenuItem>
						<MenuItem value={20}>Twenty</MenuItem>
						<MenuItem value={30}>Thirty</MenuItem>
					</Select>
				</FormControl>
				<TextField label="Len" variant="outlined" size="small" sx={{ width: "30%"}}  />
			</Box>
			<FormControlLabel
				value="PK"
				control={<Checkbox size="small" />}
				label="Primary Key"
				labelPlacement="end"
			/>
			<FormControlLabel
				value="FK"
				control={<Checkbox size="small" />}
				label="Foreign Key"
				labelPlacement="end"
			/>
			<Box display='flex' mb={1} justifyContent="space-between" gap={1}>
				<FormControl size="small" sx={{ minWidth: '50%' }}>
					<InputLabel >Table</InputLabel>
					<Select
						value={age}
						label="Data type"
						onChange={handleChange}
					>
						<MenuItem value="">
							<em>None</em>
						</MenuItem>
						<MenuItem value={10}>Ten</MenuItem>
						<MenuItem value={20}>Twenty</MenuItem>
						<MenuItem value={30}>Thirty</MenuItem>
					</Select>
				</FormControl>
				<FormControl size="small" sx={{ minWidth: '45%' }}>
					<InputLabel >Column</InputLabel>
					<Select
						value={age}
						label="Column"
						onChange={handleChange}
					>
						<MenuItem value="">
							<em>None</em>
						</MenuItem>
						<MenuItem value={10}>Ten</MenuItem>
						<MenuItem value={20}>Twenty</MenuItem>
						<MenuItem value={30}>Thirty</MenuItem>
					</Select>
				</FormControl>
			</Box>
			<Box mt={1} display='flex' justifyContent="end" gap={1}>
				<Button variant="outlined" >
					Cancel
				</Button>
				<Button variant="contained" >
					Save
				</Button>
			</Box>
		</Box>
	)
}
