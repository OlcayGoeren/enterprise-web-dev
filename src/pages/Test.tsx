
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


export interface ITestPageProps { }

// https://flowbite.com/docs/plugins/datepicker/
const TestPage: React.FunctionComponent<ITestPageProps> = (props) => {

    const [monthView, setMonthView] = useState(true);

    const [year, setYear] = useState<Array<string>>([]);
    const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
    const dayNamesShort = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
    const dayNamesLong = ["Montag", "Dienstag", "Mitwoch", "Donnerstag", "Freitag", "Samstag", "Sontag"];

    const [range, setRange] = useState<DateRange | undefined>({ from: new Date(), to: undefined });
    const [weekChunks, setWeekChunks] = useState<Date[][]>();
    const [currentMonth, setCurrentMoth] = useState<number>();
    const [currentDay, setCurrentDay] = useState<number>();

    const [windowWidth, setWindowWidth] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);
    let resizeWindow = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    };

    useEffect(() => {
        // const range = (start: number, stop: number, step: number) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));
        // const numbers = range(1990, 2022, 1).map((ele: number) => { return ele + "" });
        // setYear(numbers);
        window.addEventListener("resize", resizeWindow);
        setCurrentDay(new Date().getDate());
        return () => window.removeEventListener("resize", resizeWindow);
    }, []);

    useEffect(() => {
        setCurrentMoth(range?.from!.getMonth());
        const start = getStartMonth(range?.from!)
        const end = getEndMonth(range?.from!)
        setWeekChunks(getDatesAndChunkBetween(start, end));
        console.log(weekChunks)
    }, [range]);



    const handleDayClick = (day: Date) => {
        setCurrentMoth(day.getMonth());
        setRange(() => {
            return {
                from: isMonday(day) ? day : previousMonday(day),
                to: isSunday(day) ? day : nextSunday(day)
            }
        })
        // document.querySelector("body")?.click();
    }

    const switchView = (view: string) => {
        if (view === "m") setMonthView(true)
        else setMonthView(false)
    }

    const monthNavigation = (forward: boolean) => {
        if (forward) setRange({ from: nextMonth(range?.from!) });
        else setRange({ from: backMonth(range?.from!) });
    }

    const jumpToToday = () => {
        setRange({ from: new Date() });
    }

    return (
        // py - 10 sm: px - 40
        <div className="w-screen h-screen bg-[#2B2B2B] flex flex-col">

            <nav className='flex flex-row h-fit w-screen bg-[#423F3E] px-5 py-5 border-b-2 border-white justify-between'>
                {windowWidth <= 980 ?
                    <button id="dropdownDefault" data-dropdown-toggle="dropdown" className="text-black focus:outline-none  font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center bg-white hover:bg-[#1D355C] hover:text-white focus:ring-blue-800" type="button"> {months[range?.from?.getMonth()!]}<svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
                    :
                    <button id="dropdownDefault" data-dropdown-toggle="dropdown" className="text-black focus:outline-none  font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center bg-white hover:bg-[#1D355C] hover:text-white  focus:ring-blue-800" type="button"> {months[range?.from?.getMonth()!] + " " + range?.from?.getFullYear()} <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
                }


                <div id="dropdown" className="z-10 hidden divide-y divide-gray-100 rounded shadow w-fit bg-white" style={{ position: "absolute", inset: " 0px auto auto 0px", margin: "0px", transform: "translate(903px, 681px)" }} data-popper-placement="bottom">
                    <DayPicker
                        mode="range"
                        selected={range}
                        onDayClick={handleDayClick}
                        captionLayout="dropdown"
                        fromYear={1997}
                        toYear={new Date().getFullYear()}
                        weekStartsOn={1}
                    />
                </div>
                <div className=" flex mr-28 space-x-4 ml-4 sm:absolute sm:left-[200px] ">
                    <button className='bg-[#4E4343] p-2 rounded text-[#F1DABF]'>
                        <Share style={{ color: "#F1DABF" }} /> {windowWidth <= 980 ? "" : "TERMIN IMPORTIEREN"}
                    </button>
                    <button className='bg-[#4E4343] p-2 rounded text-[#F1DABF]'>
                        <ImportExport style={{ color: "#F1DABF" }} /> {windowWidth <= 980 ? "" : "FREIGEBEN"}
                    </button>
                </div>

                <button className='bg-[#2A4462]  p-2 rounded text-white'>
                    <Add style={{ color: "#F1DABF" }} /> {windowWidth <= 980 ? "" : "TERMIN HINZUFÜGEN"}
                </button>

            </nav>
            <main className='p-2 flex flex-col'>
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
                <MonthCalendar currentMonth={currentMonth} dayNamesShort={dayNamesShort} weekChunks={weekChunks} />

                <span className=" bg-[#4F4E4E] h-[1px] my-4"></span>
                <Upcommingevents />
            </main>
        </div>
    );
};

export default TestPage;