import { NextRequest, NextResponse } from "next/server";

type ClientErrorPayload = {
  message: string;
  stack?: string;
  name?: string;
  url?: string;
  userAgent?: string;
  extra?: Record<string, unknown>;
};

export async function POST(req: NextRequest) {
    try {
        const body: ClientErrorPayload = await req.json();

        const error = new Error(body.message);
        error.name = body.name || "ClientError";

        // Preserve client stack if available
        if (body.stack) {
            error.stack = `${error.name}: ${body.message}\n\nClient stack:\n${body.stack}`;
        }

        // Log structured metadata
        console.error("Client-side error reported", {
            error,
            url: body.url,
            userAgent: body.userAgent,
            extra: body.extra,
        });

        // force route to appear as failed in dashboards
        throw error;
    } catch (err) {
        console.error("Error in client-error route", err);

        return NextResponse.json(
            { ok: false },
            { status: 500 }
        );
    }
}