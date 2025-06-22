
import { LedgerCanister } from "@dfinity/ledger-icp";

export const getAccountBalance = async (accountIdentifier: string) => {
    try {
        const ledger = LedgerCanister.create();

        const balance = await ledger.accountBalance({
            accountIdentifier: accountIdentifier
        });


        return Number(balance)

    } catch (e) {
        return 0
    }
}