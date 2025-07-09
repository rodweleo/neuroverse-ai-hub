import Types "Types"

module Helpers {
    // Helper function to extract parameter values
    public func getToolParameter(arguments : [Types.ToolCallArgument], paramName : Text) : Text {
        for (arg in arguments.vals()) {
            if (arg.name == paramName) {
                return arg.value;
            };
        };
        "";
    };
};
