"use client"

// this component wraps ReactFlowProvider in "use client" so ReactFlowProvider can be mounted
// inside server components

import { type ReactNode } from "react";
import { ReactFlowProvider as Provider } from "reactflow";

export const ReactFlowProvider = ({ children }: { children: ReactNode }) => {
    return (
        <Provider>
            {children}
        </Provider>
    )
}