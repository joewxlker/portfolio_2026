type Payload = {
    message: string;
    stack?: string;
    name?: string;
};

export async function reportClientError(error: unknown) {
    let payload: Payload;

    if (error instanceof Error) {
        payload = {
            message: error.message,
            stack: error.stack,
            name: error.name,
        };
    } else {
        payload = {
            message: String(error),
            name: "NonErrorThrown",
        };
    }

    await fetch("/api/client-error", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            ...payload,
            url: window.location.href,
            userAgent: navigator.userAgent
        }),
        keepalive: true,
    }).catch();
}