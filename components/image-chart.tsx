"use client";

import ReactFlow, { addEdge, Background, Connection, Controls, Edge, Node, useEdgesState, useNodesState } from 'reactflow';

import 'reactflow/dist/style.css';

import { getLayoutedElements } from '@/lib/elk-layout';
import { useCallback, useLayoutEffect } from 'react';
import { ServiceNode } from './image-service-node';
import { CustomSmoothStep } from './custom-smooth-step';
import { initialEdges, initialNodes } from './image-chart-data';
import { ServiceNodeData } from './image-service-node.types';

const nodeTypes = {
  service: ServiceNode,
}

const edgeTypes = {
  smoothstep: CustomSmoothStep,
}

export const ImageChart = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    
  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onLayout = useCallback(async () => {
    const ns = initialNodes;
    const es = initialEdges;

    const res = await getLayoutedElements(ns, es) as unknown as { nodes: Node<ServiceNodeData, "service">[], edges: Edge[] };
    
    setNodes(res.nodes);
    setEdges(res.edges);

  }, [setEdges, setNodes]);
  
  useLayoutEffect(() => {
    onLayout();
  }, [onLayout]);

    return (
      <ReactFlow 
        nodes={nodes} 
        edges={edges}
        nodeTypes={nodeTypes} 
        edgeTypes={edgeTypes}
        fitView 
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}>
          <Background />
          <Controls />
      </ReactFlow>
    );
}