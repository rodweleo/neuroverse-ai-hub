
import { Principal } from "@dfinity/principal";
import { AccountIdentifier } from "@dfinity/ledger-icp";

export const getAccountIdFromPrincipal = (principal: Principal) => {
    const accountId = AccountIdentifier.fromPrincipal({ principal }).toHex();
    return accountId
}