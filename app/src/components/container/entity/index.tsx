import React, { memo, useCallback } from 'react'
import { EntityNode } from './EntityNode';
import ReactFlow, { Background, Controls, ReactFlowProvider, addEdge, useEdgesState, useNodesState } from 'reactflow';


export const EntityContainer = memo(() => {
	const onInit = (reactFlowInstance: any) => console.log('flow loaded:', reactFlowInstance);


	const [nodes, setNodes, onNodesChange] = useNodesState([{
		id: '4',
		type: 'custom',
		position: { x: 100, y: 200 },
		data: {
			selects: {
				'handle-0': 'smoothstep',
				'handle-1': 'smoothstep',
			},
		},
	}]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);
	const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), []);

	const nodeTypes = {
		custom: EntityNode,
	};


	return (
		<ReactFlowProvider>
			<ReactFlow
				nodes={nodes}
				// edges={edgesWithUpdatedTypes}
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
				<Background color="#aaa" gap={16} />
			</ReactFlow>
		</ReactFlowProvider>
	)
})
