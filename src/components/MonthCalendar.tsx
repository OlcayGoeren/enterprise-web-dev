import React, { useState } from 'react';
import useStore from '../store/useWeekNamesStore';

export interface IMonthCalendarComponentProps {
    weekChunks?: Date[][],
    currentMonth?: number,
    createEvent: (date: Date) => void
}

const MonthCalendar: React.FunctionComponent<IMonthCalendarComponentProps> = ({ weekChunks, currentMonth, createEvent }) => {


    const [show, setShow] = useState(false);

    const dayNamesShort = useStore((state) => state.dayNamesShort);
    return (
        <>
            <div className='flex flex-col justify-center sm:h-[99%]'>
                <div className='grid grid-cols-7'>
                    {dayNamesShort.map((ele) => {
                        return <span className='flex justify-center text-white'>{ele}</span>
                    })}
                </div>

                <div className="sm:h-[95%]">
                    <div className='grid grid-cols-7 border-[#A1A1A1] border-2 rounded-lg mt-4 sm:h-[100%] sm:m-0'>
                        {weekChunks?.map((week: Date[], weekIndex: number) => {
                            return week.map((day: Date, dayIndex: number) => {
                                return <button onClick={() => createEvent(day)} className={` border-[#CFCFCF]/[.3] ${weekIndex != weekChunks.length - 1 ? "border-b-[1px] sm:h-auto" : ""}  h-14 flex justify-center ${dayIndex != 6 ? "border-r-[1px] sm:h-auto" : ""}
                        }
                        `}> <span className={`
                        text-center
                        w-6 h-6 rounded-xl mt-2
                        ${currentMonth == day.getMonth() ? "text-white" : "text-[#797979]"}
                        ${new Date().getDate() == day.getDate() && new Date().getMonth() == day.getMonth() ? " bg-blue-700" : ""}
                        `}>{day.getDate()} </span>  </button>
                            })
                        })}
                    </div>
                </div>
            </div>

        </>
    );
};

export default MonthCalendar;
