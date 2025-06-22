
import { create } from "zustand";

interface AuthModalState {
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void
}

const useAuthModal = create<AuthModalState>((set) => ({
    isOpen: false,
    setOpen: (isOpen: boolean) => set({ isOpen })
}));

export default useAuthModal;