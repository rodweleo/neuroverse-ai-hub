import NeuroverseBackendActor from "@/utils/NeuroverseBackendActor";

const getUserAgentsByPrincipal = async (userPrincipal) => {

    if(!userPrincipal){
        return []
    }
    
    try {
        const agents = await NeuroverseBackendActor.getAgentsForUser(userPrincipal);
        return agents
    } catch (e) {
        console.log(e)
        return []
    }
}

export default getUserAgentsByPrincipal