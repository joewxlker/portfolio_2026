import {
    BaseEdge,
    EdgeLabelRenderer,
    EdgeProps,
    getSmoothStepPath
} from "reactflow";

export const CustomSmoothStep = (props: EdgeProps<{ direction: "push" | "pull" }>) => {
    const [edgePath, labelX, labelY] = getSmoothStepPath(props);

    const stroke = props.data?.direction === "push" ? "var(--color-secondary)" : "var(--color-orange-200)";

    return (
        <>
            <BaseEdge
                style={{ stroke }}
                id={props.id}
                path={edgePath}
            />
            <EdgeLabelRenderer>
                <div
                    className="bg-modal px-1 py rounded-md w-fit absolute"
                    style={{
                        transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
                    }}
                >
                    <p className="text-xs text-secondary">{props.label}</p>
                </div>
            </EdgeLabelRenderer>
        </>
    );
};