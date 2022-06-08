import axios from "axios";
import create, { State } from "zustand";
import React from 'react';
import { isEqual } from "date-fns";


export enum Intervall {
    DAILY = 0,
    WEEKLY = 1,
    MONTHLY = 2
}

export interface IAppointment {
    id?: string;
    title: string,
    details: string,
    date: Date,
    ort: string,
    intervall: Intervall | null,
    emailList: string[],
    von: Date,
    bis: Date,
}

export interface IAppointmentOrdererd {
    date: Date,
    appointments: IAppointment[]
}

export interface ITermine {
    appointments: IAppointmentOrdererd[],
    getAppointments: (token: any) => Promise<void>,
    postAppointments: (termin: IAppointment, token: any) => Promise<void>,
    putAppointment: (termin: IAppointment, token: any) => Promise<void>,
    remove: (numOne: number, numTwo: number, token: string) => void,
    singleRef?: React.RefObject<HTMLDivElement>,
    listRef?: React.RefObject<HTMLDivElement[]>
    setSingleRef?: (ref: React.RefObject<HTMLDivElement>) => void,
    setListRef?: (ref: React.RefObject<HTMLDivElement[]>) => void,
    orderSingle: (termin: IAppointment) => void,
    orderAll: (termine: IAppointment[]) => void,
}

const useTerminStore = create<ITermine>((set, get) => ({
    appointments: [],
    orderAll: (appointments: IAppointment[]) => {
        let orderedAppointments: IAppointmentOrdererd[] = [];
        appointments.forEach((appointment: IAppointment) => {
            appointment.date = new Date(appointment.date);
            appointment.von = new Date(appointment.von);
            appointment.bis = new Date(appointment.bis);
            const justElementDate = new Date(appointment.date.getFullYear(), appointment.date.getMonth(), appointment.date.getDate());
            const value = orderedAppointments.findIndex(ele => {
                return (isEqual(ele.date, justElementDate));
            });
            if (value === -1) {
                orderedAppointments.push({
                    date: justElementDate,
                    appointments: [appointment]
                })
            } else {
                orderedAppointments[value].appointments.push(appointment);
            }
        })
        orderedAppointments = orderedAppointments.map((ele) => {
            let subSorted = ele.appointments.sort((a, b) => a.von.getTime() - b.von.getTime())

            return {
                date: ele.date,
                appointments: subSorted
            }
        });
        orderedAppointments.sort(function (a, b) {
            return a.date.getTime() - b.date.getTime()
        }
        );
        set((prev) => ({ appointments: orderedAppointments }));
    },
    orderSingle: (appointment: IAppointment) => {
        const appointments = [...get().appointments];
        appointment.date = new Date(appointment.date);
        const justElementDate = new Date(appointment.date.getFullYear(), appointment.date.getMonth(), appointment.date.getDate());
        const value = appointments.findIndex(ele => isEqual(ele.date, justElementDate));
        if (value === -1) {
            appointments.push({
                date: justElementDate,
                appointments: [appointment]
            })
            appointments.sort(function (a, b) { return a.date.getTime() - b.date.getTime() });
        } else {
            appointments[value].appointments.push(appointment);
        }
        set((prev) => ({ appointments: appointments }));
        console.log(appointments);
    },
    remove: async (numOne: number, numTwo: number, token) => {
        let arry = [...get().appointments];
        const ele = arry[numOne].appointments[numTwo];
        try {
            await axios.delete(process.env.REACT_APP_APPOINTMENTS! + "/" + ele.id,
                {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                });
            get().getAppointments(token);
        } catch (error) {
            console.log(error);
        }
    },
    getAppointments: async (token) => {
        const { data } = await axios.get<IAppointment[]>(process.env.REACT_APP_APPOINTMENTS!, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        get().orderAll(data);
        // set((prev) => ({ appointments: data }));
    },
    postAppointments: async (termin, token) => {
        try {
            const { data } = await axios.post<IAppointment>(process.env.REACT_APP_APPOINTMENTS!, {
                ...termin
            }, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            get().getAppointments(token);
        } catch (error) {
            console.log(error)
        }
    },
    putAppointment: async (termin, token) => {
        // iwie updaten den lokal state!
        try {
            const { data } = await axios.put(process.env.REACT_APP_APPOINTMENTS! + "/" + termin.id, {
                ...termin
            }, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            get().getAppointments(token);
        } catch (error) {
            console.log(error)
        }
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
