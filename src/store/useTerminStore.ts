import axios from "axios";
import { isEqual } from "date-fns";
import create from "zustand";
import React, { useEffect, useRef, useState } from 'react';



export enum Intervall {
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
    appointments: IAppointmentOrdererd[] | undefined
}

export interface ITermine {
    localAppointments: IAppointmentOrdererd[],
    getAppointments: (token: any) => Promise<void>,
    postAppointments: (termin: IAppointment, token: any) => Promise<void>,
    localPush: (termin: IAppointment) => void,
    localDelete: (numOne: number, numTwo: number) => void,
    singleRef?: React.RefObject<HTMLDivElement>,
    listRef?: React.RefObject<HTMLDivElement[]>
    setSingleRef?: (ref: React.RefObject<HTMLDivElement>) => void,
    setListRef?: (ref: React.RefObject<HTMLDivElement[]>) => void
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
        date: new Date(2022, 1, 30, 12, 0),
        appointments: [
            {
                date: new Date(2022, 1, 24, 16, 30),
                details: "Um diese Zeit sollten wir ca. ankommen",
                emailList: ["olcaygoeren@gmail.com"],
                intervall: Intervall.DAILY,
                ort: "Italien",
                title: "ANKUNFT"
            },
            {
                date: new Date(2022, 1, 24, 18, 20),
                details: "Um diese Zeit sollten wir ca. ankommen",
                emailList: ["olcaygoeren@gmail.com"],
                intervall: Intervall.DAILY,
                ort: "Italien",
                title: "ANKUNFT"
            }
        ]
    },
    {
        date: new Date(2022, 3, 24, 12, 0),
        appointments: [
            {
                date: new Date(2022, 3, 24, 22, 30),
                details: "Um diese Zeit sollten wir ca. ankommen",
                emailList: ["olcaygoeren@gmail.com"],
                intervall: Intervall.DAILY,
                ort: "Italien",
                title: "ANKUNFT"
            }

        ]
    },
    {
        date: new Date(2022, 4, 30, 12, 0),
        appointments: [
            {
                date: new Date(2022, 4, 30, 12, 0),
                details: "Um diese Zeit sollten wir ca. ankommen",
                emailList: ["olcaygoeren@gmail.com"],
                intervall: Intervall.DAILY,
                ort: "Italien",
                title: "ANKUNFT"
            },
            {
                date: new Date(2022, 4, 30, 12, 0),
                details: "Um diese Zeit sollten wir ca. ankommen",
                emailList: ["olcaygoeren@gmail.com"],
                intervall: Intervall.DAILY,
                ort: "Italien",
                title: "ANKUNFT"
            },
            {
                date: new Date(2022, 4, 30, 12, 0),
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
        let arry = [...get().localAppointments];
        let pushed = false;
        for (let i = 0; i < arry.length; i++) {
            const element = arry[i];
            const justElementDate = new Date(element.date.getFullYear(), element.date.getMonth(), element.date.getDate())
            if (isEqual(justPushedDate, justElementDate)) {
                arry[i].appointments.push(termin)
                set((prev) => ({ localAppointments: arry }));
                pushed = true;
                break;
            }
        }
        if (pushed === false) {
            let appointment: IAppointmentOrdererd = {
                date: termin.date,
                appointments: [termin]
            }
            arry.push(appointment);
            arry.sort(function (a, b) { return a.date.getTime() - b.date.getTime() });
            set((prev) => ({ localAppointments: arry }));
        }
    },
    localDelete: (numOne: number, numTwo: number) => {
        let arry = [...get().localAppointments];
        arry[numOne].appointments.splice(numTwo, 1);
        set((prev) => ({ localAppointments: arry }));
    },
    getAppointments: async (token) => {
        const { data } = await axios.get<ITermineResponse>(process.env.REACT_APP_APPOINTMENTS!, {
            headers: {
                Authorization: token
            }
        })
        set((prev) => ({ localAppointments: data.appointments }));
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
    },
    singleRef: React.createRef<HTMLDivElement>(),
    listRef: React.createRef<HTMLDivElement[]>(),
    setSingleRef: (ref: React.RefObject<HTMLDivElement>) => {
        set((prev) => ({ singleRef: ref }));
    },
    setListRef: refList => {
        set((prev) => ({ listRef: refList }));
    }

}))

export default useTerminStore;
