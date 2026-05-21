export type Metadata = {
    id: number,
    url: string,
    is_cached: boolean,
    key: string
}

export async function getImageApiStatus(): Promise<"healthy" | "unhealthy"> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/health/ready`, {
            cache: "no-store",
        });

        if (!response.ok) {
            return "unhealthy";
        }

        const data = (await response.json()) as { status?: string };

        return data.status === "ready" ? "healthy" : "unhealthy";
    } catch (err) {
        if (!(err instanceof TypeError)) {
            throw err;
        }
        
        return "unhealthy";
    }
}

export const getImageMetadata = async (imageId: number, height: number, width: number) => {
    const res = await fetch(imageMetadataUrl(imageId, height, width));
    const data = await res.json() as Omit<Metadata, "url">;
    const url = imageUrl(imageId, height, width);

    return { ...data, url } as Metadata;
}

export const imageUrl = (index: number, height: number, width: number) => 
    `${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/images/${index}?height=${height}&width=${width}`;

export const imageMetadataUrl = (index: number, height: number, width: number) => 
    `${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/images/${index}/metadata?height=${height}&width=${width}`;