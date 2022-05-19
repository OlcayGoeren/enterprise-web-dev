
import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import { format, isValid, parse, addDays, startOfWeek, endOfWeek, add } from 'date-fns';
import FocusTrap from 'focus-trap-react';
import { DayPicker, DateRange } from 'react-day-picker';
import { usePopper } from 'react-popper';
import { useSearchParams } from 'react-router-dom';
import 'react-day-picker/dist/style.css';
import "./test.css";
import { Share, ImportExport, Add, CalendarMonth, CalendarViewWeek, ArrowForwardIos, ArrowBackIos, MoreVert } from '@mui/icons-material';
import { getStartMonth, getDatesAndChunkBetween, getEndMonth, nextMonth, backMonth } from '../helper/test';
import { isMonday, isSunday, nextSunday, previousMonday, previousSunday, startOfMonth } from 'date-fns/esm';
import MonthCalendar from '../components/MonthCalendar';
import Upcommingevents from '../components/Upcommingevents';
import useStore from '../store/useWeekNamesStore';
import NavigationBar from '../components/NavigationBar';
import useRangeStore from '../store/useRangeStore';



export interface ITestPageProps { }

// https://flowbite.com/docs/plugins/datepicker/
const TestPage: React.FunctionComponent<ITestPageProps> = (props) => {

    const [monthView, setMonthView] = useState(true);

    const [year, setYear] = useState<Array<string>>([]);
    const months = useStore((state) => state.months);

    // const [range, setRange] = useState<DateRange | undefined>({ from: new Date(), to: undefined });
    const { range, changeRange } = useRangeStore((store) => store);
    const [weekChunks, setWeekChunks] = useState<Date[][]>();
    // const [currentMonth, setCurrentMoth] = useState<number>();
    const { selectedMonth, changeMonth } = useRangeStore((store) => store);

    // const [windowWidth, setWindowWidth] = useState(0);
    // const [windowHeight, setWindowHeight] = useState(0);
    // let resizeWindow = () => {
    //     setWindowWidth(window.innerWidth);
    //     setWindowHeight(window.innerHeight);
    // };

    // useEffect(() => {
    //     // const range = (start: number, stop: number, step: number) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));
    //     // const numbers = range(1990, 2022, 1).map((ele: number) => { return ele + "" });
    //     // setYear(numbers);
    //     window.addEventListener("resize", resizeWindow);
    //     return () => window.removeEventListener("resize", resizeWindow);
    // }, []);


    useEffect(() => {
        changeMonth(range?.from!.getMonth()!);
        const start = getStartMonth(range?.from!)
        const end = getEndMonth(range?.from!)
        setWeekChunks(getDatesAndChunkBetween(start, end));
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

    return (
        // py - 10 sm: px - 40
        <div className="w-screen h-screen bg-[#2B2B2B] flex flex-col">
            <NavigationBar handleDayClick={handleDayClick} />
            <main className='p-2 flex flex-col sm:flex-row-reverse sm:justify-end'>
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
                    <MonthCalendar currentMonth={selectedMonth} weekChunks={weekChunks} />
                </div>

                <span className=" bg-[#4F4E4E] h-[1px] my-4"></span>
                <Upcommingevents />
            </main>
        </div>
    );
};

export default TestPage;