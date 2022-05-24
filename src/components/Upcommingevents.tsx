import { MoreVert } from '@mui/icons-material';
import React, { useState } from 'react';
import useTerminStore from '../store/useTerminStore';

export interface IUpcommingeventsComponentProps {

}

const Upcommingevents: React.FunctionComponent<IUpcommingeventsComponentProps> = () => {

    const [show, setShow] = useState(true);
    const { appointments, localAppointments } = useTerminStore((store) => store);


    console.log(localAppointments);

    return (
        <div className="overflow-scroll sm:w-[25%]">
            <h1 className='text-white font-bold mb-2'>Es stehen xx Termine bevor</h1>
            {show ?
                localAppointments.map((lists) => {
                    if (lists.appointments.length > 0) {
                        return <div className="flex flex-col">
                            <span className='text-[#858383] font-bold px-4 py-2'>{lists.date.getDate()}</span>
                            {lists.appointments.map((ele) => {
                                return <div className="card flex mb-2 flex-col bg-[#1D355C] text-[#CFCFCF] p-4 rounded-xl shadow-md relative">
                                    <span className="text-[12px]">Donnerstag, 31.03.2022 04:50-06:00</span>
                                    <span className="my-1"></span>
                                    <span className="font-bold text-lg">Mathe lernen</span>
                                    <button className="absolute top-2 right-5"><MoreVert /></button>
                                </div>
                            })
                            }

                        </div>
                    }
                })
                : null}

        </div>
    );
};

export default Upcommingevents;
