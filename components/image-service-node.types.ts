export type PortData = {
    id: string,
    port: number,
    route?: string,
    source?: boolean,
    target?: boolean
}

export type ServiceNodeData = {
    label: string,
    ports?: PortData[]
}