import React, { memo, useCallback, useEffect } from 'react'
import { EntityNode } from './EntityNode';
import ReactFlow, { Background, Controls, MarkerType, ReactFlowProvider, addEdge, useEdgesState, useNodesState } from 'reactflow';
import { useEntity } from './Context';


const nodeTypes = {
	custom: EntityNode,
};

export const Entity = memo(() => {
	const onInit = (reactFlowInstance: any) => console.log('flow loaded:', reactFlowInstance);
	const { nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange } = useEntity()


	useEffect(() => {
		document.getElementsByClassName('react-flow__panel react-flow__attribution top right')[0]?.remove()
	}, [])

	return (
		<ReactFlowProvider>
			<ReactFlow
				nodes={nodes}
				// edges={edgesWithUpdatedTypes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				// onConnect={onConnect}
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
