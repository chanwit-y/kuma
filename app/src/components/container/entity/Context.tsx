import { Edge, EdgeChange, MarkerType, Node, useEdgesState } from "reactflow";
import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { NodeChange, useNodesState } from "reactflow";
import { api } from "@/util/api";
import { useQuery } from "@tanstack/react-query";
import { cloneDeep } from "lodash";


type OnChange<ChangesType> = (changes: ChangesType[]) => void;
type Relation = {
	table: string,
	column: string,
};

type EntityContextType = {
	nodes: Node[],
	setNodes: Dispatch<SetStateAction<Node[]>>,
	onNodesChange: OnChange<NodeChange>,
	edges: Edge[],
	setEdges: Dispatch<SetStateAction<Edge[]>>,
	onEdgesChange: OnChange<EdgeChange>,
	addEntity: (id: string) => void,
	addColumn: (tableName: string, data: any) => void,
	relations: Relation[],
	setRelations: Dispatch<SetStateAction<Relation[]>>,
	updateNodeTableName: (id: string, tableName: string) => void,
	tableNames: string[];
	getColumnPKNames: (tableName: string) => any[];
	createEntity: () => Promise<void>;
	updateEntity: () => Promise<void>;
};
const EntityContext = createContext<EntityContextType>(
	{} as EntityContextType
);

