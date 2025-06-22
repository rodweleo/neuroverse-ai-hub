
import { AuthClient } from "@dfinity/auth-client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { HttpAgent, Identity } from "@dfinity/agent";
import type { Principal } from "@dfinity/principal";
import { createAgent } from "@dfinity/utils";
import { toast } from "@/hooks/use-toast";
import { createActor, canisterId } from "../../../declarations/neuroverse_backend";
import NeuroverseBackendActor from "@/utils/NeuroverseBackendActor";
import { useNavigate } from 'react-router-dom';

interface AuthContentProps { isAuthenticating: boolean; isAuthenticated: boolean | undefined; signInWithIcpAuthenticator: () => void; signInWithPlugWallet: () => void; signInWithNfid: () => void; logout: () => void; authClient: AuthClient | undefined; identity: Identity | undefined; principal: Principal | undefined; whoamiActor: null; agent: HttpAgent | undefined, whoAmI: string }
const AuthContext = createContext<Partial<AuthContentProps>>({});

// Mode
const development = process.env.DFX_NETWORK !== "ic"

export const getIdentityProvider = () => {
    let idpProvider;
    // Safeguard against server rendering
    if (typeof window !== "undefined") {
        const isLocal = process.env.DFX_NETWORK !== "ic";
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        if (isLocal) {
            // if (isSafari) {
            //     idpProvider = `http://localhost:4943?canisterId=${process.env.CANISTER_ID_INTERNET_IDENTITY! || "rdmx6-jaaaa-aaaaa-aaadq-cai"}`;
            // } else {
            //     idpProvider = `http://${process.env.CANISTER_ID_INTERNET_IDENTITY! || "rdmx6-jaaaa-aaaaa-aaadq-cai"}.localhost:4943`
            // }
            idpProvider = 'http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943'
        } else {
            idpProvider = `https://identity.ic0.app`;
        }
    }
    return idpProvider;
};

const days = BigInt(1);
const hours = BigInt(24);
const nanoseconds = BigInt(3600000000000);

export const defaultOptions = {
    /**
     *  @type {import("@dfinity/auth-client").AuthClientCreateOptions}
     */
    createOptions: {
        idleOptions: {
            disableDefaultIdleCallback: true,
            disableIdle: true
        },
    },
    /**
     * @type {import("@dfinity/auth-client").AuthClientLoginOptions}
     */
    loginOptions: {
        identityProvider: getIdentityProvider(),
        maxTimeToLive: days * hours * nanoseconds,
    },
};

/**
 *
 * @param options - Options for the AuthClient
 * @param {AuthClientCreateOptions} options.createOptions - Options for the AuthClient.create() method
 * @param {AuthClientLoginOptions} options.loginOptions - Options for the AuthClient.login() method
 * @returns
 */
