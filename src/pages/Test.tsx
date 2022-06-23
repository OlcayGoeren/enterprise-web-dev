
import React, { useEffect, useRef, useState } from 'react';
import 'react-day-picker/dist/style.css';
import "./test.css";
import { CalendarMonth, CalendarViewWeek, ArrowForwardIos, ArrowBackIos } from '@mui/icons-material';
import { getStartMonth, getDatesAndChunkBetween, getEndMonth, nextMonth, backMonth } from '../helper/test';
import { isMonday, isSunday, nextSunday, previousMonday } from 'date-fns/esm';
import MonthCalendar from '../components/MonthCalendar';
import Upcommingevents from '../components/Upcommingevents';
import useStore from '../store/useWeekNamesStore';
import NavigationBar from '../components/NavigationBar';
import useRangeStore from '../store/useRangeStore';
import AppointmentModal from '../components/AppointmentModal';
import useAppointmentModal from '../store/useAppointmentModal';
import useTerminStore from '../store/useTerminStore';
import useAuthStore from '../store/useAuthStore';
import ShareModal from '../components/ShareModal';
import useVisitorStore from '../store/useVisitorStore';



export interface ITestPageProps { }

const TestPage: React.FunctionComponent<ITestPageProps> = (props) => {

    const [monthView, setMonthView] = useState(true);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const { setShow, show } = useAppointmentModal((state) => state);
    const [year, setYear] = useState<Array<string>>([]);
    const months = useStore((state) => state.months);
    const { range, changeRange } = useRangeStore((store) => store);
    const [weekChunks, setWeekChunks] = useState<Date[][]>();
    const { selectedMonth, changeMonth } = useRangeStore((store) => store);
    const { token } = useAuthStore((store) => store);
    const { getAppointments, appointments } = useTerminStore((store) => store);
    const { showVisitorModal } = useVisitorStore(store => store);

    useEffect(() => {
        changeMonth(range?.from!.getMonth()!);
        const start = getStartMonth(range?.from!)
        const end = getEndMonth(range?.from!)
        setWeekChunks(getDatesAndChunkBetween(start, end));
        (async function anyNameFunction() {
            await getAppointments(token);
        })();
    }, [range]);


    const handleDayClick = (day: Date) => {
        changeMonth(day.getMonth());
        changeRange({
            from: isMonday(day) ? day : previousMonday(day),
            to: isSunday(day) ? day : nextSunday(day)
        });
    }

    const switchView = (view: string) => {
        if (view === "m") setMonthView(true)
        else setMonthView(false)
    }

    const monthNavigation = (forward: boolean) => {
        if (forward) changeRange({ from: nextMonth(range?.from!) });
        else changeRange({ from: backMonth(range?.from!) });
    }

    const jumpToToday = () => {
        changeRange({ from: new Date() });
    }

    const createEvent = (date: Date) => {
        setSelectedDate(date);
        setShow(true);
    }

    return (
        <>
            <div className={`w-screen h-screen bg-[#2B2B2B] flex flex-col ${showVisitorModal ? "custom" : ""}`}>
                <NavigationBar handleDayClick={handleDayClick} />
                <main className='p-2 flex flex-col sm:flex-row-reverse sm:justify-end h-[89%] '>
                    <div className='sm:w-[100%] sm:p-4'>
                        <div className="multibuttons my-2 flex flex-row">
                            <div className="">
                                <button onClick={() => switchView("m")} className={`${monthView ? "bg-[#391587]" : "bg-[#423F3E]"}  text-[#F1DABF] px-3 py-2 rounded-l-xl`}>
                                    <CalendarMonth fontSize="small" />
                                </button>
                                <button onClick={() => switchView("w")} className={`${monthView ? "bg-[#423F3E]" : "bg-[#391587]"} text-[#F1DABF] px-3 py-2 rounded-r-xl`}>
                                    <CalendarViewWeek fontSize="small" />
                                </button>
                            </div>

                            <div className="ml-4">
                                <button onClick={() => monthNavigation(false)} className={`text-[#F1DABF] px-3 py-2 rounded-l-xl`}>
                                    <ArrowBackIos fontSize="small" />
                                </button>
                                <button onClick={() => monthNavigation(true)} className={`text-[#F1DABF] px-3 py-2 rounded-r-xl`}>
                                    <ArrowForwardIos fontSize="small" />
                                </button>
                                <button onClick={() => jumpToToday()} className={`text-[#F1DABF] px-3 py-2 rounded-r-xl`}>
                                    Aktuell
                                </button>
                            </div>

                        </div>
                        <MonthCalendar currentMonth={selectedMonth} weekChunks={weekChunks} createEvent={createEvent} />
                    </div>

                    <span className=" bg-[#4F4E4E] h-[1px] my-4"></span>
                    <Upcommingevents />

                </main>
            </div>

            {show ?
                <AppointmentModal dateProp={selectedDate} />
                :
                null
            }
            {showVisitorModal ?
                <ShareModal />
                :
                null
            }
        </>
    );
};

export default TestPage;