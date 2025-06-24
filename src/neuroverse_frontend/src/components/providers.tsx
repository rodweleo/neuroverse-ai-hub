
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarProvider } from "@/components/ui/sidebar"

const queryClient = new QueryClient();

export default function Providers({ children }) {

    return (
        <SidebarProvider>
            <QueryClientProvider client={queryClient}>
                <TooltipProvider>
                    {children}
                </TooltipProvider>
            </QueryClientProvider>
        </SidebarProvider>
    )
}