export const useAuthClient = (options = defaultOptions) => {
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);
    const [authClient, setAuthClient] = useState<AuthClient | undefined>();
    const [identity, setIdentity] = useState<Identity | undefined>(undefined);
    const [principal, setPrincipal] = useState<Principal | undefined>(undefined);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [whoamiActor, setWhoamiActor] = useState<any>(null);
    const [agent, setAgent] = useState<HttpAgent | undefined>(undefined);
    const [accountId, setAccountId] = useState(undefined)
    const [whoAmI, setWhoAmI] = useState<string>("")

    const [signInMethod, setSignInMethod] = useState("");

    const navigate = useNavigate()


    useEffect(() => {
        // Initialize AuthClient
        AuthClient.create(options.createOptions).then(async (client) => {
            updateClient(client);
        });

    }, []);



    const signInWithIcpAuthenticator = () => {
        if (authClient) {
            authClient.login({
                ...options.loginOptions,
                onSuccess: async () => {
                    const identity = authClient.getIdentity()
                    setIdentity(identity)

                    // Create an agent
                    const agent = await createAgent({
                        identity,
                        host: development ? "http://localhost:4943" : "https://icp0.io",
                    });
                    if (development) {
                        await agent.fetchRootKey();
                    }
                    setAgent(agent);

                    initActor()
                    updateClient(authClient);
                    toast({
                        title: "Login successful",
                        description: `Welcome ${authClient.getIdentity().getPrincipal()}`
                    })

                    setSignInMethod("Internet Identity")
                },
            });
        }

    };



    const signInWithPlugWallet = async () => {
        const whiteListCanisters: string[] = [
            "7w546-riaaa-aaaaj-azwja-cai",
            "64s6e-tyaaa-aaaaj-azwoa-cai",
        ]

        const host: string = "https://mainnet.dfinity.network";

        const options = {
            whitelist: whiteListCanisters,
            host: host,
            timeout: 50000
        }

        setIsAuthenticating(true)
        if (typeof window !== "undefined") {

            try {

                const agent: HttpAgent = await window.ic.plug.agent;
                // const isWalletLocked: boolean = await window.ic.plug.isWalletLocked;
                const principalId = await window.ic.plug.principalId;

                const accountId = await window.ic.plug.accountId;

                toast({
                    title: "Login successful",
                    description: `Welcome back ${principalId.toText()}`
                })

                setAgent(agent)
                setPrincipal(principalId)
                setAccountId(accountId)

                setSignInMethod("Plug Wallet")

                navigate("/dashboard")




            } catch (e) {
                toast({
                    title: "Error",
                    description: e.message,
                    variant: "destructive"
                });
            } finally {
                setIsAuthenticating(false)
            }

        }

    }

    const signInWithNfid = async () => {
        const authClient = await AuthClient.create(defaultOptions.createOptions);

        const APP_NAME = "NeuroVerse";
        const APP_LOGO = "https://yourapp.com/logo.png";
        const CONFIG_QUERY = `?applicationName=${APP_NAME}&applicationLogo=${APP_LOGO}`;

        const identityProvider = `https://nfid.one/authenticate${CONFIG_QUERY}`;

        await new Promise<void>((resolve, reject) => {
            authClient.login({
                identityProvider,
                onSuccess: () => {
                    toast({
                        title: 'Login successful',
                        description: `Welcome back ${authClient.getIdentity().getPrincipal().toText()}`
                    })

                    updateClient(authClient);

                    setSignInMethod("NFID")

                    navigate("/dashboard")

                    resolve();
                },
                onError: reject,
                windowOpenerFeatures: `
        left=${window.screen.width / 2 - 525 / 2},
        top=${window.screen.height / 2 - 705 / 2},
        toolbar=0,location=0,menubar=0,width=525,height=705
      `,
            });
        });
    }


    async function updateClient(client: AuthClient) {
        if (!client) return

        const isAuthenticated = await client.isAuthenticated();
        setIsAuthenticated(isAuthenticated);

        const identity = client.getIdentity();
        setIdentity(identity);

        const principal = identity.getPrincipal();
        setPrincipal(principal);

        setAuthClient(client);

        const actor = createActor(canisterId, {
            agentOptions: {
                identity,
            },
        });

        setWhoamiActor(actor);

        const whoAmI = await NeuroverseBackendActor.whoami();
        setWhoAmI(whoAmI);

    }

    const initActor = () => {
        const actor = createActor(canisterId as string, {
            agentOptions: {
                identity: authClient?.getIdentity(),
            },
        });
        setWhoamiActor(actor);
    };

    async function logout() {
        if (!authClient) {
            return;
        }

        await authClient.logout();
        setIdentity(undefined);
        setIsAuthenticated(false);
        await updateClient(authClient!);

        navigate("/");

    }


    useEffect(() => {
        if (isAuthenticated) initActor();
    }, [isAuthenticated]);

    return {
        isAuthenticating,
        isAuthenticated,
        signInWithIcpAuthenticator,
        signInWithPlugWallet,
        signInWithNfid,
        logout,
        authClient,
        identity,
        principal,
        whoamiActor,
        agent,
        accountId,
        whoAmI
    };
};

/**
 * @type {React.FC}
 */

interface AuthProviderProps {
    children: React.ReactNode
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const auth = useAuthClient();

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);