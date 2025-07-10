import Types "Types";
import Principal "mo:base/Principal";

module Helpers {
    public func getToolParameter(arguments : [Types.ToolCallArgument], paramName : Text) : Text {
        for (arg in arguments.vals()) {
            if (arg.name == paramName) {
                return arg.value;
            };
        };
        " ";
    };

    public func derivePathFromUserId(userId : Principal) : [Blob] {
        [Principal.toBlob(userId)];
    };

};
