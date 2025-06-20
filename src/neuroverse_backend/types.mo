module {
    public type Agent = {
        id : Text;
        name : Text;
        system_prompt : Text;
        created_by : Principal;
        isFree : Bool;
    };
    public type AgentEntry = {
        user : Principal;
        agents : [(Text, Agent)];
    };
    public type Message = {
        role : { #user; #assistant; #system_ };
        content : Text;
        timestamp : Int;
    };
    public type Conversation = {
        conversation_id : Text;
        llm_id : Text;
        messages : [Message];
    };
    public type File = {
        name : Text;
        content : Blob;
        contentType : Text;
        uploadedAt : Nat64;
    };

    public type Property = {
        type_ : Text;
        name : Text;
        description : ?Text;
        enum_ : ?[Text];
    };
    public type Parameters = {
        type_ : Text;
        properties : ?[Property];
        required : ?[Text];
    };
    public type Function = {
        name : Text;
        description : ?Text;
        parameters : ?Parameters;
    };
    public type Tool = {
        #function : Function;
    };
};
