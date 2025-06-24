
import { toast } from "@/hooks/use-toast"

class TokenService {

    constructor() { }

    async plugWalletRequestTransfer(to, amount) {

        try {
            //try to connect to plug wallet first
            const hasAllowed = await window.ic?.plug?.requestConnect();

            if (hasAllowed) {
                const requestTransferArg = {
                    to: to,
                    amount: amount,
                };

                try {
                    const txReceipt = await window.ic?.plug?.requestTransfer(requestTransferArg);
                    return txReceipt
                } catch (error) {
                    if (typeof error !== "string") {
                        toast({
                            title: "Transfer error",
                            description: `Plug wallet failed to transfer: ${error.message}`,
                            variant: "destructive"
                        })
                    }

                    toast({
                        title: "Transfer error",
                        description: `Plug wallet failed to transfer: ${error}`,
                        variant: "destructive"
                    })
                    console.log(error)
                    return null
                }
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export default TokenService