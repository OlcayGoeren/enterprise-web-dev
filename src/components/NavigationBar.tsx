import { Add, ImportExport, Share, ShareRounded } from '@mui/icons-material';
import React, { useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import useAppointmentModal from '../store/useAppointmentModal';
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
    const { setShow } = useAppointmentModal((state) => state);
    const { visitor } = useVisitorStore((store) => store);

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
            <div>
                {windowWidth <= 980 ?
                    <div className="dropdown">
                        <label tabIndex={0} className="btn m-1">
                            {months[range?.from?.getMonth()!] + " " + range?.from?.getFullYear()}
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </label>
                        <div tabIndex={0} className="dropdown-content menu p-2 shadow rounded-box bg-base-100">
                            <DayPicker
                                className='bg-base-100'
                                mode="single"
                                onDayClick={handleDayClick}
                                weekStartsOn={1}
                            />
                        </div>
                    </div>
                    :
                    <div className="dropdown">
                        <label tabIndex={0} className="btn m-1">
                            {months[range?.from?.getMonth()!]}
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </label>
                        <div tabIndex={0} className="dropdown-content menu p-2 shadow rounded-box bg-base-100">
                            <DayPicker
                                className='bg-base-100'
                                mode="single"
                                onDayClick={handleDayClick}
                                weekStartsOn={1}
                            />
                        </div>
                    </div>
                }

                {visitor ?
                    null
                    :
                    <button disabled={visitor} onClick={() => toggleVisitorModal()} className="btn bg-[#4E4343]  text-[#F1DABF] border-none ml-4">
                        <Share style={{ color: "#F1DABF" }} /> {windowWidth <= 980 ? "" : "TERMIN FREIGEBEN"}
                    </button>

                }

            </div>

            <button onClick={() => setShow(true)} className='bg-[#2A4462] btn text-white border-none'>
                <Add style={{ color: "#F1DABF" }} /> {windowWidth <= 980 ? "" : "TERMIN HINZUFÜGEN"}
            </button>
        </nav>
    );
};

export default NavigationBar;
