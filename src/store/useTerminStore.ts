import axios from "axios";
import create from "zustand";
import useAuthStore from "./useAuthStore";

enum Intervall {
    DAILY = "daily",
    WEEKLY = "weekly",
    MONTHLY = "monthly"
}

export interface IAppointment {
    title: string,
    details: string,
    date: string
    ort: string,
    intervall: Intervall,
    emailList: string[]
}

export interface ITermineResponse {
    appointments: IAppointment[] | undefined
}

export interface ITermine {
    appointments: IAppointment[] | undefined,
    getAppointments: () => Promise<void>,
    postAppointments: (termin: IAppointment) => Promise<void>,
}


const useTerminStore = create<ITermine>((set, get) => ({
    appointments: undefined,
    getAppointments: async () => {
        const { token } = useAuthStore((state) => state);
        const { data } = await axios.get<ITermineResponse>(process.env.REACT_APP_APPOINTMENTS!, {
            headers: {
                Authorization: token
            }
        })
        set((prev) => ({ appointments: data.appointments }));
    },
    postAppointments: async (termin) => {
        const { token } = useAuthStore((state) => state);
        const { data } = await axios.post(process.env.REACT_APP_APPOINTMENTS!, {
            ...termin
        }, {
            headers: {
                Authorization: token
            }
        })
        await get().getAppointments();
    }

}))

export default useTerminStore;
