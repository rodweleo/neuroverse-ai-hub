

import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import useAuthModal from "@/hooks/use-auth-modal"
import AuthForm from "./auth-form"

export default function AuthModal() {
    const { isOpen, setOpen } = useAuthModal()

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