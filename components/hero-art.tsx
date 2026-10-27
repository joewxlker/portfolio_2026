"use client";

import { useEffect, useRef, useState } from "react"
import styles from "./hero-art.module.css";

export const Slice = ({ center, index, position, z, width = 400, height = 400, thickness = 30 }: {
    center: [number, number];
    index: number;
    position: number;
    z: number;
    width?: number;
    height?: number;
    thickness?: number;
}) => {
    return (
        <div style={{ top: center[0], left: center[1], zIndex: z, position: "absolute" }}>
            <div
                style={{ ...computeOffset(width, height, [0, position]), zIndex: z + 30 }}
                className={`${styles.gradientTop} rotate-x-65 rotate-z-40 rounded-[50px]!`}/>
            {new Array(thickness).fill(0).map((_, i) => {
                if (i < 3) {
                    return <div
                        key={`${index}-${i}`}
                        style={{ ...computeOffset(width, height, [0, position + i + 1]), zIndex: z + 20 }}
                        className={`${styles.gradientTrim} rotate-x-65 rotate-z-40 rounded-[50px]!`}/>;
                }

                if (i > (thickness - 3)) {
                    return <div
                        key={`${index}-${i}`}
                        style={{ ...computeOffset(width, height, [0, position + i + 1]), zIndex: z }}
                        className={`${styles.gradientTrim} rotate-x-65 rotate-z-40 rounded-[50px]!`}/>;
                }

                return <div
                    key={`${index}-${i}`}
                    style={{ ...computeOffset(width, height, [0, position + i + 1]), zIndex: z + 10 }}
                    className={`${styles.gradient} rotate-x-65 rotate-z-40 rounded-[50px]!`}/>;
            })}
        </div>
    )
}

export const HeroArt = () => {
    const container = useRef<HTMLDivElement>(null);
    const [center, setCenter] = useState<[number, number]>([0,0]);

    useEffect(() => {
        if (!container.current) return;

        const observer = new ResizeObserver(([element]) => {
            setCenter([
                element.target.clientHeight / 2, 
                element.target.clientWidth / 2
            ]);
        });

        observer.observe(container.current);

        return () => observer.disconnect();
    }, []);
    
    return (
        <div ref={container} className="h-full w-full relative">
            <Slice center={center} index={0} position={0} z={20} width={250} height={250} thickness={15}/>
            <Slice center={center} index={1} position={80} z={10} width={250} height={250} thickness={15}/>
            <Slice center={center} index={1} position={160} z={0} width={250} height={250} thickness={15}/>
        </div>
    )
}

const computeOffset = (width: number, height: number, offset: [number, number] = [0, 0]): Record<string, string> => {
    return {
        position: "absolute",
        top: `${offset[1]}px`,
        left: `${offset[0]}px`,
        width: `${width}px`,
        height: `${height}px`,
        translate: `-${width / 2}px -${height / 2}px`,
    };
};