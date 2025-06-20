
import getUserAgentsByPrincipal from "@/functions/getUserAgentsByPrincipal"
import { useQuery } from "@tanstack/react-query"

const useUserAgents = (userPrincipal) => {
    return useQuery({
        queryKey: ["neuroverse-user-agents"],
        queryFn: async () => {
            const agents = await getUserAgentsByPrincipal(userPrincipal)
            return agents
        }
    })
}

export default useUserAgents