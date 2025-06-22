import NeuroverseBackendActor from "@/utils/NeuroverseBackendActor";

const getAllAgentVendors = async () => {
    try {
        const agentVendors = await NeuroverseBackendActor.getAllAgentVendors();
        return agentVendors
    } catch (e) {
        console.log(e)
        return []
    }
}

export default getAllAgentVendors