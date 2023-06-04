import { CheckBox, FormCheckBox } from "@/components/form/components/FormCheckBox";
import { FormSelectFieldString, SelectField } from "@/components/form/components/FormSelectField";
import { FormTextField } from "@/components/form/components/FormTextField";
import { Box, Button, Divider, IconButton, TextField, Typography } from "@mui/material"
import {  useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useEntity } from "./Context";

import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { grey } from "@mui/material/colors";

export const ColumnInfo = () => {

	const { relations, setRelations } = useEntity();
	const { watch, trigger, formState: { errors } } = useFormContext();

	const fk = useMemo<boolean>(() => watch("fk") ?? false, [watch("fk")]);

	useEffect(() => {
		trigger();
	}, []);

	return (
		<Box p={2} display='flex' flexDirection='column' minWidth={320} >
			<Typography fontSize={16} letterSpacing={1} fontWeight="bold">Column Detail</Typography>
			<Divider sx={{ mt: 1, mb: .5 }} />
			{/* <TextField label="Name" variant="outlined" size="small" sx={{ my: 1.5 }} /> */}
			<FormTextField name="name" label="Name" variant="outlined" size="small" sx={{ my: 1.5 }} />
			<Box display='flex' mb={1} justifyContent="space-between" gap={1}>
				<FormSelectFieldString name="dataType" label="Data type" items={["BigInt", "Int", "Bit", "Nvarchar"]} />
				<TextField label="Len" variant="outlined" size="small" sx={{ width: "30%" }} />
			</Box>
			<CheckBox value="PK" label="Primary Key" />
			<Box display='flex' mb={1} gap={1}>

				<FormCheckBox name="fk" value="FK" label="Foreign Key" />
				{fk && (
					<IconButton
						color="success"
						onClick={() => {
							setRelations(prev => [...prev, { table: "", column: "" }])
						}}
					>
						<PlaylistAddIcon />
					</IconButton>
				)}
			</Box>
			{fk && (
				<Box
					maxHeight={160}
					border={1}
					borderRadius={1}
					borderColor={grey[300]}
					p={1.5}
					overflow="scroll"
					sx={{
						borderStyle: "dashed",
					}}
				>
					{relations.map((relation, index) => (
						<Box display='flex' justifyContent="space-between" gap={1}>
							<SelectField<string> label="Table" items={["Product", "UOM"]} />
							<SelectField<string> label="Column" items={["Id"]} />
							<IconButton
								color="error"
								onClick={() => {
									setRelations(prev => prev.filter((_, i) => i !== index))
								}} >
								<PlaylistRemoveIcon />
							</IconButton>

						</Box>
					))}
					{relations.length === 0 && (
						<Typography variant="caption" color="text.secondary">No relation</Typography>
					)}
				</Box>
			)
			}
			<Divider sx={{ mt: 1 }} />
			<Box mt={1} display='flex' justifyContent="end" gap={1}>
				<Button variant="text" >
					Cancel
				</Button>
				<Button
					disabled={Object.keys(errors).length > 0}
					variant="contained" >
					Save
				</Button>
			</Box>
		</Box >
	)
}
