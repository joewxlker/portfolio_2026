
"use client";

import { useEffect, useRef, useState } from "react";

// Geometry
const FULL_ROTATION = Math.PI * 2;
const DEFAULT_POLYGON_ROTATION = -Math.PI / 2;

const TRIANGLE_SIDES = 3;
const DIAMOND_SIDES = 4;
const PENTAGON_SIDES = 5;
const HEXAGON_SIDES = 6;
const OCTAGON_SIDES = 8;

// Shape generation
const MIN_SHAPE_SIZE = 50;
const MAX_SHAPE_SIZE = 100;
const INITIAL_SHAPE_COUNT = 10;
const SHAPE_SPAWN_INTERVAL_MS = 1000;
const SHAPE_INITIAL_Y = -100;
const DAISY_IMAGE_SRC = "/daisy.png";

// Animation
const FALL_SPEED = 1;
const ROTATION_SPEED = 0.005;
const DEFAULT_DEVICE_PIXEL_RATIO = 1;

// Shape rendering
const SHAPE_FILL_OPACITY = 0.3;
const SHAPE_STROKE_OPACITY = 0.6;
const DAISY_OPACITY = 1;
const SHAPE_STROKE_WIDTH = 0.05;
const SHAPE_DASH_LENGTH = 0.1;
const SHAPE_DASH_GAP = 0.1;
const SHAPE_BACKGROUND_CSS_VARIABLE = "--background";

// Image bounds
const IMAGE_OFFSET = -1;
const IMAGE_SIZE = 2;

type ShapeTypes =
    | "plus"
    | "cross"
    | "triangle"
    | "square"
    | "diamond"
    | "pentagon"
    | "hexagon"
    | "octagon"
    | "daisy";

const regularPolygon = (
    sides: number,
    rotation = DEFAULT_POLYGON_ROTATION
) =>
    Array.from({ length: sides }, (_, i) => {
        const angle = (i / sides) * FULL_ROTATION + rotation;
        return [Math.cos(angle), Math.sin(angle)];
    });

const shapes: Record<ShapeTypes, number[][]> = {
    plus: [
        [-0.25, -1], [0.25, -1],
        [0.25, -0.25], [1, -0.25],
        [1, 0.25], [0.25, 0.25],
        [0.25, 1], [-0.25, 1],
        [-0.25, 0.25], [-1, 0.25],
        [-1, -0.25], [-0.25, -0.25],
    ],

    cross: [
        [-0.7, -1], [0, -0.3],
        [0.7, -1], [1, -0.7],
        [0.3, 0], [1, 0.7],
        [0.7, 1], [0, 0.3],
        [-0.7, 1], [-1, 0.7],
        [-0.3, 0], [-1, -0.7],
    ],

    triangle: regularPolygon(TRIANGLE_SIDES),
    square: [
        [-1, -1], [1, -1],
        [1, 1], [-1, 1],
    ],
    diamond: regularPolygon(DIAMOND_SIDES),
    pentagon: regularPolygon(PENTAGON_SIDES),
    hexagon: regularPolygon(HEXAGON_SIDES),
    octagon: regularPolygon(OCTAGON_SIDES),
    daisy: [],
};

const shapeTypes: ShapeTypes[] = [
    "plus",
    "cross",
    "triangle",
    "square",
    "diamond",
    "pentagon",
    "hexagon",
    "octagon",
    "daisy"
];

const newShape = (
    canvasWidth: number,
    minSize: number,
    maxSize: number
) => {
    const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
    const isDaisy = type == "daisy";

    const size = minSize + Math.random() * (maxSize - minSize);
    const rotation = Math.random() * FULL_ROTATION;

    const image = isDaisy ? new Image() : undefined;

    if (image) {
        image.src = DAISY_IMAGE_SRC;
    }

    return {
        points: shapes[type],
        type,
        image,
        x: Math.floor(Math.random() * canvasWidth),
        y: SHAPE_INITIAL_Y,
        size,
        rotation,
    };
};

