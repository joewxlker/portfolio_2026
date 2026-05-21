import { getImageApiStatus } from "@/lib/image-api";
import { reportClientError } from "@/lib/post-client-error";
import { useEffect, useRef, useState } from "react";

export const useImageApiStatus = () => {
    const [status, setStatus] = useState<"healthy" | "unhealthy" | "unreachable" | undefined>();
    const [loading, setLoading] = useState(true);
    const interval = useRef<ReturnType<typeof window.setInterval> | null>(null);

    const poll = async () => {
        try {
            const status = await getImageApiStatus();

            setStatus(status);
        } catch (err) {
            reportClientError(err);

            setStatus("unreachable");
        } finally {
            setLoading(false);
        }
    }

    const clearCurrentInterval = () => {
        if (interval.current) {
            window.clearInterval(interval.current)
        }
    };

    useEffect(() => void poll(), []);

    useEffect(() => {
        clearCurrentInterval();

        window.setInterval(poll, 3000);

        return () => clearCurrentInterval();
    }, []);

    return { state: status, isLoading: loading }
}