type Props = {
	id: string;
	children: ReactNode;
};
const EntityProvider = ({ children, id }: Props) => {
	const qurEntity = api.entity.getEntity.useQuery(id);
	const entities = useMemo(() => {
		return cloneDeep((qurEntity.data as { nodes: any[] })?.nodes ?? [])
	}, [qurEntity.data])

	// const [entities, setEntities] = useState<any[]>([])
	useEffect(() => {
		console.log(entities)
		setNodes(entities)
	}, [entities])


	const [nodes, setNodes, onNodesChange] = useNodesState([])
	// const [nodes, setNodes, onNodesChange] = useNodesState([{
	// 	id: '4',
	// 	type: 'custom',
	// 	position: { x: 100, y: 200 },
	// 	data: {
	// 		// selects: {
	// 		// 	'handle-0': 'smoothstep',
	// 		// 	'handle-1': 'smoothstep',
	// 		// },
	// 		table: {
	// 			name: "Product",
	// 			columns: [{
	// 				name: 'id',
	// 				isPK: true,
	// 				isFK: false,
	// 				dataType: 'int',
	// 			},
	// 			{
	// 				name: 'code',
	// 				isPK: false,
	// 				isFK: false,
	// 				dataType: 'nvarchar',
	// 				length: 50,
	// 			},
	// 			{
	// 				name: 'name',
	// 				isPK: false,
	// 				isFK: false,
	// 				dataType: 'nvarchar',
	// 				length: 100,
	// 			},
	// 			],
	// 		},
	// 	},
	// },
	// {
	// 	id: '5',
	// 	type: 'custom',
	// 	position: { x: 300, y: 300 },
	// 	data: {
	// 		// selects: {
	// 		// 	'handle-0': 'smoothstep',
	// 		// 	'handle-1': 'smoothstep',
	// 		// },
	// 		table: {
	// 			name: "UOM",
	// 			columns: [{
	// 				name: 'id',
	// 				isPK: true,
	// 				isFK: false,
	// 				dataType: 'int',
	// 			}, {
	// 				name: 'productId',
	// 				isPK: false,
	// 				isFK: true,
	// 				dataType: 'int',
	// 			}
	// 				, {
	// 				name: 'name',
	// 				isPK: false,
	// 				isFK: false,
	// 				dataType: 'nvarchar',
	// 				length: 50,
	// 			}],
	// 		},
	// 	},
	// }
	// ]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([{
		id: 'e4-5',
		source: '4',
		target: '5',
		// type: ''
		// type: 'smoothstep',
		type: 'step',
		sourceHandle: 'id',
		targetHandle: 'productId',
		data: {
			selectIndex: 0,
		},
		markerEnd: {
			// type: MarkerType.ArrowClosed,
			type: MarkerType.ArrowClosed,
		},
	}
		// , {
		// 	id: 'e4-6',
		// 	source: '4',
		// 	target: '6',
		// 	// type: ''
		// 	// type: 'smoothstep',
		// 	// type: 'step',
		// 	sourceHandle: 'id',
		// 	targetHandle: 'productId',
		// 	data: {
		// 		selectIndex: 0,
		// 	},
		// 	markerEnd: {
		// 		// type: MarkerType.ArrowClosed,
		// 		type: MarkerType.ArrowClosed,
		// 	},

		// }, {
		// 	id: 'e5-7',
		// 	source: '5',
		// 	target: '7',
		// 	// type: ''
		// 	// type: 'smoothstep',
		// 	// type: 'step',
		// 	sourceHandle: 'id',
		// 	targetHandle: 'uomId',
		// 	data: {
		// 		selectIndex: 0,
		// 	},
		// 	markerEnd: {
		// 		// type: MarkerType.ArrowClosed,
		// 		type: MarkerType.ArrowClosed,
		// 	},

		// }
	]);

	const tableNames = useMemo(() => nodes.map((f) => f.data.table.name), [nodes]);
	const getColumnPKNames = useCallback((tableName: string) => {
		const node = nodes.find((f) => f.data.table.name === tableName);
		return (node?.data.table.columns ?? []).filter((f: any) => f.isPK).map((f: any) => f.name);
	}, [nodes]);

	const updateNodeTableName = useCallback((id: string, tableName: string) => {
		setNodes((prev) => {
			const tempNodes = [...prev];
			console.log("id", id);
			const index = tempNodes.findIndex((f) => f.data.table.name === id)
			tempNodes[index]!.data.table.name = tableName;
			return [...tempNodes]
		})
	}, []);

	const addEntity = useCallback((id: string) => {
		// const id = Number(maxBy(nodes, 'id')?.id) + 1; 
		setNodes((perv) => ([...perv, {
			id: id,
			type: 'custom',
			position: { x: 100, y: 100 },
			data: {
				table: {
					name: "[Table Name]",
					columns: [],
				}
			}
		}]))

	}, [])

	const addColumn = useCallback((tableName: string, data: any) => {
		let nodeId = "";
		setNodes((prev) => {
			const tempNodes = [...prev];
			const index = tempNodes.findIndex((f) => f.data.table.name === tableName)
			if (tempNodes.length > 0 && !!tempNodes[index]) {
				nodeId = tempNodes[index]?.id ?? "";
				tempNodes[index]!.data.table.columns = [...tempNodes[index]!.data.table.columns, data];
			}
			return prev
		})
		if (nodeId !== "" && data.fkTableName !== "") {
			const currentNode = nodes.find((f) => f.id === nodeId)
			const sourceNode = nodes.find((f) => f.data.table.name === data.fkTableName)
			setEdges((prev) => ([...prev, {
				id: `e${sourceNode?.id}-${currentNode?.id}`,
				source: sourceNode?.id ?? "",
				target: currentNode?.id ?? "",
				sourceHandle: data.fkColumnName,
				targetHandle: data.name,
				type: 'step',
				data: {
					selectIndex: 0,
				},
				markerEnd: {
					type: MarkerType.ArrowClosed,
				},

			}]))
		}

	}, [nodes])


	const mutCreateEntity = api.entity.createEntity.useMutation();
	const createEntity = useCallback(async () => {
		console.log(nodes)
		console.log(edges)
		console.log({ data: { nodes: nodes, edges: edges } })
		if (nodes) {
			mutCreateEntity.mutate({ nodes: nodes, edges: [...edges] }, {
				// mutCreateEntity.mutate( { nodes: nodes }, {
				onSuccess: (res) => {
					console.log(res)
				},
				onError: (e) => {
					console.log(e)
				}
			})
		}
	}, [nodes, edges, mutCreateEntity])

	const mutUpdateEntity = api.entity.updateEntity.useMutation();
	const updateEntity = useCallback(async () => {
		await mutUpdateEntity.mutate({ id, data: { nodes: nodes, edges: edges } }, {
			onSuccess: (res) => {
				console.log(res)
			}, onError: (e) => {
				console.log(e)
			}
		})
	}, [nodes, edges, id, mutUpdateEntity])

	const [relations, setRelations] = useState<Relation[]>([]);

	return (
		<EntityContext.Provider value={{
			nodes,
			setNodes,
			onNodesChange,
			edges,
			setEdges,
			onEdgesChange,
			addEntity,
			addColumn,
			relations,
			setRelations,
			updateNodeTableName,
			tableNames,
			getColumnPKNames,
			createEntity,
			updateEntity,

		}}>
			{/* {JSON.stringify(entities, undefined, 2)} */}
			{/* {JSON.stringify(nodes, undefined, 2)} */}
			{children}
		</EntityContext.Provider>


	);
};

export const useEntity = () => useContext(EntityContext);
export default EntityProvider;
