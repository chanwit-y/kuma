import { FormCheckBox } from "@/components/form/components/FormCheckBox";
import { FormSelectFieldString } from "@/components/form/components/FormSelectField";
import { FormTextField } from "@/components/form/components/FormTextField";
import { Box, Button, Divider, Icon, IconButton, Typography } from "@mui/material"
import { memo, useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useEntity } from "./Context";

import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

import { grey } from "@mui/material/colors";
import { schemaColumn } from "./Form.schema";
import { FormSetting } from "@/components/form/FormSetting";

type Props = {
	// index: number;
	tableName: string;
	column: any;
	onUpsertColumn: (data: any) => void;
	onDelete: (id: string) => void;
	onClose: () => void;
}

export const ColumnInfo = memo(({ tableName, column, onUpsertColumn, onDelete, onClose }: Props) => {

	const { getOtherTableNames, getColumnPKNames: getColumnNames } = useEntity();
	const formSetting = useForm(FormSetting.getDefaultForm(schemaColumn, column));
	const { watch, trigger } = formSetting;

	const fk = useMemo<boolean>(() => watch("isFK") ?? false, [watch("isFK")]);

	useEffect(() => {
		trigger();
	}, [])

	return (

		<FormProvider {...formSetting} >
			{/* <pre>
				{column ? JSON.stringify(column, undefined, 2): null}
			</pre> */}
			<Box p={2} display='flex' flexDirection='column' minWidth={320} >
				<Box display="flex" justifyContent="space-between" alignItems="center">
					{/* <ViewColumnIcon /> */}
					<Typography fontSize={16} letterSpacing={1} fontWeight="bold">Column Detail</Typography>
					<IconButton color="error" onClick={() => {
						onDelete(column.id);
					}}><DeleteIcon /></IconButton>
				</Box>
				<Divider sx={{ mt: 1, mb: .5 }} />
				<FormTextField
					name={"name"}
					label="Name" variant="outlined" size="small" sx={{ my: 1.5 }} />
				<Box display='flex' mb={1} justifyContent="space-between" gap={1}>
					<FormSelectFieldString name="dataType" label="Data type" items={["BigInt", "Int", "Bit", "Nvarchar"]} />
					<FormTextField name="length" label="Len" variant="outlined" size="small" sx={{ width: "30%" }} />
				</Box>
				<FormCheckBox name="isPK" label="Primary Key" />
				<Box display='flex' mb={1} gap={1}>

					<FormCheckBox name="isFK" label="Foreign Key" />

				</Box>
				{fk && (
					<Box
						borderColor={grey[300]}
					>
						<Box display='flex' justifyContent="space-between" gap={1}>
							<FormSelectFieldString name="fkTableName" label="Table" items={getOtherTableNames(tableName)} />
							<FormSelectFieldString name="fkColumnName" label="Column" items={getColumnNames(formSetting.watch("fkTableName"))} />
							<IconButton
								color="error"
								onClick={() => {
									// setRelations(prev => prev.filter((_, i) => i !== index))
								}} >
							</IconButton>

						</Box>
					</Box>
				)
				}
				<Divider sx={{ mt: 1 }} />
				<Box mt={1} display='flex' justifyContent="end" gap={1}>
					{/* <Button variant="text" onClick={() => onClose()} >
						Cancel
					</Button> */}
					<IconButton onClick={() => onClose()}>
						<ClearIcon />
					</IconButton>
					{/* <Button variant="contained" color="error" onClick={() => onClose()} >
						Delete
					</Button> */}
					{/* <Button
						onClick={formSetting.handleSubmit((data) => {
							onUpsertColumn(data);
							onClose();
						})}
						variant="contained" >
						Save
					</Button> */}
					<IconButton
						color="success"
						onClick={formSetting.handleSubmit((data) => {
							onUpsertColumn(data);
							onClose();
						})}
					>
						<CheckIcon />
					</IconButton>
				</Box>
			</Box >
		</FormProvider>
	)
})
