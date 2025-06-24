// src/hooks/use-auth-client.ts
import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent, Identity } from "@dfinity/agent";
import type { Principal } from "@dfinity/principal";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { createActor, canisterId } from "../../../declarations/neuroverse_backend";
import NeuroverseBackendActor from "@/utils/NeuroverseBackendActor";
import { useNavigate } from "react-router-dom"

const development = process.env.DFX_NETWORK !== "ic";

const getIdentityProvider = () => {
    if (typeof window !== "undefined") {
        return development
            ? "http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943"
            : "https://identity.ic0.app";
    }
    return undefined;
};

const defaultOptions = {
    createOptions: {
        idleOptions: {
            disableDefaultIdleCallback: true,
            disableIdle: true,
        },
    },
    loginOptions: {
        identityProvider: getIdentityProvider(),
        maxTimeToLive: BigInt(1) * BigInt(24) * BigInt(3600000000000),
    },
};

const useAuthClient = (options = defaultOptions) => {
    const navigate = useNavigate()
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);
    const [authClient, setAuthClient] = useState<AuthClient | undefined>();
    const [identity, setIdentity] = useState<Identity | undefined>();
    const [principal, setPrincipal] = useState<Principal | undefined>();
    const [whoamiActor, setWhoamiActor] = useState<any>(null);
    const [agent, setAgent] = useState<HttpAgent | undefined>();
    const [accountId, setAccountId] = useState<string | undefined>(undefined);
    const [whoAmI, setWhoAmI] = useState<string>("");
    const [signInMethod, setSignInMethod] = useState("");


    useEffect(() => {
        const initAuth = async () => {
            const client = await AuthClient.create();
            await updateClient(client);
        };
        initAuth();
    }, [navigate]);

    const initAgentAndActor = async (identity: Identity) => {
        const agent = new HttpAgent({ identity, host: development ? "http://localhost:4943" : "https://icp0.io" });
        if (development) await agent.fetchRootKey();

        const actor = createActor(canisterId as string, { agent });
        setAgent(agent);
        setWhoamiActor(actor);

        const whoAmI = await NeuroverseBackendActor.whoami();
        setWhoAmI(whoAmI.toString());
    };

    const signInWithIcpAuthenticator = async () => {
        if (!authClient) {
            toast({ title: "Error", description: "Auth client not ready.", variant: "destructive" });
            return;
        }

        authClient.login({
            ...options.loginOptions,
            onSuccess: async () => {
                const identity = authClient.getIdentity();
                setIdentity(identity);
                setPrincipal(identity.getPrincipal());
                await initAgentAndActor(identity);
                setIsAuthenticated(true);
                toast({
                    title: "Login successful",
                    description: `Welcome ${identity.getPrincipal().toText()}`,
                });
                setSignInMethod("Internet Identity");
            },
            onError: (err) => {
                toast({ title: "Login failed", description: err, variant: "destructive" });
            }
        });
    };

    const signInWithPlugWallet = async () => {
        if (!window.ic?.plug) {
            toast({
                title: "Plug Wallet not available",
                description: "Please install the Plug extension.",
                variant: "destructive",
            });
            return;
        }

        setIsAuthenticating(true);
        try {
            await window.ic.plug.requestConnect({
                whitelist: ["7w546-riaaa-aaaaj-azwja-cai", "64s6e-tyaaa-aaaaj-azwoa-cai"],
                host: "https://mainnet.dfinity.network",
            });

            const agent = await window.ic.plug.agent;
            const principal = await window.ic.plug.principalId;
            const accountId = await window.ic.plug.accountId;

            setAgent(agent);
            setPrincipal(principal);
            setAccountId(accountId);
            setSignInMethod("Plug Wallet");

            toast({
                title: "Login successful",
                description: `Welcome ${principal.toText?.() || principal}`,
            });
        } catch (e: any) {
            toast({
                title: "Login failed",
                description: e.message,
                variant: "destructive",
            });
        } finally {
            setIsAuthenticating(false);
        }
    };

    const signInWithNfid = async () => {
        const client = await AuthClient.create(defaultOptions.createOptions);

        const APP_NAME = "NeuroVerse";
        const APP_LOGO = "https://yourapp.com/logo.png";
        const CONFIG_QUERY = `?applicationName=${APP_NAME}&applicationLogo=${APP_LOGO}`;
        const identityProvider = `https://nfid.one/authenticate${CONFIG_QUERY}`;

        client.login({
            identityProvider,
            onSuccess: async () => {
                const identity = client.getIdentity();
                setIdentity(identity);
                setPrincipal(identity.getPrincipal());
                await initAgentAndActor(identity);
                setAuthClient(client);
                setIsAuthenticated(true);

                toast({
                    title: "Login successful",
                    description: `Welcome back ${identity.getPrincipal().toText()}`,
                });

                setSignInMethod("NFID");
            },
            onError: (err) => {
                toast({ title: "Login failed", description: err, variant: "destructive" });
            },
            windowOpenerFeatures: `left=${window.screen.width / 2 - 525 / 2},top=${window.screen.height / 2 - 705 / 2
                },toolbar=0,location=0,menubar=0,width=525,height=705`,
        });
    };

    async function updateClient(client: AuthClient) {
        if (!client) return

        setAuthClient(client)

        const isAuthenticated = await client.isAuthenticated();
        setIsAuthenticated(isAuthenticated);

        if (isAuthenticated) {
            const identity = client.getIdentity();
            setIdentity(identity);
            setPrincipal(identity.getPrincipal());
            setAuthClient(client);
            await initAgentAndActor(identity);
        }
    }

    async function logout() {
        if (!authClient) return;

        await authClient.logout();
        setIdentity(undefined);
        setIsAuthenticated(false);
        setAgent(undefined);
        setPrincipal(undefined);
        setWhoamiActor(null);
        setAccountId(undefined);
        setWhoAmI("");
        setSignInMethod("");
    }

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
        whoAmI,
        signInMethod,
    };
};

export default useAuthClient;
