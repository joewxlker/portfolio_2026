"use client"

import { useEffect, useRef } from "react"
import { Handle, Node, Position, useUpdateNodeInternals } from "reactflow"
import { PortData, ServiceNodeData } from "./image-service-node.types";

type ServiceNode = Omit<Node<ServiceNodeData, "service" | string>, "position">;

const Port = ({ port, id, route, source, target, index }: PortData & { index: number }) => {
    const ref = useRef<HTMLDivElement | null>(null);

    return (
        <>
            <div style={{ height: 35 }} ref={ref} className="text-secondary-text/80 flex flex-row items-center justify-between gap-3 border-t border-t-trim/20 py-1 w-full px-2 text-sm">
                : {port} <span>{route}</span>
                <div className="h-2 w-2 rounded-full bg-green-400 border-2 border-green-600" />
            </div>
            {target && <Handle id={id} type="target" position={Position.Left} style={{ top: (index * 35) + 45 + 20 }}/>}
            {source && <Handle id={id} type="source" position={Position.Right} style={{ top: (index * 35) + 45 + 20 }}/>}
        </>
    )
}

export const ServiceNode = ({ data, ...rest }: ServiceNode) => {
    const update = useUpdateNodeInternals();

    useEffect(() => update(rest.id), [rest.id, update]);

    return (
        <div className="bg-modal text-secondary-text w-50 flex flex-col items-center rounded-sm">
            <div style={{ height: 45 }} className="w-full flex items-center justify-center text-md">
                {data.label}
            </div>
            <Handle type="target" position={Position.Left} style={{ top: 45 / 2 }}/>
            <Handle type="source" position={Position.Right} style={{ top: 45 / 2 }}/>
            {data.ports?.map((port, index) => (<Port key={port.id} {...port} index={index} />))}
        </div>
    )
}