import React, { memo, useCallback } from 'react'
import { EntityNode } from './EntityNode';
import ReactFlow, { Background, Controls, MarkerType, ReactFlowProvider, addEdge, useEdgesState, useNodesState } from 'reactflow';


export const EntityContainer = memo(() => {
	const onInit = (reactFlowInstance: any) => console.log('flow loaded:', reactFlowInstance);


	const [nodes, setNodes, onNodesChange] = useNodesState([{
		id: '4',
		type: 'custom',
		position: { x: 100, y: 200 },
		data: {
			// selects: {
			// 	'handle-0': 'smoothstep',
			// 	'handle-1': 'smoothstep',
			// },
			table: {
				name: "Product",
				columns: [{
					name: 'id',
					isPK: true,
					isFK: false,
					dataType: 'int',
				}, 
				{
					name: 'code',
					isPK: false,
					isFK: false,
					dataType: 'nvarchar',
					length: 50,
				},
				{
					name: 'name',
					isPK: false,
					isFK: false,
					dataType: 'nvarchar',
					length: 100,
				},
			],
			},
		},
	},
	{
		id: '5',
		type: 'custom',
		position: { x: 300, y: 300 },
		data: {
			// selects: {
			// 	'handle-0': 'smoothstep',
			// 	'handle-1': 'smoothstep',
			// },
			table: {
				name: "UOM",
				columns: [{
					name: 'id',
					isPK: true,
					isFK: false,
					dataType: 'int',
				}, {
					name: 'productId',
					isPK: false,
					isFK: true,
					dataType: 'int',
				}
					, {
					name: 'name',
					isPK: false,
					isFK: false,
					dataType: 'nvarchar',
					length: 50,
				}],
			},
		},
	}
	]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([{
		id: 'e4-5',
		source: '4',
		target: '5',
		// type: 'smoothstep',
		type: 'step',
		sourceHandle: 'id',
		targetHandle: 'productId	',
		data: {
			selectIndex: 0,
		},
		markerEnd: {
			type: MarkerType.ArrowClosed,
		},
	}]);
	const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), []);

	const nodeTypes = {
		custom: EntityNode,
	};


	return (
		<ReactFlowProvider>
			<ReactFlow
				nodes={nodes}
				// edges={edgesWithUpdatedTypes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				onInit={onInit}
				fitView
				attributionPosition="top-right"
				nodeTypes={nodeTypes}
			>
				{/* <MiniMap style={minimapStyle} zoomable pannable /> */}
				<Controls />
				<Background color="#aaa" gap={10} />
			</ReactFlow>
		</ReactFlowProvider>
	)
})
