import { add } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';
import useTerminStore from '../store/useTerminStore';
import useStore from '../store/useWeekNamesStore';

export interface IMonthCalendarComponentProps {
    weekChunks?: Date[][],
    currentMonth?: number,
    createEvent: (date: Date) => void
}

const MonthCalendar: React.FunctionComponent<IMonthCalendarComponentProps> = ({ weekChunks, currentMonth, createEvent }) => {


    const [show, setShow] = useState(false);
    const { localAppointments, listRef, singleRef } = useTerminStore((store) => store);
    const [idx, setIdx] = useState<number | undefined>(undefined);

    const dayNamesShort = useStore((state) => state.dayNamesShort);

    useEffect(() => {
        for (let i = 0; i < localAppointments.length; i++) {
            const element = localAppointments[i].date;
            if (element.getMonth() === currentMonth) {
                setIdx(i)
                break;
            }
        }
    }, [weekChunks])

    function scrollUpcommingEventsList(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        listRef!.current![idx!].scrollIntoView({ block: "start", behavior: "smooth" });
        // listRef.current[idx]!.scrollIntoView({ block: "start", behavior: "smooth" });;
    }

    return (
        <>
            <div className='flex flex-col justify-center'>
                <div className='grid grid-cols-7'>
                    {dayNamesShort.map((ele) => {
                        return <span className='flex justify-center text-white'>{ele}</span>
                    })}
                </div>

                <div className="sm:h-[95%]">
                    <div className='grid grid-cols-7 border-[#A1A1A1] border-2 rounded-lg mt-4 sm:h-[100%] sm:m-0'>
                        {weekChunks?.map((week: Date[], weekIndex: number) => {
                            return week.map((day: Date, dayIndex: number) => {
                                return <button onClick={() => createEvent(day)} className={`relative pb-[53%] sm:pb-[3.5em] border-[#CFCFCF]/[.3] ${weekIndex != weekChunks.length - 1 ? "border-b-[1px] sm:h-auto" : ""}  h-14 flex justify-center ${dayIndex != 6 ? "border-r-[1px] sm:h-auto" : ""}
                        }
                        `}> <span className={`
                        text-center
                        w-6 h-6 rounded-xl mt-2
                        ${currentMonth == day.getMonth() ? "text-white" : "text-[#797979]"}
                        ${new Date().getDate() === day.getDate() && new Date().getMonth() === day.getMonth() ? " bg-blue-700" : ""}
                        `}>{day.getDate()}
                                        {
                                            localAppointments[idx!].appointments.map((ele) => {
                                                return ele.date.toDateString() === day.toDateString() ?
                                                    <span onClick={(e) => scrollUpcommingEventsList(e)} className="absolute w-2 h-2 rounded-full bg-red-800
                                                top-[70%] left-[45%] transform-translate-x-[-70%] transform-translate-y-[-70%] sm:w-3 sm:h-3"></span>
                                                    : ""

                                            })
                                        }
                                    </span>  </button>
                            })
                        })}
                    </div>
                </div>
            </div>

        </>
    );
};

export default MonthCalendar;
