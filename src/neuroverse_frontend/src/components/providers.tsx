
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Providers({ children }) {

    return (
            <QueryClientProvider client={queryClient}>
                <TooltipProvider>
                    {children}
                </TooltipProvider>
            </QueryClientProvider>
    )
}