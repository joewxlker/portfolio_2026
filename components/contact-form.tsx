"use client"

import { sendMessage, SendMessageActionState } from "@/actions/sendEmail";
import { STYLES } from "@/app/globals";
import Image from "next/image";
import { useActionState, useCallback, useEffect, useRef, useState } from "react"

export const initialState: SendMessageActionState = { 
    errors: false, 
    success: false,
    lastMessage: undefined,
    lastEmail: undefined
};

const useContactFormStateToggle = (changeDetected: () => boolean) => {
    const [toggled, setToggled] = useState(false);
    const timeout = useRef<number | null>(null);

    useEffect(() => {
        if (changeDetected()) {
            if (timeout.current)
                window.clearTimeout(timeout.current);

            void async function() {
                setToggled(true);

                timeout.current = window.setTimeout(() => {
                    setToggled(false)
                }, 2000);
            }();
        }

        return () => {
            if (timeout.current)
                window.clearTimeout(timeout.current)
        }
    }, [changeDetected]);

    return toggled;
}

const useContactForm = () => {
    const [state, dispatch, isPending] = useActionState(sendMessage, initialState);

    const successCallback = useCallback(() => state.success, [state]);
    const errorCallback = useCallback(() => state.errors, [state]);

    const success = useContactFormStateToggle(successCallback);
    const failed = useContactFormStateToggle(errorCallback);

    return { 
        status: success ? "success" : isPending ? "pending" : failed ? "error" : "idle", isPending, 
        dispatch,
        lastEmail: state.lastEmail, 
        lastMessage: state.lastMessage,
        errorMessage: state.errorMessage
    }
}

export const ContactForm = () => {
    const { status, isPending, lastEmail, lastMessage, errorMessage, dispatch } = useContactForm();

    return (
        <form className="flex flex-col gap-3 items-stretch w-125 max-w-full z-50" action={dispatch}>
            <input 
                defaultValue={lastEmail}
                required 
                disabled={isPending} 
                className="bg-background border border-secondary/20 text-secondary p-2 lg:text-lg rounded-md" 
                placeholder="Your email..." 
                type="email"
                name="from" />
            <textarea 
                required 
                defaultValue={lastMessage}
                disabled={isPending} 
                className="bg-background border border-secondary/20 text-secondary p-2 lg:text-lg min-h-40 rounded-md" 
                placeholder="Your message..." 
                name="message" />
            
            {status === "pending" ? 
                <button className={STYLES.pending_button} disabled>
                    <div className="flex flex-row justify-center items-center gap-5">
                        Sending
                        <Image src="/spinner.svg" alt="" className="animate-spin" height={20} width={20} />
                    </div>
                </button> 
            : status === "error" ?
                <button className={STYLES.error_button} type="submit">
                    {errorMessage || "Transmission failed"}
                </button>
            : status === "success" ?
                <button className={STYLES.success_button} disabled>
                    Message delivered
                </button>
            : status === "idle" ?
                <button className={STYLES.primary_button} type="submit">
                    Submit
                </button>
            : null}
        </form>
    )
}