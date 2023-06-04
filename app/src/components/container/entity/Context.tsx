import { Edge, EdgeChange, MarkerType, Node, useEdgesState } from "reactflow";
import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useContext, useState } from "react";
import { NodeChange, useNodesState } from "reactflow";
import { FormProvider, useForm } from "react-hook-form";
import { FormSetting } from "@/components/form/FormSetting";
import { schema } from "./Form.schema";
import { maxBy } from "lodash";


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
	relations: Relation[],
	setRelations: Dispatch<SetStateAction<Relation[]>>,
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
		// type: ''
		// type: 'smoothstep',
		// type: 'step',
		sourceHandle: 'id',
		targetHandle: 'productId	',
		data: {
			selectIndex: 0,
		},
		markerEnd: {
			// type: MarkerType.ArrowClosed,
			type: MarkerType.ArrowClosed,
		},
	}]);

	const addEntity = useCallback(() => {
		const id = Number(maxBy(nodes, 'id')?.id) + 1; 
		setNodes((perv) => ([...perv, {
			id: id.toString(),
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

	const formSetting = useForm(FormSetting.getDefaultForm(schema));

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
			relations,
			setRelations
		}}>
			<FormProvider {...formSetting} >
				{children}
			</FormProvider>
		</EntityContext.Provider>


	);
};

export const useEntity = () => useContext(EntityContext);
export default EntityProvider;
