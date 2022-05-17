import React from 'react';

export interface IMonthCalendarComponentProps {
    dayNamesShort: string[],
    weekChunks?: Date[][],
    currentMonth?: number
}

const MonthCalendar: React.FunctionComponent<IMonthCalendarComponentProps> = ({ dayNamesShort, weekChunks, currentMonth }) => {
    return (
        <div>
            <div className=' grid grid-cols-7'>
                {dayNamesShort.map((ele) => {
                    return <span className='flex justify-center text-white'>{ele}</span>
                })}
            </div>

            <div className='grid grid-cols-7 border-[#A1A1A1] border-2 rounded-lg mt-4'>
                {weekChunks?.map((week: Date[], weekIndex: number) => {
                    return week.map((day: Date, dayIndex: number) => {
                        return <div className={` border-[#CFCFCF] ${weekIndex != weekChunks.length - 1 ? "border-b-[1px]" : ""}  h-14 flex justify-center ${dayIndex != 6 ? "border-r-[1px]" : ""}
                        }
                        `}> <span className={`
                        text-center
                        w-6 h-6 rounded-xl
                        ${currentMonth == day.getMonth() ? "text-white" : "text-[#797979]"}
                        ${new Date().getDate() == day.getDate() && new Date().getMonth() == day.getMonth() ? " bg-blue-700" : ""}
                        `}>{day.getDate()} </span>  </div>
                    })
                })}
            </div>

        </div>
    );
};

export default MonthCalendar;
