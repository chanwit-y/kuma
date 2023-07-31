import { FormCheckBox } from "@/components/form/components/FormCheckBox";
import { FormSelectFieldString } from "@/components/form/components/FormSelectField";
import { FormTextField } from "@/components/form/components/FormTextField";
import { Box, Button, Divider, IconButton, Typography } from "@mui/material"
import { memo, useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useEntity } from "./Context";

import { grey } from "@mui/material/colors";
import { schemaColumn } from "./Form.schema";
import { FormSetting } from "@/components/form/FormSetting";

type Props = {
	// index: number;
	column: any;
	onUpsertColumn: (data: any) => void;
	onClose: () => void;
}

export const ColumnInfo = memo(({ column, onUpsertColumn, onClose }: Props) => {

	const { tableNames, getColumnPKNames: getColumnNames } = useEntity();
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
				<Typography fontSize={16} letterSpacing={1} fontWeight="bold">Column Detail</Typography>
				<Divider sx={{ mt: 1, mb: .5 }} />
				<FormTextField
					name={"name"}
					label="Name" variant="outlined" size="small" sx={{ my: 1.5 }} />
				<Box display='flex' mb={1} justifyContent="space-between" gap={1}>
					<FormSelectFieldString name="dataType" label="Data type" items={["BigInt", "Int", "Bit", "Nvarchar"]} />
					<FormTextField name="length" label="Len" variant="outlined" size="small" sx={{ width: "30%" }} />
				</Box>
				<FormCheckBox name="isPK"  label="Primary Key" />
				<Box display='flex' mb={1} gap={1}>

					<FormCheckBox name="isFK"  label="Foreign Key" />
					
				</Box>
				{fk && (
					<Box
						borderColor={grey[300]}
					>
							<Box display='flex' justifyContent="space-between" gap={1}>
								<FormSelectFieldString name="fkTableName" label="Table" items={tableNames} />
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
					<Button variant="text" onClick={() => onClose()} >
						Cancel
					</Button>
					<Button
						onClick={formSetting.handleSubmit((data) => {
							onUpsertColumn(data);
							onClose();
						})}
						variant="contained" >
						Save
					</Button>
				</Box>
			</Box >
		</FormProvider>
	)
})
