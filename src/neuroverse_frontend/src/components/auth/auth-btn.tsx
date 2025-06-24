
import { Button } from '@/components/ui/button';
import useAuthModal from '@/hooks/use-auth-modal';
import useAccountModal from '@/hooks/use-account-modal';
import { useAuth } from '@/contexts/use-auth-client';
import { CircleUserRound } from "lucide-react"
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

interface AuthBtnProps {
    className?: string
}

export default function AuthBtn(props: AuthBtnProps) {
    const authModal = useAuthModal()
    const { isOpen, setOpen } = useAccountModal()
    const { principal, isAuthenticated } = useAuth()
    const principalString = principal?.toString()

    useEffect(() => {
        //close the authentication pop up
        if (isOpen && isAuthenticated) {
            setOpen(false)
        }
    }, [isAuthenticated])

    const { className } = props

    if (!isAuthenticated) {
        return (<Button type="button" className={cn("bg-neon-purple/80 text-white hover:bg-neon-purple font-bold", className)}
            onClick={() => authModal.setOpen(true)}
        >
            Connect / Create Wallet
        </Button>)
    }
    return (
        <Button type="button" className={cn("bg-neon-purple/80 text-white hover:bg-neon-purple font-bold flex items-center gap-2", className)} onClick={() => setOpen(true)}>
            <CircleUserRound />
            <span>{principalString.slice(0, 8) + "..." + principalString.slice(principalString.length - 8, principalString.length)}</span>
        </Button >
    )
}