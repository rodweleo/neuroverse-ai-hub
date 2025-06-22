
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarProvider } from "@/components/ui/sidebar"
import AuthModal from "./auth/auth-modal";

const queryClient = new QueryClient();

export default function Providers({ children }) {

    return (
        <SidebarProvider>
            <QueryClientProvider client={queryClient}>
                <TooltipProvider>
                    {children}
                    <AuthModal />
                </TooltipProvider>
            </QueryClientProvider>
        </SidebarProvider>
    )
}