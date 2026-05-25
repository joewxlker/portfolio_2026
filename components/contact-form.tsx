"use client"

import { sendMessage, SendMessageActionState } from "@/actions/sendEmail";
import { STYLES } from "@/app/globals";
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
        status: success ? "success" : isPending ? "pending" : failed ? "error" : "idle", 
        isPending, 
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
                aria-label="your email"
                disabled={isPending} 
                className="bg-modal/50 border border-trim/20 text-secondary-text p-2 lg:text-lg rounded-md" 
                placeholder="your@email.com" 
                type="email"
                name="from" />
            <textarea 
                required 
                defaultValue={lastMessage}
                disabled={isPending} 
                aria-label="your message"
                className="bg-modal/50 border border-trim/20 text-secondary-text p-2 lg:text-lg min-h-40 rounded-md" 
                placeholder="Tell me about your project, timeline, or goals" 
                name="message" />
            
            {status === "pending" ? 
                <button className={STYLES.pending_button} disabled>
                    <div className="flex flex-row justify-center items-center gap-5">
                        Sending
                        <svg className="animate-spin h-5 w-5 fill-secondary-text" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                            <path d="M272 112C272 85.5 293.5 64 320 64C346.5 64 368 85.5 368 112C368 138.5 346.5 160 320 160C293.5 160 272 138.5 272 112zM272 528C272 501.5 293.5 480 320 480C346.5 480 368 501.5 368 528C368 554.5 346.5 576 320 576C293.5 576 272 554.5 272 528zM112 272C138.5 272 160 293.5 160 320C160 346.5 138.5 368 112 368C85.5 368 64 346.5 64 320C64 293.5 85.5 272 112 272zM480 320C480 293.5 501.5 272 528 272C554.5 272 576 293.5 576 320C576 346.5 554.5 368 528 368C501.5 368 480 346.5 480 320zM139 433.1C157.8 414.3 188.1 414.3 206.9 433.1C225.7 451.9 225.7 482.2 206.9 501C188.1 519.8 157.8 519.8 139 501C120.2 482.2 120.2 451.9 139 433.1zM139 139C157.8 120.2 188.1 120.2 206.9 139C225.7 157.8 225.7 188.1 206.9 206.9C188.1 225.7 157.8 225.7 139 206.9C120.2 188.1 120.2 157.8 139 139zM501 433.1C519.8 451.9 519.8 482.2 501 501C482.2 519.8 451.9 519.8 433.1 501C414.3 482.2 414.3 451.9 433.1 433.1C451.9 414.3 482.2 414.3 501 433.1z"/>
                        </svg>
                    </div>
                </button> 
            : status === "error" ?
                <button className={STYLES.error_button} type="submit">
                    {errorMessage || "Send failed"}
                </button>
            : status === "success" ?
                <button className={STYLES.success_button} disabled>
                    Message delivered
                </button>
            : status === "idle" ?
                <button className={STYLES.primary_button} type="submit">
                    Send Message
                </button>
            : null}
        </form>
    )
}