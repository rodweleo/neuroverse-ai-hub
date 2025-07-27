import getAllAgents from "@/functions/getAllAgents";
import { useQuery } from "@tanstack/react-query";

const useAllAgents = () => {
  return useQuery({
    queryKey: ["neuroverse-agents"],
    queryFn: async () => {
      const agents = await getAllAgents();
      // return agents
      return [
        {
          id: "string",
          tools: ["1"],
          has_tools: false,
          system_prompt: "string",
          name: "string",
          description: "string",
          isFree: false,
          created_by: null,
          category: "Education",
          price: 2,
        },
      ];
    },
  });
};

export default useAllAgents;
