import axios from "axios";
import create, { State } from "zustand";



export interface IVisitor {
    generateVisitor: (token: string) => Promise<string>,
    putVisitor: (visitor: string, shareId: string) => Promise<any>,
    showVisitorModal: boolean,
    toggleVisitorModal: () => void,
    error: boolean
    setError: (error: boolean) => void,
    visitor: boolean,
    setVisitor: (visitor: boolean) => void
}



const useVisitorStore = create<IVisitor>((set, get) => ({
    visitor: false,
    setVisitor: (visitor: boolean) => set(() => ({ visitor })),
    error: false,
    showVisitorModal: false,
    setError(error) {
        set(state => ({ ...state, error }));
    },
    toggleVisitorModal: () => set(state => ({ showVisitorModal: !state.showVisitorModal })),
    generateVisitor: async (token) => {
        try {
            const { data } = await axios.post(process.env.REACT_APP_VISITOR!,
                null,
                {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                });
            return data;
        } catch (error) {
            console.log(error);
            get().setError(true);
        }
    },
    putVisitor: async (visitor: string, shareId: string) => {
        try {
            return await axios.put(process.env.REACT_APP_VISITOR!, {
                shareId: shareId,
                visitorEmail: visitor
            })
        } catch (error) {
            console.log(error);
            get().setError(true);
        }
    }

}));

export default useVisitorStore;
