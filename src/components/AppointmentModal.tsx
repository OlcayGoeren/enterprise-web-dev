
import React, { useEffect, useRef, useState } from 'react';
import { Title, TextSnippet, DateRange as DateRangeIcon, Place, GroupAdd, Replay, Save, Close, Add, ImportExport, Send, EventBusy, Delete } from '@mui/icons-material';
import "./appointmentmodal.css"
import useAppointmentModal from '../store/useAppointmentModal';
import useTerminStore, { Intervall } from '../store/useTerminStore';
import useAuthStore from '../store/useAuthStore';
import { getMinutes } from 'date-fns';
import axios from 'axios';
import fileDownload from "js-file-download";



export interface ITestPageProps {
    dateProp: Date | undefined;
}

const AppointmentModal: React.FunctionComponent<ITestPageProps> = ({ dateProp }) => {

    const { show, setShow, showButtons, selectedTermin, setSelectedTermin, numOne, numTwo } = useAppointmentModal((state) => state)

    const [emailList, setEmailList] = useState<string[]>([]);
    const [email, setEmail] = useState<string>("");
    const [title, setTitle] = useState<string>("Titel");
    const [details, setDetails] = useState<string>("Details");
    const [date, setDate] = useState<string>(dateProp !== undefined ? dateProp.toLocaleDateString() : "");
    const [von, setVon] = useState<string>("");
    const [bis, setBis] = useState<string>("");
    const [ort, setOrt] = useState<string>("BLN");
    const [intervall, setIntervall] = useState<string>("");

    const { postAppointments, remove, putAppointment } = useTerminStore((state) => state);
    const { token } = useAuthStore((state) => state);

    useEffect(() => {
        if (selectedTermin) {
            console.log(selectedTermin);
            setTitle(selectedTermin.title);
            setDetails(selectedTermin.details)
            setDate(selectedTermin.date.toLocaleDateString())
            setOrt(selectedTermin.ort)
            setEmailList(selectedTermin.emailList);
            setVon(('0' + selectedTermin.von.getHours()).slice(-2) + ":" + ('0' + selectedTermin.von.getMinutes()).slice(-2))
            setBis(('0' + selectedTermin.bis.getHours()).slice(-2) + ":" + ('0' + selectedTermin.bis.getMinutes()).slice(-2))
        }
    }, [selectedTermin])


    const modal = useRef<HTMLDivElement>(null)

    const closeModal = () => {
        modal.current?.classList.toggle("comeOut")
        setTimeout(() => {
            setShow(false)
            setSelectedTermin(undefined);
        }, 200)
    }

    function removeEmail(idx: number): void {
        let clone = emailList
        clone.splice(idx, 1);
        setEmailList([...clone]);
    }

    function addEmail(): void {
        if (email.length > 0) {
            setEmailList((old) => [...emailList, email])
            setEmail("");
        }
    }

    function submit() {
        let splitted = date.split(".")
        if (!selectedTermin) {
            let vonDate = new Date(parseInt(splitted[2]), parseInt(splitted[1]) - 1, parseInt(splitted[0]));
            let vonSplit = von.split(":");
            vonDate.setHours(parseInt(vonSplit[0]), parseInt(vonSplit[1]));

            let bisDate = new Date(parseInt(splitted[2]), parseInt(splitted[1]) - 1, parseInt(splitted[0]));
            let bisSplit = bis.split(":");
            bisDate.setHours(parseInt(bisSplit[0]), parseInt(bisSplit[1]));

            postAppointments({
                date: new Date(parseInt(splitted[2]), parseInt(splitted[1]) - 1, parseInt(splitted[0])),
                details,
                emailList,
                title,
                ort,
                intervall: Intervall.MONTHLY,
                von: von.length === 0 ? new Date(parseInt(splitted[2]), parseInt(splitted[1]) - 1, parseInt(splitted[0])) : vonDate,
                bis: bis.length === 0 ? new Date(parseInt(splitted[2]), parseInt(splitted[1]) - 1, parseInt(splitted[0])) : bisDate,
            }, token);
        } else {
            let vonDate = new Date(parseInt(splitted[2]), parseInt(splitted[1]) - 1, parseInt(splitted[0]));
            let vonSplit = von.split(":");
            vonDate.setHours(parseInt(vonSplit[0]), parseInt(vonSplit[1]));

            let bisDate = new Date(parseInt(splitted[2]), parseInt(splitted[1]) - 1, parseInt(splitted[0]));
            let bisSplit = bis.split(":");
            bisDate.setHours(parseInt(bisSplit[0]), parseInt(bisSplit[1]));

            putAppointment(
                {
                    date: new Date(parseInt(splitted[2]), parseInt(splitted[1]) - 1, parseInt(splitted[0])),
                    details,
                    emailList,
                    title,
                    ort,
                    intervall: Intervall.MONTHLY,
                    id: selectedTermin.id,
                    von: vonDate,
                    bis: bisDate,
                }, token);
        }


        modal.current?.classList.toggle("comeOut")
        setTimeout(() => {
            setShow(false)
            setSelectedTermin(undefined);
        }, 200)
    }

    function deleteMe() {
        if (window.confirm("Are you sure?")) {
            remove(numOne, numTwo, token);
            setSelectedTermin(undefined);
            closeModal();
        }
    }

    async function exportMe() {
        try {
            const { data } = await axios.post(process.env.REACT_APP_DOWNLOAD!,
                {
                    selectedTermin
                })
            fileDownload(data, "termin.ics")
        } catch (error) {
            console.log(error);
        }

    }



    return (
        <div ref={modal} className="absolute bg-[#DBDBDB] top-0 w-screen h-screen comeIn">

            <div className="bg-[#2A4462] p-4">
                <div className="">
                    <div className="topbar">
                        <span className='font-bold text-white text-2xl'>Termindetails</span>
                    </div>
                    <div className="flex flex-row title text-[#C1C1C1] py-4 relative">
                        <span className='pr-4 relative top-[15px]'> <Title /> </span>
                        <div className="relative z-0 w-full mt-1 group text-white">
                            <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" name="floating_email" className="text-white block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 peer" placeholder=" " required />
                            <label htmlFor="floating_email" className=" peer-focus:font-medium absolute text-sm text-gray-200  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-400  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Titel</label>
                        </div>
                    </div>
                </div>
                {showButtons ?
                    <div className="flex flex-row mx-2 overflow-x-auto">
                        <button onClick={() => exportMe()} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  text-center inline-flex items-center py-2 px-3 mr-3">
                            <ImportExport />
                            <span> Exportieren</span>
                        </button>
                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center inline-flex items-center mr-2 py-2 px-3  ">
                            <Send />
                            <span className='w-max'>E-Mail senden</span>
                        </button>
                        <button onClick={(ele) => deleteMe()} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-center inline-flex items-center mr-2  py-2 px-3">
                            <EventBusy />
                            <span className='w-max'>Termin Absagen</span>
                        </button>
                    </div> : null
                }
            </div>
            <div className={`p-4 flex justify-between flex-col ${showButtons ? "h-[75vh]" : "h-[82vh]"}`}>
                <div className="">
                    <div className="flex flex-row title text-[#141252] py-4 relative">
                        <span className='pr-4 relative top-[15px]'> <TextSnippet /> </span>
                        <div className="relative z-0 w-full mt-1 group text-white">
                            <input onChange={(e) => setDetails(e.target.value)} value={details} type="text" name="floating_email" className="text-[#141252] block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 peer" required />
                            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-[#141252]  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-400  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details</label>
                        </div>
                    </div>
                    <div className="flex flex-row title text-[#141252] py-4 relative">
                        <span className='pr-4 relative top-[15px]'> <DateRangeIcon /> </span>
                        <div className="relative z-0 w-[30%] mt-1 group text-white mr-2">
                            <input onChange={(e) => setDate(e.target.value)} value={date} type="text" name="floating_email" className="text-[#141252] block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 peer" placeholder="" required />
                            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-[#141252]  duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-400  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Datum dd.mm.yyyy</label>
                        </div>
                        <div className="relative z-0 w-[25%] mt-1 group text-white mr-2">
                            <input onChange={(e) => setVon(e.target.value)} value={von} type="text" name="floating_email" className="text-[#141252] block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 peer" placeholder=" " required />
                            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-[#141252]  duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-400  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">von hh.mm</label>
                        </div>
                        <div className="relative z-0 w-[25%] mt-1 group text-white">
                            <input onChange={(e) => setBis(e.target.value)} value={bis} type="text" name="floating_email" className="text-[#141252] block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 peer" placeholder=" " required />
                            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-[#141252]  duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-400  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">bis hh.mm</label>
                        </div>

                    </div>

                    <div className="flex flex-row title text-[#141252] py-4 relative">
                        <span className='pr-4 relative top-[15px]'> <Place /> </span>
                        <div className="relative z-0 w-full mt-1 group text-white">
                            <input onChange={(e) => setOrt(e.target.value)} value={ort} type="text" name="floating_email" className="text-[#141252] block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 peer" placeholder=" " required />
                            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-[#141252]  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-400  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Ort</label>
                        </div>
                    </div>
                    <div className="flex flex-row title text-[#141252] py-4 relative">
                        <span className='pr-4 relative top-[15px]'> <Replay /> </span>
                        <div className="relative z-0 w-full mt-1 group text-white">
                            <select onChange={(e) => setIntervall(e.target.value)} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-800 focus:border-blue-500 block w-full p-2.5">
                                <option value="no" >Wähle Wiederholungsintervall...</option>
                                <option value="daily">täglich</option>
                                <option value="weekly">wöchentlich</option>
                                <option value="monthly">monatlich</option>
                            </select>
                        </div>
                    </div>
                    <div className="erweitert">
                        <div className="flex flex-row title text-[#141252] py-4 relative">
                            <span className='pr-4 relative top-[15px]'> <GroupAdd /> </span>
                            <div className="relative z-0 w-full mt-1 group text-white">
                                <input onChange={(e) => setEmail(e.target.value)} type="email" name="floating_email" className="text-[#141252] block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 peer" placeholder=" " required value={email} />
                                <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-[#141252]  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-400  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Emails...</label>
                            </div>
                            <button onClick={() => addEmail()} className="bg-[#4E4343] text-gray-800 font-bold px-4 rounded-full relative w-8 h-8 flex justify-center items-center top-3">
                                <Add fontSize="small" className='text-[#F1DABF]' />
                            </button>
                        </div>

                        <ul className=" text-sm font-medium text-gray-900 border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            {emailList.map((ele, idx) => {
                                return <li key={idx} className="w-full px-4 py-2   rounded-t-lg border-gray-600 flex justify-between">{ele} <button onClick={() => removeEmail(idx)} className='text-red-900'><Delete /></button> </li>
                            })}

                        </ul>
                    </div>
                </div>
                <div className="group flex flex-row justify-end">
                    <button onClick={() => closeModal()} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center ">
                        <Close />
                        <span>Abbrechen</span>
                    </button>
                    <button onClick={() => submit()} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center ml-4">
                        <Save />
                        <span>Speichern</span>
                    </button>
                </div>
            </div>
        </div >
    );
};

export default AppointmentModal;