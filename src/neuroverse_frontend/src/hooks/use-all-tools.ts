import NeuroverseBackendActor from "@/utils/NeuroverseBackendActor";
import { useQuery } from "@tanstack/react-query";

export const useAllTools = () => {
  return useQuery({
    queryKey: ["neuroverse_tools"],
    queryFn: async () => {
      const tools = await NeuroverseBackendActor.getTools();
      return tools;
    },
  });
};
