


import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import useAccountModal from "@/hooks/use-account-modal"
import { Button } from "@/components/ui/button"
import { LogOut, Copy, Bot, LayoutDashboard } from "lucide-react"
import { useAuth } from '@/contexts/use-auth-client';
import { useIcpAccount } from "@/hooks/use-account";
import { Separator } from "@/components/ui/separator"
import { Link } from 'react-router-dom';


const accountLinks = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard
    },
    {
        label: "My Agents",
        href: "/agents",
        icon: Bot
    }
]

export default function AccountModal() {
    const { isOpen, setOpen } = useAccountModal()
    const { principal, logout } = useAuth()
    const { balance } = useIcpAccount(principal?.toString())

    const formatPrincipal = (principal) => {
        if (!principal) return ""

        return principal.toString().slice(0, 8) + "..." + principal.toString().slice(principal.toString().length - 8, principal.toString().length)
    }

    const handleLogout = async () => {
        await logout()

        //close the account modal
        if(isOpen){
            setOpen(false)
        }
    }
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
            <DialogContent className="w-full max-w-[400px] bg-black border-slate-900">
                <div className="w-full grid place-items-center space-y-2">
                    <div className="bg-slate-800 w-fit p-1 rounded-full">
                        <div className="bg-neon-purple/80 size-10 rounded-full" />
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="font-bold">{formatPrincipal(principal)}</p>
                        <Copy size={14} className="text-gray-400" />
                    </div>
                    <p className="text-gray-400 font-bold">{balance} ICP</p>
                </div>
                <ul className="w-full flex flex-col *:w-full space-y-2">
                    {accountLinks.map((link, idx) => {
                        return <li className="w-full" id={`account_link_${idx}`}>
                            <Link to={link.href} onClick={() => setOpen(false)}>
                                <Button className="bg-slate-800 hover:bg-slate-700 text-slate-400 w-full flex items-center justify-start">
                                    <link.icon /> {link.label}
                                </Button>
                            </Link>
                        </li>
                    })}
                    <Separator />
                    <li className="w-full"><Button onClick={handleLogout} className="bg-slate-800 hover:bg-slate-700 text-slate-400 w-full flex items-center justify-start"> <LogOut /> Disconnect</Button></li>
                </ul>
            </DialogContent>
        </Dialog>

    )
}