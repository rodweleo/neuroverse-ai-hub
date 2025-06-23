
import { IndexCanister } from "@dfinity/ledger-icp";
import { HttpAgent } from '@dfinity/agent';
import { Principal } from "@dfinity/principal";

interface TransactionProps {
    created_at_time: Array<{ timestamp_nanos: bigint }>;
    icrc1_memo: Uint8Array[];
    memo: bigint;
    operation: TransferOperation;
    timestamp: Array<{ timestamp_nanos: bigint }>;
}

interface TransferOperation {
    amount: { e8s: bigint };
    fee: { e8s: bigint };
    from: string;
    spender: string[];
    to: string;
}

export interface Transaction {
    id: bigint;
    transaction: TransactionProps;
}

export const getAccountTransactions = async (accountIdentifier: string) => {
    try {

        // Create an agent (use the appropriate host for your environment)
        const agent = new HttpAgent({ host: 'https://ic0.app' });


        // Create an instance of the IndexCanister
        const indexCanister = IndexCanister.create({
            agent,
            canisterId: Principal.fromText("qhbym-qaaaa-aaaaa-aaafq-cai"), // ICP Index canister ID
        });

        const response = await indexCanister.getTransactions({
            accountIdentifier: accountIdentifier,
            maxResults: BigInt(10)
        });


        return response.transactions

    } catch (e) {
        console.error("Error while retrieving the ICP account transactions:" + e)
        return []
    }
}