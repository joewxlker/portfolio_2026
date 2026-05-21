import ELK, { ElkExtendedEdge } from 'elkjs/lib/elk.bundled.js';
import { Edge, Node } from 'reactflow';
import { reportClientError } from './post-client-error';
 
const elk = new ELK();
 
const elkOptions = {
    "elk.algorithm": "layered",
    "elk.direction": "RIGHT",
    "elk.hierarchyHandling": "INCLUDE_CHILDREN",
    "elk.spacing.nodeNode": "200",
    "elk.layered.spacing.nodeNodeBetweenLayers": "200",
    "org.eclipse.elk.animate": "true",
    
    "elk.insideSelfLoops.activate": "false",
    "elk.layered.edgeRouting.selfLoopDistribution": "EQUALLY",
    "elk.layered.edgeRouting.selfLoopOrdering": "STACKED",
    
    "elk.layered.nodePlacement.strategy": "BRANDES_KOEPF",
    "elk.layered.nodePlacement.bk.fixedAlignment": "BALANCED",
};
 
export const getLayoutedElements = async (nodes: Node[], edges: Edge[]) => {
    const isHorizontal = elkOptions?.['elk.direction'] === 'RIGHT';
    const graph = {
        id: 'root',
        layoutOptions: elkOptions,
        children: nodes.map((node) => ({
            ...node,
            targetPosition: isHorizontal ? 'left' : 'top',
            sourcePosition: isHorizontal ? 'right' : 'bottom',
        
            width: 150,
            height: 50,
        })),
        edges: edges as unknown as ElkExtendedEdge[],
    };

    try {
        const layoutedGraph = await elk.layout(graph);

        return {
            nodes: layoutedGraph?.children?.map((node) => ({
                ...node,
                position: { x: node.x, y: node.y },
            })),
            edges: layoutedGraph.edges,
        }

    } catch (err) {
        reportClientError(err);

        return {
            nodes: [],
            edges: []
        }
    }
};