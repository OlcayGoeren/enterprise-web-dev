
import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import { format, isValid, parse, addDays, startOfWeek, endOfWeek, add } from 'date-fns';
import FocusTrap from 'focus-trap-react';
import { DayPicker, DateRange } from 'react-day-picker';
import { usePopper } from 'react-popper';
import { useSearchParams } from 'react-router-dom';
import 'react-day-picker/dist/style.css';
import "./test.css";
import { Share, ImportExport, Add, CalendarMonth, CalendarViewWeek, ArrowForwardIos, ArrowBackIos, MoreVert, Title, TextSnippet, DateRange as DateRangeIcon, Place, Repeat, GroupAdd, Replay, Save, Close } from '@mui/icons-material';
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
    const [show, setShow] = useState(false);

    const [year, setYear] = useState<Array<string>>([]);
    const months = useStore((state) => state.months);

    // const [range, setRange] = useState<DateRange | undefined>({ from: new Date(), to: undefined });
    const { range, changeRange } = useRangeStore((store) => store);
    const [weekChunks, setWeekChunks] = useState<Date[][]>();
    // const [currentMonth, setCurrentMoth] = useState<number>();
    const { selectedMonth, changeMonth } = useRangeStore((store) => store);

    const modal = useRef<HTMLDivElement>(null)

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

    const createEvent = (date: Date) => {
        setShow(true);
    }

    const closeModal = () => {
        modal.current?.classList.toggle("comeOut")
        setTimeout(() => {
            setShow(false)
        }, 200)

    }
    return (
        <>
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
                        <MonthCalendar currentMonth={selectedMonth} weekChunks={weekChunks} createEvent={createEvent} />
                    </div>

                    <span className=" bg-[#4F4E4E] h-[1px] my-4"></span>
                    <Upcommingevents />

                </main>
            </div>

            {show ?
                <div ref={modal} className="absolute bg-[#DBDBDB] top-0 w-screen h-screen comeIn">
                    <div className="bg-[#2A4462]">
                        <div className="p-4">
                            <div className="topbar">
                                <span className='font-bold text-white text-2xl'>Termindetails</span>
                            </div>
                            <div className="flex flex-row title text-[#C1C1C1] py-4 relative">
                                <span className='pr-4 relative top-[15px]'> <Title /> </span>
                                <div className="relative z-0 w-full mt-1 group text-white">
                                    <input type="email" name="floating_email" className="text-white block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 peer" placeholder=" " required />
                                    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-200  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-400  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="p-4 flex justify-between flex-col h-[80%] ">
                        <div className="">
                            <div className="flex flex-row title text-[#141252] py-4 relative">
                                <span className='pr-4 relative top-[15px]'> <TextSnippet /> </span>
                                <div className="relative z-0 w-full mt-1 group text-white">
                                    <input type="email" name="floating_email" className="text-[#141252] block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 peer" placeholder=" " required />
                                    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-[#141252]  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-400  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">TextSnippet</label>
                                </div>
                            </div>
                            <div className="flex flex-row title text-[#141252] py-4 relative">
                                <span className='pr-4 relative top-[15px]'> <DateRangeIcon /> </span>
                                <div className="relative z-0 w-full mt-1 group text-white">
                                    <input type="email" name="floating_email" className="text-[#141252] block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 peer" placeholder=" " required />
                                    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-[#141252]  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-400  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">TextSnippet</label>
                                </div>
                            </div>
                            <div className="flex flex-row title text-[#141252] py-4 relative">
                                <span className='pr-4 relative top-[15px]'> <Place /> </span>
                                <div className="relative z-0 w-full mt-1 group text-white">
                                    <input type="email" name="floating_email" className="text-[#141252] block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 peer" placeholder=" " required />
                                    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-[#141252]  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-400  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">TextSnippet</label>
                                </div>
                            </div>
                            <div className="flex flex-row title text-[#141252] py-4 relative">
                                <span className='pr-4 relative top-[15px]'> <Replay /> </span>
                                <div className="relative z-0 w-full mt-1 group text-white">
                                    <input type="email" name="floating_email" className="text-[#141252] block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 peer" placeholder=" " required />
                                    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-[#141252]  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-400  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">TextSnippet</label>
                                </div>
                            </div>
                            <div className="flex flex-row title text-[#141252] py-4 relative">
                                <span className='pr-4 relative top-[15px]'> <GroupAdd /> </span>
                                <div className="relative z-0 w-full mt-1 group text-white">
                                    <input type="email" name="floating_email" className="text-[#141252] block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 peer" placeholder=" " required />
                                    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-[#141252]  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-400  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">TextSnippet</label>
                                </div>
                                <button className="bg-[#4E4343] text-gray-800 font-bold px-4 rounded-full relative w-8 h-8 flex justify-center items-center top-3">
                                    <Add fontSize="small" className='text-[#F1DABF]' />
                                </button>
                            </div>
                        </div>
                        <div className="group flex flex-row justify-end">
                            <button onClick={() => closeModal()} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center ">
                                <Close />
                                <span>Abbrechen</span>
                            </button>
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center ml-4">
                                <Save />
                                <span>Speichern</span>
                            </button>
                        </div>
                    </div>
                </div>
                :
                null
            }

        </>
    );
};

export default TestPage;