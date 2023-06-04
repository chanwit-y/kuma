import { CheckBox } from "@/components/form/components/FormCheckBox";
import { FormSelectFieldString, SelectField } from "@/components/form/components/FormSelectField";
import { FormTextField } from "@/components/form/components/FormTextField";
import { Box, Button, Divider, FormControlLabel, TextField, Typography } from "@mui/material"

export const ColumnInfo = () => {


	return (
		<Box p={2} display='flex' flexDirection='column' minWidth={320} >
			<Typography  fontSize={16} letterSpacing={1} fontWeight="bold">Column Detail</Typography>
			<Divider sx={{mt: 1, mb: .5}} />
			{/* <TextField label="Name" variant="outlined" size="small" sx={{ my: 1.5 }} /> */}
			<FormTextField name="name" label="Name" variant="outlined" size="small" sx={{ my: 1.5 }} />
			<Box display='flex' mb={1} justifyContent="space-between" gap={1}>
				<FormSelectFieldString name="dataType" label="Data type" items={["BigInt", "Int", "Bit", "Nvarchar"]} />
				<TextField label="Len" variant="outlined" size="small" sx={{ width: "30%" }} />
			</Box>
			<CheckBox value="PK" label="Primary Key" />
			<CheckBox value="FK" label="Foreign Key" />
			<Box display='flex' mb={1} justifyContent="space-between" gap={1}>
				<SelectField<string> label="Table" items={["Product", "UOM"]} />
				<SelectField<string> label="Column" items={["Id"]} />
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
