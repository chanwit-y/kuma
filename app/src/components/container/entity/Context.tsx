import { Edge, EdgeChange, MarkerType, Node, useEdgesState } from "reactflow";
import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { NodeChange, useNodesState } from "reactflow";
import { api } from "@/util/api";
import { useQuery } from "@tanstack/react-query";
import { cloneDeep } from "lodash";
import { v4 as uuidv4 } from 'uuid';


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
	addEntity: () => void,
	addColumn: (tableName: string, data: any) => void,
	editColumn: (tableName: string, data: any) => void,
	deleteColumn: (tableName: string, id: string) => void,
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
	useEffect(() => {
		const nodes = cloneDeep((qurEntity.data as { nodes: any[] })?.nodes ?? []);
		const edges = cloneDeep((qurEntity.data as { edges: any[] })?.edges ?? []);
		setNodes(nodes)
		setEdges(edges)
	}, [qurEntity.data])


	const [nodes, setNodes, onNodesChange] = useNodesState([])
	const [edges, setEdges, onEdgesChange] = useEdgesState([])

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

	const addEntity = useCallback(() => {
		setNodes((perv) => ([...perv, {
			id: uuidv4(),
			type: 'custom',
			position: { x: 100, y: 100 },
			data: {
				table: {
					name: "[Table Name]",
					columns: [],
				}
			}
		}]))

	}, [nodes])

	const addColumn = useCallback((tableName: string, data: any) => {
		let nodeId = "";
		let tempNodes: any[] = [];
		setNodes((prev) => {
			tempNodes = [...prev];
			const index = tempNodes.findIndex((f) => f.data.table.name === tableName)

			if (tempNodes.length > 0 && !!tempNodes[index]) {
				nodeId = tempNodes[index]?.id ?? "";
				data.id = uuidv4();
				tempNodes[index]!.data.table.columns = [...tempNodes[index]!.data.table.columns, data];
			}
			return tempNodes
		})
		if (nodeId !== "" &&
			data.fkColumnName !== undefined &&
			data.fkTableName !== "") {
			const currentNode = tempNodes.find((f) => f.id === nodeId)
			const sourceNode = tempNodes.find((f) => f.data.table.name === data.fkTableName)
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
		console.log(nodes)
		console.log(edges)

	}, [setEdges, setNodes])

	const editColumn = useCallback((tableName: string, data: any) => {
		setNodes((prev) => {
			const tempNodes = [...prev];
			const indexNode = tempNodes.findIndex((f) => f.data.table.name === tableName);
			const indexColumn = tempNodes[indexNode]?.data?.table?.columns?.findIndex((f: any) => f?.id === data?.id);

			if (tempNodes[indexNode]?.data?.table?.columns) {
				tempNodes[indexNode]!.data.table.columns[indexColumn] = data;
			}


			return tempNodes;
		});
	}, [setNodes])

	const deleteColumn = useCallback((tableName: string, id: string) => {
		setNodes((prev) => {
			const tempNodes = [...prev];
			const indexNode = tempNodes.findIndex((f) => f.data.table.name === tableName);
			const indexColumn = tempNodes[indexNode]?.data?.table?.columns?.findIndex((f: any) => f?.id === id);



			if (tempNodes[indexNode]?.data?.table?.columns) {
				const columns = tempNodes[indexNode]!.data.table.columns;
				tempNodes[indexNode]!.data.table.columns = [...columns.slice(0, indexColumn), ...columns.slice(indexColumn + 1, columns.length)]
				// console.log(columns.slice(0, indexColumn))
				// console.log(columns)
				// console.log(indexColumn)
				// console.log(columns.length)
				// console.log(columns.slice(indexColumn + 1, columns.length))
				// console.log(columns.slice(indexColumn + 1))
				console.log(tempNodes)
				return tempNodes;
			}

			// if (tempNodes[indexNode]?.data?.table?.columns) {
			// 	tempNodes[indexNode]!.data.table.columns[indexColumn] = data;
			// }


			return tempNodes;
		});
	}, [setNodes])

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
			editColumn,
			addColumn,
			deleteColumn,
			relations,
			setRelations,
			updateNodeTableName,
			tableNames,
			getColumnPKNames,
			createEntity,
			updateEntity,
		}}>
			{children}
		</EntityContext.Provider>


	);
};

export const useEntity = () => useContext(EntityContext);
export default EntityProvider;
