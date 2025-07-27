import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Tool "./tool";

module ToolRegistry {
  public type Tool = {
    id : Text;
    name : Text;
    description : Text;
    function_name : Text;
    creator : Principal;
    category : Text;
    price : Nat;
    decimals : Nat;
    currency : Text;
    tool_type : Text;
    parameters : [Tool.Parameters];
  };

};
