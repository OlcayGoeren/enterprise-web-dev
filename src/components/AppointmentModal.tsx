
import React, { useRef } from 'react';
import { Title, TextSnippet, DateRange as DateRangeIcon, Place, GroupAdd, Replay, Save, Close, Add } from '@mui/icons-material';
import "./appointmentmodal.css"
import useAppointmentModal from '../store/useAppointmentModal';



export interface ITestPageProps { }

const AppointmentModal: React.FunctionComponent<ITestPageProps> = (props) => {

    const { show, setShow } = useAppointmentModal((state) => state)

    const modal = useRef<HTMLDivElement>(null)

    const closeModal = () => {
        modal.current?.classList.toggle("comeOut")
        setTimeout(() => {
            setShow(false)
        }, 200)
    }
    return (
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
    );
};

export default AppointmentModal;