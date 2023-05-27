import { Edge, EdgeChange, MarkerType, Node, useEdgesState } from "reactflow";
import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useContext } from "react";
import { NodeChange, useNodesState } from "reactflow";


type OnChange<ChangesType> = (changes: ChangesType[]) => void;
type EntityContextType = {
	nodes: Node[],
	setNodes: Dispatch<SetStateAction<Node[]>>,
	onNodesChange: OnChange<NodeChange>,
	edges: Edge[],
	setEdges: Dispatch<SetStateAction<Edge[]>>,
	onEdgesChange: OnChange<EdgeChange>,
	addEntity: () => void,
};
const EntityContext = createContext<EntityContextType>(
	{} as EntityContextType
);

type Props = {
	children: ReactNode;
};
const EntityProvider = ({ children }: Props) => {
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

	const addEntity = useCallback(() => {
		setNodes((perv) => ([...perv, {
			id: '6',
			type: 'custom',
			position: { x: 300, y: 300 },
			data: {
				table: {
					name: "UOM",
					columns: [],
				}
			}
		}]))
	}, [])

	return (
		<EntityContext.Provider value={{ 
			nodes, 
			setNodes, 
			onNodesChange, 
			edges, 
			setEdges, 
			onEdgesChange,
			addEntity,
		 }}>{children}</EntityContext.Provider>
	);
};

export const useEntity = () => useContext(EntityContext);
export default EntityProvider;
