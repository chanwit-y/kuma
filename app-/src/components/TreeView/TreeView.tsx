import {  TreeView as MuiTreeView } from '@mui/lab'
import { Field, TreeItem } from ".";
import { memo } from "react";

type Props = {
	name: string;
	model: Field[],
	expandIcon: JSX.Element;
	endIcon: JSX.Element;
}

export const TreeView = memo(({ name, model, expandIcon, endIcon }: Props) => {
	return (
		<MuiTreeView
			aria-label="customized"
			defaultExpanded={['1']}
			defaultCollapseIcon={expandIcon}
			defaultExpandIcon={expandIcon}
			defaultEndIcon={endIcon}
			sx={{ height: "100vh", flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
		>
			<TreeItem nodeId={`${name}`} label={name}>
				{
					model.map((m, i) => {
						if (m.fields.length === 0)
							return <TreeItem nodeId={`${i.toString()}`} label={m.name} />
						else
							return <TreeView
								name={m.name}
								model={m.fields}
								expandIcon={expandIcon}
								endIcon={endIcon}
							/>
					})

				}
			</TreeItem>
		</MuiTreeView>
	)
})

