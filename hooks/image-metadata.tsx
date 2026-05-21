import { getImageMetadata, Metadata } from "@/lib/image-api";
import { reportClientError } from "@/lib/post-client-error";
import { useCallback, useEffect, useState } from "react";

export const useImageMetadata = (imageId: number, height: number, width: number) => {
    const [metadata, setMetadata] = useState<Metadata | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const refetch = useCallback(async () => {
        setIsLoading(true);

        try {
            const m = await getImageMetadata(imageId, height, width);

            setMetadata(m);
        } catch (err) {
            reportClientError(err);

            setIsError(true);
        } finally {
            setIsLoading(false)
        }
    }, [imageId, height, width]);

    useEffect(() => {
        void refetch();
    }, [imageId, refetch]);

    return { metadata, isLoading, isError, refetch }
}