import NeuroverseBackendActor from "@/utils/NeuroverseBackendActor";

const getAllAgents = async () => {
    try {
        const agents = await NeuroverseBackendActor.getAllAgents();
        return agents
    } catch (e) {
        console.log(e)
        return []
    }
}

export default getAllAgents