

import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import useAuthModal from "@/hooks/use-auth-modal"
import AuthForm from "./auth-form"
import { useAuth } from "@/contexts/use-auth-client"
import { useEffect } from "react"

export default function AuthModal() {
    const { isOpen, setOpen } = useAuthModal()
    const { isAuthenticated, principal } = useAuth()

    useEffect(() => {
        if(isOpen && isAuthenticated && principal){
            setOpen(false)
        }
    }, [isAuthenticated, principal, isOpen])

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!isOpen) {
                    setOpen(open)
                } else {
                    setOpen(false)
                }
            }}
        >
            <DialogContent className="p-0 w-fit">
                <AuthForm />
            </DialogContent>
        </Dialog>

    )
}