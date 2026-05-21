import { Edge, MarkerType, Node } from "reactflow";
import { ServiceNodeData } from "./image-service-node.types";

export const initialNodes: Node<ServiceNodeData, "service">[] = [
  {
    id: "image_api_02",
    type: "service",
    data: { 
      label: "image_api_02",
      ports: [
        {
          id: "image_api_02_8000",
          port: 8000
        }
      ] 
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "image_api_01",
    type: "service",
    data: { 
      label: "image_api_01",
      ports: [
        {
          id: "image_api_01_8000",
          port: 8000
        }
      ]
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "otelcol_01",
    type: "service",
    data: { 
      label: "otelcol_01",
      ports: [
        {
          id: "otelcol_01_4318_metrics",
          port: 4318,
          route: "/v1/metrics",
          target: true
        },
        {
          id: "otelcol_01_4318_logs",
          port: 4318,
          route: "/v1/logs",
          target: true
        },
        {
          id: "otelcol_01_8888",
          port: 8888,
          source: true
        },
        {
          id: "otelcol_01_8889",
          port: 8889,
          source: true
        },
      ]
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "loki_01",
    type: "service",
    data: { 
      label: "loki_01",
      ports: [
        {
          id: "loki_01_3100",
          port: 3100,
          source: true
        },
        {
          id: "loki_01_3100_otlp",
          port: 3100,
          route: "/otlp",
          target: true
        },
      ],
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "prometheus_01",
    type: "service",
    data: { 
      label: "prometheus_01",
      ports: [
        {
          id: "prometheus_01_9090",
          port: 9090,
          source: true
        }
      ]
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "grafana_01",
    type: "service",
    data: { 
      label: "grafana_01"
    },
    position: { x: 0, y: 0 },
  },
];

export const initialEdges: Edge[] = [
  {
    id: "image_api_01_to_otel_metrics",
    source: "image_api_01",
    target: "otelcol_01",
    type: "smoothstep",
    label: "otlp/metrics",
    targetHandle: "otelcol_01_4318_metrics",
    className: "push",
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    data: {
      direction: "push"
    }
  },
  {
    id: "image_api_01_to_otel_logs",
    source: "image_api_01",
    target: "otelcol_01",
    type: "smoothstep",
    label: "otlp/logs",
    targetHandle: "otelcol_01_4318_logs",
    className: "push",
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    data: {
      direction: "push"
    }
  },
  {
    id: "image_api_02_to_otel_metrics",
    source: "image_api_02",
    target: "otelcol_01",
    type: "smoothstep",
    label: "otlp/metrics",
    targetHandle: "otelcol_01_4318_metrics",
    className: "push",
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    data: {
      direction: "push"
    }
  },
  {
    id: "image_api_02_to_otel_logs",
    source: "image_api_02",
    target: "otelcol_01",
    type: "smoothstep",
    label: "otlp/logs",
    targetHandle: "otelcol_01_4318_logs",
    className: "push",
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    data: {
      direction: "push"
    }
  },
  {
    id: "otelcol_01_to_loki_01_logs",
    source: "otelcol_01",
    target: "loki_01",
    type: "smoothstep",
    targetHandle: "loki_01_3100_otlp",
    label: "otlp/logs",
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    data: {
      direction: "push"
    }
  },
  {
    id: "otelcol_01_to_prometheus_01",
    source: "otelcol_01",
    target: "prometheus_01",
    targetHandle: "prometheus_01_9090",
    sourceHandle: "otelcol_01_8889",
    type: "smoothstep",
    label: "prom/app_metrics",
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    data: {
      direction: "pull"
    }
  },
  {
    id: "otelcol_01_to_prometheus_01_own_metrics",
    source: "otelcol_01",
    target: "prometheus_01",
    targetHandle: "prometheus_01_9090",
    sourceHandle: "otelcol_01_8888",
    type: "smoothstep",
    label: "prom/otel_metrics",
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    data: {
      direction: "pull"
    }
  },
  {
    id: "grafana_01_query_prometheus_01",
    source: "prometheus_01",
    target: "grafana_01",
    sourceHandle: "prometheus_01_9090",
    type: "smoothstep",
    label: "prom/metrics",
    className: "query",
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    data: {
      direction: "pull"
    }
  },
  {
    id: "grafana_01_query_loki_01",
    source: "loki_01",
    target: "grafana_01",
    sourceHandle: "loki_01_3100",
    type: "smoothstep",
    label: "loki/logs",
    className: "query",
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    data: {
      direction: "pull"
    }
  },
];