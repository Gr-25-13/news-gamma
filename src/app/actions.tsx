"use client"

import { useEffect } from "react"
import { toast } from "sonner"


export function CookieSonner() {
    useEffect(() => {
        const toastId = toast("This site uses necessary cookies", {
            description: "We do not share your information to third parties.",
            duration: 0, //stays until manually closed
            action: {
                label: "Accept",
                onClick: () => {
                    toast.dismiss(toastId) //closes toast
                    console.log("Cookies accepted!")
                },
            },
        })
    }, [])

    return null // nothing visible, just triggers toast
}


