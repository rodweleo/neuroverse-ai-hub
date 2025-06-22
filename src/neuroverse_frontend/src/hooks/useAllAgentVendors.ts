import getAllAgentVendors from "@/functions/getAllAgentVenders";
import { useQuery } from "@tanstack/react-query";

const useAllAgentVendors = () => {
    return useQuery({
        queryKey: ["neuroverse-agent-vendors"],
        queryFn: async () => {
            const agentVendors = await getAllAgentVendors();
            return agentVendors
        }
    })
}

export default useAllAgentVendors