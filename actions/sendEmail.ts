"use server"

import z from "zod";

export type SendMessageActionState = { 
    errors: boolean, 
    success: boolean,
    errorMessage?: string,
    lastMessage: string | undefined,
    lastEmail: string | undefined
};

export async function sendMessage(_state: SendMessageActionState, formData: FormData) {
    const lastMessage = formData.get('message')?.toString();
    const lastEmail = formData.get('from')?.toString();

    const email = z.email().safeParse(formData.get('from')?.toString());
    if (email.error) {
        return { errors: true, errorMessage: "Invalid from address", success: false, lastMessage, lastEmail }
    }

    const message = z.string().safeParse(formData.get('message')?.toString());
    if (message.error) {
        return { errors: true, errorMessage: "Invalid message contents", success: false, lastMessage, lastEmail }
    }

    try {
        await new Promise((_, reject) => setTimeout(reject, 1000));

        return { errors: false, success: true, lastMessage: undefined, lastEmail: undefined }
    } catch {
        return { errors: true, success: false, lastMessage, lastEmail };
    }
}