
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button"
import TokenService from "@/services/TokenService"
import { useAuth } from "@/contexts/use-auth-client"
import { toast } from "@/hooks/use-toast"
import { getAccountIdFromPrincipal } from '@/utils';
import { Principal } from "@dfinity/principal";

interface PayWithPlugWalletBtnProps {
    className?: string;
    label?: string;
    params?: {
        principal?: Principal;
        amount: number
    }
}

export default function PayWithPlugWalletBtn(props: PayWithPlugWalletBtnProps) {
    const { principal: fallbackPrincipal } = useAuth()
    const { label, className, params } = props
    const { principal, amount } = params

    const handleTransfer = async () => {
        if (!window.ic?.plug) {
            toast({
                title: "Plug Wallet not available",
                description: "Please install the Plug extension.",
                variant: "destructive",
            });
            return;
        }

        if (!principal) {
            return
        }

        const tokenService = new TokenService();
        const accountId = getAccountIdFromPrincipal(principal ? principal : fallbackPrincipal)
        const res = await tokenService.plugWalletRequestTransfer(
            accountId,
            amount
        )

        console.log(res)
    }

    return (
        <Button type="button" className={cn("bg-neon-purple/80 text-white hover:bg-neon-purple font-bold", className)}
            onClick={handleTransfer}
        >
            {label ? label : "Subscribe Now"}
        </Button>
    )
}