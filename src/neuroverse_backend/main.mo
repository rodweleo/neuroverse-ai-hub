import LLM "mo:llm";
import Model "mo:llm";
import ChatMessage "mo:llm";
import HashMap "mo:base/HashMap";
import Types "types";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Time "mo:base/Time";

actor NeuroVerse {

  type AgentsMap = HashMap.HashMap<Text, Types.Agent>; // agent_id -> agent

  private var agents = HashMap.HashMap<Text, Types.Agent>(10, Text.equal, Text.hash);
  private var userAgents = HashMap.HashMap<Principal, AgentsMap>(
    10,
    Principal.equal,
    Principal.hash,
  );

  private stable var agentStableStore : [Types.AgentEntry] = [];

  // Assume you have a map to store conversation history per (user, agent)
  private var conversationHistory : HashMap.HashMap<(Principal, Text), [Types.Message]> = HashMap.HashMap<(Principal, Text), [Types.Message]>(10, func((a, b), (c, d)) { a == c and b == d }, func((a, b)) { Principal.hash(a) + Text.hash(b) });

  public func prompt(prompt : Text) : async Text {
    await LLM.prompt(#Llama3_1_8B, prompt);
  };

  public func chat(messages : [LLM.ChatMessage]) : async Text {
    await LLM.chat(
      #Llama3_1_8B,
      [
        {
          role = #system_;
          content = "You are a helpful assistant that is very knowledgable in develping canisters and dApps on Internet Computer";
        },
        // We need to properly format the user messages
        // This assumes the last message is what we want to send
        {
          role = #user;
          content = messages[messages.size() - 1].content;
        },
      ],
    );
  };

  public func createAgent(agentId : Text, name : Text, category : Text, description : Text, system_prompt : Text, isFree : Bool, price : Nat) : async () {
    let caller = Principal.fromActor(NeuroVerse);

    let agent : Types.Agent = {
      id = agentId;
      name = name;
      category = category;
      description = description;
      system_prompt = system_prompt;
      isFree = isFree;
      price = price;
      created_by = caller;
    };

    // Get or create the user's agent map
    let agentsMap = switch (userAgents.get(caller)) {
      case (?map) map;
      case null HashMap.HashMap<Text, Types.Agent>(5, Text.equal, Text.hash);
    };

    agentsMap.put(agentId, agent);
    userAgents.put(caller, agentsMap);
  };

  public func getAllAgents() : async [Types.Agent] {
    var result : [Types.Agent] = [];
    for ((_, agentMap) in userAgents.entries()) {
      for ((_, agent) in agentMap.entries()) {
        result := Array.append(result, [agent]);
      };
    };
    result;
  };

  public func getAgentsForUser(user : Principal) : async [Types.Agent] {
    switch (userAgents.get(user)) {
      case (?agentMap) {
        Iter.toArray(agentMap.vals());
      };
      case null { [] };
    };
  };

  // Helper to get conversation history
  private func getHistory(user : Principal, agentId : Text) : [Types.Message] {
    switch (conversationHistory.get((user, agentId))) {
      case (?messages) { messages };
      case null { [] };
    };
  };

  // Helper to store a new message in history
  private func storeMessage(user : Principal, agentId : Text, message : Types.Message) : () {
    let history = getHistory(user, agentId);
    conversationHistory.put((user, agentId), Array.append<Types.Message>(history, [message]));
  };

  public shared func chatWithAgent(agentId : Text, prompt : Text) : async Text {
    let caller = Principal.fromActor(NeuroVerse);

    // Check if the agent exists in the global agents map
    switch (agents.get(agentId)) {
      case (?agent) {
        let timestamp = Time.now();

        // Retrieve conversation history for (caller, agentId)
        let history = getHistory(caller, agentId);

        // Create the new user message
        let userMessage : Types.Message = {
          role = #user;
          content = prompt;
          timestamp = timestamp;
        };

        // If history is empty, start with the system prompt
        let fullHistory = if (history.size() == 0) {
          Array.append(
            [{
              role = #system_;
              content = agent.system_prompt;
              timestamp = timestamp;
            }],
            [userMessage],
          );
        } else {
          Array.append(history, [userMessage]);
        };

        // Call the LLM with the full context
        let response = "To be implemented ";

        // Store the user message and assistant response in history
        storeMessage(caller, agentId, userMessage);
        let assistantMessage : Types.Message = {
          role = #assistant;
          content = response;
          timestamp = timestamp;
        };
        storeMessage(caller, agentId, assistantMessage);

        response;
      };
      case null { "Agent not found." };
    };
  };

  system func preupgrade() {
    agentStableStore := [];
    for ((user, agentMap) in userAgents.entries()) {
      let agentList = Iter.toArray(agentMap.entries());
      agentStableStore := Array.append(agentStableStore, [{ user = user; agents = agentList }]);
    };
  };

  system func postupgrade() {
    userAgents := HashMap.HashMap<Principal, AgentsMap>(
      10,
      Principal.equal,
      Principal.hash,
    );
    for (entry in agentStableStore.vals()) {
      let agentMap = HashMap.HashMap<Text, Types.Agent>(
        5,
        Text.equal,
        Text.hash,
      );
      for ((id, agent) in entry.agents.vals()) {
        agentMap.put(id, agent);
      };
      userAgents.put(entry.user, agentMap);
    };
  }

};
