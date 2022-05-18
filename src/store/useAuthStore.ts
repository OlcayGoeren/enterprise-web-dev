import { DateRange } from 'react-day-picker';
import create from 'zustand';

export interface IAuth {
    user: any;
    changeUser: (user: any) => void;
    isSignIn: boolean;
    changeIsSignIn: (boo: boolean) => void;
}

const useAuthStore = create<IAuth>((set, get) => ({
    user: null,
    isSignIn: false,
    changeUser: (user) => {
        set((prev) => ({ user: user }));
    },
    changeIsSignIn: (boo) => {
        set((prev) => ({ isSignIn: boo }));
    }
}));

export default useAuthStore;
