
import React, { createContext, useContext } from "react";
import useAuthClient from "@/hooks/use-auth-client";

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthContext = createContext<any>({});

const AuthProvider = ({ children }: AuthProviderProps) => {
    const auth = useAuthClient();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

function useAuth() {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth };
