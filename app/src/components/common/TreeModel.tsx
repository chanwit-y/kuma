import { DataType, Field } from '@/@types/Model';
import { TreeItem, treeItemClasses, TreeItemProps, TreeView } from '@mui/lab'
import { alpha, Collapse, styled, SvgIcon, SvgIconProps } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { animated, useSpring } from '@react-spring/web';
import React, { memo, useState } from 'react'
import { ModelItem } from './ModelItem';

const MinusSquare = (props: SvgIconProps) => {
	return (
		<SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
			{/* tslint:disable-next-line: max-line-length */}
			<path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
		</SvgIcon>
	);
}

const PlusSquare = (props: SvgIconProps) => {
	return (
		<SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
			{/* tslint:disable-next-line: max-line-length */}
			<path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
		</SvgIcon>
	);
}

const CloseSquare = (props: SvgIconProps) => {
	return (
		<SvgIcon
			className="close"
			fontSize="inherit"
			style={{ width: 14, height: 14 }}
			{...props}
		>
			{/* tslint:disable-next-line: max-line-length */}
			<path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
		</SvgIcon>
	);
}

const TransitionComponent = (props: TransitionProps) => {
	const style = useSpring({
		from: {
			opacity: 0,
			transform: 'translate3d(20px,0,0)',
		},
		to: {
			opacity: props.in ? 1 : 0,
			transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
		},
	});

	return (
		<animated.div style={style}>
			<Collapse {...props} />
		</animated.div>
	);
}

// type CustomTreeItem = {
// 	item?: ReactNode;
// }

const StyledTreeItem = styled((props: TreeItemProps) => {
	return <TreeItem {...props} TransitionComponent={TransitionComponent}>
		{/* {props.item !== undefined ? props.item : props.children !== undefined || props.nodeId === "1" ? props.children : null} */}
	</TreeItem>
})(({ theme }) => ({
	[`& .${treeItemClasses.iconContainer}`]: {
		'& .close': {
			opacity: 0.3,
		},
	},
	[`& .${treeItemClasses.group}`]: {
		marginLeft: 15,
		paddingLeft: 18,
		borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
	},
}));

type Props = {
	name: string;
	model: Field[],
}

export const TreeModel = memo(({ model, name }: Props) => {

	return (
		<TreeView
			aria-label="customized"
			defaultExpanded={['1']}
			defaultCollapseIcon={<MinusSquare />}
			defaultExpandIcon={<PlusSquare />}
			defaultEndIcon={<CloseSquare />}
			sx={{ height: 600, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
		>
			<StyledTreeItem nodeId={`${name}`} label={name}>
				{
					model.map((m, i) => {
						// return m.fields.length > 0
						// 	? <TreeModel name={m.name} model={m.fields} />
						// 	// : <StyledTreeItem nodeId={`${name}-${i.toString()}`} label={m.name} />
						// 	: <StyledTreeItem nodeId={`${i.toString()}`} label={m.name} />
						console.log(m.fields.length)
						if (m.fields.length === 0)
							return <StyledTreeItem nodeId={`${i.toString()}`} label={m.name} />
						else
							return <TreeModel name={m.name} model={m.fields} />

					})


				}
				{/* <StyledTreeItem
					nodeId="2"
					label={<ModelItem />} />

				<StyledTreeItem nodeId="3" label="Subtree with children">
					<StyledTreeItem nodeId="6" label="Hello" />
					<StyledTreeItem nodeId="7" label="Sub-subtree with children">
						<StyledTreeItem nodeId="9" label="Child 1" />
						<StyledTreeItem nodeId="10" label="Child 2" />
						<StyledTreeItem nodeId="11" label="Child 3" />
					</StyledTreeItem>
					<StyledTreeItem nodeId="8" label="Hello" />
				</StyledTreeItem>
				<StyledTreeItem nodeId="4" label="World" />
				<StyledTreeItem nodeId="5" label="Something something" />
				<StyledTreeItem
					nodeId="12"
					label={<ModelItem />} >
					<StyledTreeItem
						nodeId="13"
						label={<ModelItem />} />
					<StyledTreeItem
						nodeId="14"
						label={<ModelItem />} />
				</StyledTreeItem> */}
			</StyledTreeItem>
		</TreeView>
	)
})

