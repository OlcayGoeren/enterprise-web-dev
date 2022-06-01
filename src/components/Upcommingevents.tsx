import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useRef, useState } from 'react';
import useTerminStore, { IAppointmentOrdererd } from '../store/useTerminStore';
import ReactTooltip from 'react-tooltip';
import "./upcommingevents.css";
import { add } from 'date-fns';
import { ArrowRight, ArrowRightAlt } from '@mui/icons-material';
import useAppointmentModal from '../store/useAppointmentModal';


export interface IUpcommingeventsComponentProps {

}


const Upcommingevents: React.FunctionComponent<IUpcommingeventsComponentProps> = () => {

    const [showAlt, setShowAlt] = useState(true);
    const { localAppointments, localDelete, setListRef, setSingleRef, listRef } = useTerminStore((store) => store);
    const refs = useRef<HTMLDivElement[]>([]);
    const ref = useRef<HTMLDivElement>(null);
    const { setShow, show, setSelectedTermin } = useAppointmentModal((state) => state);


    function deleteMe(numOne: number, numTwo: number) {
        localDelete(numOne, numTwo);
    }

    function putRefs(ele: HTMLDivElement | null, i: number, list: IAppointmentOrdererd) {
        if (ele != null) {
            refs.current[i] = ele;
        }
    }

    useEffect(() => {
        // @ts-ignore
        setListRef(refs);
        console.log(listRef)
        console.log(ref)
    }, [refs])

    useEffect(() => {
        // @ts-ignore
        setSingleRef(ref);
    }, [ref])

    function openModal(i: number, j: number) {
        setSelectedTermin(localAppointments[i].appointments[j])
    }

    // useEffect(() => {
    //     console.log(refs);
    //     const ele = refs.current[2];
    //     var topPos = ele.offsetTop;
    //     // setTimeout(() => {
    //     //     ele.scrollIntoView({ block: "start", behavior: "smooth" });
    //     // }, 1000)

    // }, [refs])


    return (
        <div ref={ref} className="overflow-scroll sm:w-[25%]">
            <h1 className='text-white font-bold mb-2'>Es stehen xx Termine bevor</h1>
            {showAlt ?
                localAppointments.map((lists, numOne) => {
                    if (lists.appointments.length > 0) {
                        return <div ref={el => putRefs(el, numOne, lists)} className="flex flex-col">
                            <span className='text-[#858383] font-bold px-4 py-2'>{lists.date.getDate() + "." + add(lists.date, { months: 1 }).getMonth() + "." + lists.date.getFullYear()}</span>
                            {lists.appointments.map((ele, numTwo) => {
                                return <div className="card flex mb-2 flex-col bg-[#1D355C] text-[#CFCFCF] p-4 pr-5 rounded-xl shadow-md">
                                    <span className="text-[12px]">{ele.date.getHours() + ":" + ele.date.getMinutes() + " | " + ele.title}</span>
                                    <span className="my-1"></span>
                                    <div className="flex flex-row justify-center align-middle">
                                        <span className="font-bold text-lg">{ele.details}</span>
                                        {/* deleteMe(numOne, numTwo) */}
                                        <span onClick={() => openModal(numOne, numTwo)} className='text-red-900 text-2xl'> <ArrowRightAlt /></span>
                                    </div>
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
