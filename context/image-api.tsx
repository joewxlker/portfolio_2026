"use client"

import { createContext, useContext, ReactNode } from "react";
import { useImageApiStatus } from "@/hooks/image-api-status";

type ImageApiContextType = {
    status: ReturnType<typeof useImageApiStatus>;
};

const ImageApiContext = createContext<ImageApiContextType | undefined>(
    undefined
);

export const ImageApiProvider = ({ children }: { children: ReactNode }) => {
    const status = useImageApiStatus();

    return (
        <ImageApiContext.Provider value={{ status }}>
            {children}
        </ImageApiContext.Provider>
    );
};

export const useImageApiContext = () => {
    const context = useContext(ImageApiContext);

    if (!context) {
        throw new Error(
            "useImageApiContext must be used within an ImageApiProvider"
        );
    }

    return context;
};