import { Add, ImportExport, Share, ShareRounded } from '@mui/icons-material';
import React, { useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import useRangeStore from '../store/useRangeStore';
import useVisitorStore from '../store/useVisitorStore';
import useWeekNamesStore from '../store/useWeekNamesStore';
import useWidthStore from '../store/useWidthStore';

export interface INavigationBarComponentProps {
    handleDayClick: (day: Date) => void
}

const NavigationBar: React.FunctionComponent<INavigationBarComponentProps> = ({ handleDayClick }) => {

    const { dayNamesShort, months } = useWeekNamesStore((state) => state);
    const { width: windowWidth, changeWidth } = useWidthStore((state) => state);
    const { range } = useRangeStore((store) => store);

    const { toggleVisitorModal } = useVisitorStore((store) => store);

    let resizeWindow = () => {
        changeWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", resizeWindow);
        return () => window.removeEventListener("resize", resizeWindow);
    }, [])

    return (
        <nav className='flex flex-row h-fit w-screen bg-[#423F3E] px-5 py-5 border-b-2 border-white justify-between'>
            {windowWidth <= 980 ?
                <button id="dropdownDefault" data-dropdown-toggle="dropdown" className="text-black focus:outline-none  font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center bg-white hover:bg-[#1D355C] hover:text-white focus:ring-blue-800" type="button"> {months[range?.from?.getMonth()!]}<svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></button>
                :
                <button id="dropdownDefault" data-dropdown-toggle="dropdown" className="text-black focus:outline-none  font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center bg-white hover:bg-[#1D355C] hover:text-white  focus:ring-blue-800" type="button"> {months[range?.from?.getMonth()!] + " " + range?.from?.getFullYear()} <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></button>
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
                <button onClick={() => toggleVisitorModal()} className='bg-[#4E4343] p-2 rounded text-[#F1DABF]'>
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
    );
};

export default NavigationBar;
