import { TreeView as MuiTreeView } from '@mui/lab'
import { Database, TreeItem } from ".";
import { Fragment, memo, MouseEvent, useCallback, useState } from "react";

import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import StorageIcon from '@mui/icons-material/Storage';
import TableViewIcon from '@mui/icons-material/TableView';
import DatasetIcon from '@mui/icons-material/Dataset';
import { Popover, Typography } from '@mui/material';

type Props = {
	name: string;
	dbs: Database[]
}


export const DatabaseTreeView = memo(({ name, dbs }: Props) => {


	const [anchorEl, setAnchorEl] = useState<HTMLLIElement | null>(null);

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleClick = useCallback((e: MouseEvent<HTMLLIElement>) => {
		e.preventDefault();
		if (e.type === 'click') {
			console.log('Left click');
		} else if (e.type === 'contextmenu') {
			console.log(e.clientX)
			console.log(e.clientY)
			setAnchorEl(e.currentTarget);
			// setClientX(e.clientX);
			// setClientY(e.clientY);
		}
	}, []);


	return (
		<Fragment>
			<MuiTreeView
				aria-label="customized"
				defaultExpanded={['1']}
				defaultCollapseIcon={<AppRegistrationIcon />}
				defaultExpandIcon={<AppRegistrationIcon />}
				defaultEndIcon={<DatasetIcon />}
				sx={{ height: "100%", flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
			>
				<TreeItem
					nodeId={`${name}`}
					label={<Typography
						variant="body2"
						fontWeight='bold'>{name}</Typography>}
				// onContextMenu={handleClick}
				>
					{
						dbs.map((m, i) => {
							return <>
								<TreeItem
									nodeId={`${i.toString()}`}
									label={<Typography variant="caption">{m.name}</Typography>}
									onContextMenu={handleClick}
									onClick={(e) => {
										console.log(e.clientX)
										console.log(e.clientY)
									}}
								/>

								<DatabaseMenu
									anchorEl={anchorEl}
									handleClose={handleClose}
								/>
							</>							// if (m.fields.length === 0)
							// 	return <TreeItem nodeId={`${i.toString()}`} label={m.name} />
							// else
							// return <DatabaseTreeView
							// 	name={m.name}
							// 	model={m.fields}
							// 	expandIcon={expandIcon}
							// 	endIcon={endIcon}
							// />
						})

					}
				</TreeItem>
			</MuiTreeView>
		</Fragment>
	)
})

type DatabaseMenuProps = {
	anchorEl: HTMLLIElement | null;
	handleClose: () => void;
}

const DatabaseMenu = ({ anchorEl, handleClose }: DatabaseMenuProps) => {

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	return <Popover
		id={id}
		open={open}
		anchorEl={anchorEl}
		onClose={handleClose}
		anchorOrigin={{
			vertical: 'center',
			horizontal: 'center',
		      }}
		      transformOrigin={{
			vertical: 'top',
			horizontal: 'left',
		      }}
	>
		<Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
	</Popover>
}