function drawShape(
    ctx: CanvasRenderingContext2D,
    shape: ReturnType<typeof newShape>
) {
    const { x, y, rotation, size, points } = shape;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.scale(size, size);

    if (shape.type === "daisy") {
        const image = shape.image!;

        if (image.complete && image.naturalWidth > 0) {
            ctx.globalAlpha = DAISY_OPACITY;
            ctx.drawImage(
                image,
                IMAGE_OFFSET,
                IMAGE_OFFSET,
                IMAGE_SIZE,
                IMAGE_SIZE
            );
        }

        ctx.restore();
        return;
    }

    const region = new Path2D();

    points.forEach(([px, py], i) => {
        if (i === 0) region.moveTo(px, py);
        else region.lineTo(px, py);
    });

    region.closePath();

    const trim = getComputedStyle(document.documentElement)
        .getPropertyValue(SHAPE_BACKGROUND_CSS_VARIABLE)
        .trim();

    ctx.globalAlpha = SHAPE_FILL_OPACITY;
    ctx.fillStyle = trim;
    ctx.fill(region);

    ctx.globalAlpha = SHAPE_STROKE_OPACITY;
    ctx.strokeStyle = trim;
    ctx.lineWidth = SHAPE_STROKE_WIDTH;
    ctx.setLineDash([SHAPE_DASH_LENGTH, SHAPE_DASH_GAP]);
    ctx.lineCap = "butt";
    ctx.lineJoin = "miter";
    ctx.stroke(region);

    ctx.restore();
}

export const Shapes = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const shapes = useRef<ReturnType<typeof newShape>[]>([]);
    
    const [{ width: containerWidth, height: containerHeight }, setContainerSize] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        const element = containerRef.current;
        if (!element) return;

        const observer = new ResizeObserver(([entry]) => {
            if (canvasRef.current) {
                setContainerSize({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            }
        });

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr =
            window.devicePixelRatio || DEFAULT_DEVICE_PIXEL_RATIO;

        canvas.style.width = `${containerWidth}px`;
        canvas.style.height = `${containerHeight}px`;

        canvas.width = Math.round(containerWidth * dpr);
        canvas.height = Math.round(containerHeight * dpr);

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }, [containerWidth, containerHeight]);

    const timeout = useRef<number | null>(null);
    const spawnTimeouts = useRef<number[]>([]);

    const clearTimeouts = () => {
        for (const timeout of spawnTimeouts.current) {
            if (timeout !== null) {
                window.clearTimeout(timeout);
            };
        }

        if (timeout.current !== null) {
            window.clearTimeout(timeout.current);
        };
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        shapes.current = [];
        clearTimeouts();
        
        timeout.current = window.setTimeout(() => {
            for (let i = 0; i < INITIAL_SHAPE_COUNT; i++) {
                spawnTimeouts.current.push(window.setTimeout(() => {
                    shapes.current.push(
                        newShape(
                            containerWidth,
                            MIN_SHAPE_SIZE,
                            MAX_SHAPE_SIZE
                        )
                    );
                }, SHAPE_SPAWN_INTERVAL_MS * i));
            }

            timeout.current = null;
        }, 200);

        return () => clearTimeouts();
    }, [containerWidth]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let frameId = -1;

        const animate = () => {
            ctx.clearRect(0, 0, containerWidth, containerHeight);

            for (let i = 0; i < shapes.current.length; i++) {
                const shape = shapes.current[i];

                shape.y += FALL_SPEED;
                shape.rotation =
                    (shape.rotation + ROTATION_SPEED) % FULL_ROTATION;

                if (shape.y > containerHeight + shape.size) {
                    shapes.current[i] = newShape(
                        containerWidth,
                        MIN_SHAPE_SIZE,
                        MAX_SHAPE_SIZE
                    );
                }

                drawShape(ctx, shapes.current[i]);
                i++;
            }

            frameId = requestAnimationFrame(animate);
        };

        frameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(frameId);
    }, [containerWidth, containerHeight]);

    return (
        <div ref={containerRef} className="absolute inset-0 z-10">
            <canvas ref={canvasRef} />
        </div>
    );
};
