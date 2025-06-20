import { AuthClient } from "@dfinity/auth-client";
import { Account, AccountIdentifier, Icrc1TransferRequest, LedgerCanister } from "@dfinity/ledger-icp";
import { IcrcLedgerCanister } from "@dfinity/ledger-icrc";
import { Principal } from "@dfinity/principal";
import { HttpAgent } from '@dfinity/agent';

export const initAuthClient = async () => {
    const authClient = await AuthClient.create();

    return authClient;
}

export const initIcpLedger = async (ledgerCanisterId?: string) => {
    try {

        const authClient = await initAuthClient();

        const canisterId = ledgerCanisterId ? ledgerCanisterId : "ryjl3-tyaaa-aaaaa-aaaba-cai"

        const LEDGER_CANISTER_ID: Principal = Principal.fromText(canisterId);

        if (await authClient.isAuthenticated()) {
            const identity = authClient.getIdentity()

            const isLocalDevelopment = process.env.DFX_NETWORK !== 'ic';

            const agent = await HttpAgent.create({
                identity,
                host: isLocalDevelopment ? 'http://localhost:4943' : 'https://ic0.app'
            });

            if (isLocalDevelopment) {
                await agent.fetchRootKey();
            }

            const ledger = LedgerCanister.create({
                agent,
                canisterId: LEDGER_CANISTER_ID
            });

            return ledger
        } else {

            //trigger a fresh authenticaion using internet identity

            throw new Error("User not authenticated.")
        }

    } catch (e) {
        console.error("Error initializing ICP ledger:", e);
        return null;
    }
}


export const getIcpBalances = async () => {

    const icpLedger = await initIcpLedger();

    const authClient = await initAuthClient();
    const identity = authClient.getIdentity()
    const principal = identity.getPrincipal()

    if (!icpLedger) {
        return BigInt(0)
    }

    const ledgerBalance = await icpLedger.accountBalance({
        accountIdentifier: AccountIdentifier.fromPrincipal({
            principal: principal,
        }),
        certified: true,
    }) || BigInt(0);

    return ledgerBalance
}

export const transferIcpToken = async (toPrincipal: string, amount: number) => {

    const ledgerCanister = await initIcpLedger();

    if (!ledgerCanister) return

    const toAccount: Account = {
        owner: Principal.fromText(toPrincipal),
        subaccount: [], // default subaccount
    };

    const transferAmount = BigInt(Math.floor(amount * 100000000)); // Convert to e8s

    const request: Icrc1TransferRequest = {
        to: toAccount,
        amount: transferAmount,
        createdAt: BigInt(Date.now() * 1000000), // Convert to nanoseconds
    };

    try {
        const blockHeight = await ledgerCanister.icrc1Transfer(request);
        return blockHeight;
    } catch (error) {
        console.log(error)
        return null;
    }
}
