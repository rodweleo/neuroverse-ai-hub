

import { create } from "zustand";

interface AccountModalState {
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void
}

const useAccountModal = create<AccountModalState>((set) => ({
    isOpen: false,
    setOpen: (isOpen: boolean) => set({ isOpen })
}));

export default useAccountModal;