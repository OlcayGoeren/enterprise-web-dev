import { DateRange } from 'react-day-picker';
import create from 'zustand';

export interface IAuth {
    token: any;
    setToken: (user: any) => void;
    isSignIn: boolean;
    changeIsSignIn: (boo: boolean) => void;
}

const useAuthStore = create<IAuth>((set, get) => ({
    token: null,
    isSignIn: true,
    setToken: (token) => {
        set((prev) => ({ token }));
    },
    changeIsSignIn: (boo) => {
        set((prev) => ({ isSignIn: boo }));
    }
}));

export default useAuthStore;
