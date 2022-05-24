import axios from "axios";
import { differenceInDays, isEqual } from "date-fns";
import create from "zustand";


enum Intervall {
    DAILY = "daily",
    WEEKLY = "weekly",
    MONTHLY = "monthly"
}

export interface IAppointment {
    title: string,
    details: string,
    date: Date,
    ort: string,
    intervall: Intervall | null,
    emailList: string[]
}

export interface IAppointmentOrdererd {
    date: Date,
    appointments: IAppointment[]
}

export interface ITermineResponse {
    appointments: IAppointment[] | undefined
}

export interface ITermine {
    localAppointments: IAppointmentOrdererd[],
    appointments: IAppointment[],
    getAppointments: (token: any) => Promise<void>,
    postAppointments: (termin: IAppointment, token: any) => Promise<void>,
    localPush: (termin: IAppointment) => void
}

const initArray: IAppointment[] = [
    {
        date: new Date(2022, 5, 24, 16, 0, 0, 0),
        details: "Um diese Zeit sollten wir ca. ankommen",
        emailList: ["olcaygoeren@gmail.com"],
        intervall: Intervall.DAILY,
        ort: "Italien",
        title: "ANKUNFT"
    },
    {
        date: new Date(2022, 5, 26, 16, 0, 0, 0),
        details: "MAILAND MAILAND MAILAND",
        emailList: ["olcaygoeren@gmail.com"],
        intervall: null,
        ort: "Italien",
        title: "MAILAND"
    },
    {
        date: new Date(2022, 5, 29, 8, 0, 0, 0),
        details: "Bakc fahren",
        emailList: ["olcaygoeren@gmail.com"],
        intervall: null,
        ort: "ITALIEN",
        title: "Rückfahrt"
    }, {
        date: new Date(2022, 5, 29, 8, 0, 0, 0),
        details: "details",
        emailList: ["olcaygoeren@gmail.com"],
        intervall: Intervall.DAILY,
        ort: "BERLIN",
        title: "Wir sind zurück 😎"
    },
]

const initOrdered: IAppointmentOrdererd[] = [
    {
        date: new Date(2022, 2, 30, 12, 0, 0, 0),
        appointments: [
            {
                date: new Date(2022, 5, 24, 16, 0, 0, 0),
                details: "Um diese Zeit sollten wir ca. ankommen",
                emailList: ["olcaygoeren@gmail.com"],
                intervall: Intervall.DAILY,
                ort: "Italien",
                title: "ANKUNFT"
            },
            {
                date: new Date(2022, 5, 24, 16, 0, 0, 0),
                details: "Um diese Zeit sollten wir ca. ankommen",
                emailList: ["olcaygoeren@gmail.com"],
                intervall: Intervall.DAILY,
                ort: "Italien",
                title: "ANKUNFT"
            }
        ]
    },
    {
        date: new Date(2022, 4, 30, 12, 0, 0, 0),
        appointments: [
            {
                date: new Date(2022, 5, 24, 16, 0, 0, 0),
                details: "Um diese Zeit sollten wir ca. ankommen",
                emailList: ["olcaygoeren@gmail.com"],
                intervall: Intervall.DAILY,
                ort: "Italien",
                title: "ANKUNFT"
            }

        ]
    },
    {
        date: new Date(2022, 5, 30, 12, 0, 0, 0),
        appointments: [
            {
                date: new Date(2022, 5, 24, 16, 0, 0, 0),
                details: "Um diese Zeit sollten wir ca. ankommen",
                emailList: ["olcaygoeren@gmail.com"],
                intervall: Intervall.DAILY,
                ort: "Italien",
                title: "ANKUNFT"
            },
            {
                date: new Date(2022, 5, 24, 16, 0, 0, 0),
                details: "Um diese Zeit sollten wir ca. ankommen",
                emailList: ["olcaygoeren@gmail.com"],
                intervall: Intervall.DAILY,
                ort: "Italien",
                title: "ANKUNFT"
            },
            {
                date: new Date(2022, 5, 24, 16, 0, 0, 0),
                details: "Um diese Zeit sollten wir ca. ankommen",
                emailList: ["olcaygoeren@gmail.com"],
                intervall: Intervall.DAILY,
                ort: "Italien",
                title: "ANKUNFT"
            },

        ]
    },
    {
        date: new Date(2022, 6, 30, 12, 0, 0, 0),
        appointments: [

        ]
    }
]

const useTerminStore = create<ITermine>((set, get) => ({
    localAppointments: initOrdered,
    localPush: (termin) => {
        const justPushedDate = new Date(termin.date.getFullYear(), termin.date.getMonth(), termin.date.getDate());
        let arry = get().localAppointments;
        let marker = {
            i: 0,
            diff: 0
        }
        let pushed = false;
        for (let i = 0; i < arry.length; i++) {
            const element = arry[i];
            const justElementDate = new Date(element.date.getFullYear(), element.date.getMonth(), element.date.getDate())

            if (isEqual(justPushedDate, justElementDate)) {

                arry[i].appointments.push(termin)
                set((prev) => ({ localAppointments: arry }));
                pushed = true;
                break;
            } else {
                const days = differenceInDays(justPushedDate, justElementDate);
                if (marker.diff == 0 || marker.diff < days) {
                    marker.diff = days;
                    marker.i = i
                }
            }
        }
        if (pushed === false) {
            let appointment: IAppointmentOrdererd = {
                date: new Date(termin.date.getFullYear(), termin.date.getMonth(), termin.date.getDay()),
                appointments: [termin]
            }
            arry.splice(marker.i, 0, appointment);
            set((prev) => ({ localAppointments: arry }));
        }
    },
    appointments: initArray,
    getAppointments: async (token) => {
        const { data } = await axios.get<ITermineResponse>(process.env.REACT_APP_APPOINTMENTS!, {
            headers: {
                Authorization: token
            }
        })
        set((prev) => ({ appointments: data.appointments }));
    },
    postAppointments: async (termin, token) => {

        const { data } = await axios.post(process.env.REACT_APP_APPOINTMENTS!, {
            ...termin
        }, {
            headers: {
                Authorization: token
            }
        })
        await get().getAppointments(token);
    }

}))

export default useTerminStore;
