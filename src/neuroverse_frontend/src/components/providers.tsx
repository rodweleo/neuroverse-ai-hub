
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarProvider } from "@/components/ui/sidebar"
import { AuthProvider } from "@/contexts/use-auth-client"

const queryClient = new QueryClient();

export default function Providers({ children }) {

    return (
        <AuthProvider>
            <SidebarProvider>
                <QueryClientProvider client={queryClient}>
                    <TooltipProvider>
                        {children}
                    </TooltipProvider>
                </QueryClientProvider>
            </SidebarProvider>
        </AuthProvider>
    )
}