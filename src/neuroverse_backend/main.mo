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

  public func createAgent(agentId : Text, name : Text, system_prompt : Text, isFree : Bool) : async () {
    let caller = Principal.fromActor(NeuroVerse);

    let agent : Types.Agent = {
      id = agentId;
      name = name;
      system_prompt = system_prompt;
      created_by = caller;
      isFree = isFree;
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

  // Main function to interact with agent using context
  // public func interactWithAgent(user : Principal, agentId : Text, userPrompt : Text) : async Text {
  //   let timestamp = Time.now();

  //   switch (userAgents.get(user)) {
  //     case (?agentMap) {
  //       switch (agentMap.get(agentId)) {
  //         case (?agent) {
  //           // Retrieve conversation history
  //           let history = getHistory(user, agentId);

  //           // Add the new user message to the history
  //           let userMessage : Types.Message = {
  //             role = #user;
  //             content = userPrompt;
  //             timestamp = Time.now();
  //           };

  //           // Optionally, add the system prompt as the first message if history is empty
  //           let fullHistory = if (history.size() == 0) {
  //             Array.append(
  //               [{
  //                 role = #system_;
  //                 content = agent.system_prompt;
  //                 timestamp = timestamp;
  //               }],
  //               [userMessage],
  //             );
  //           } else {
  //             Array.append(history, [userMessage]);
  //           };

  //           // Call LLM with full context
  //           let response = await LLM.chat(#Llama3_1_8B).withMessages(fullHistory).send();

  //           // Store the user message and assistant response in history
  //           storeMessage(user, agentId, userMessage);
  //           let assistantMessage : Types.Message = {
  //             role = #assistant;
  //             content = response;
  //             timestamp = timestamp;
  //           };
  //           storeMessage(user, agentId, assistantMessage);

  //           response;
  //         };
  //         case null { "Agent not found." };
  //       };
  //     };
  //     case null { "User not found." };
  //   };
  // };

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
