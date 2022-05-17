import React, { AnimationEventHandler, EventHandler, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import { useForm } from "react-hook-form";
import "./home.css";



export interface IHomePageProps { }

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = handleSubmit((data) => console.log(data));
    const [anmelden, setAnmelden] = useState(true);

    const anmeldenWidth = useRef<HTMLButtonElement>(null);
    const registerWidth = useRef<HTMLButtonElement>(null);
    const animateSpan = useRef<HTMLSpanElement>(null);
    const [aw, setAw] = useState(0);
    const [rw, setRw] = useState(0);

    useEffect(() => {
        setAw(anmeldenWidth.current?.offsetWidth!);
        setRw(registerWidth.current?.offsetHeight!);
        console.log(aw, rw)
    }, []);

    const handleRegisterClick = () => {
        setAnmelden(false);
        animateSpan.current?.classList.add("animateRight");
        const mySpan = animateSpan.current!;
        if (mySpan.classList.contains("animateLeft")) {
            mySpan.classList.remove("animateLeft")
        }

    }

    const handleAnmeldenClick = () => {
        setAnmelden(true);
        animateSpan.current?.classList.add("animateLeft");
        const mySpan = animateSpan.current!;
        if (mySpan.classList.contains("animateRight")) {
            mySpan.classList.remove("animateRight")
        }

    }

    // https://www.w3schools.com/tags/ref_eventattributes.asp
    // justify-between
    return (
        <div className='w-screen h-screen bg-stone-900 flex flex-col sm:flex-row sm:justify-center py-10 sm:px-40 px-2'>
            <div className="left mx-5 sm:flex sm:justify-center sm:flex-col sm:w-[40%]" onMouseDown={() => console.log("ich bin drinne 1")} onMouseLeave={() => { console.log("leave 1") }} onMouseEnter={() => { console.log("1") }}>
                <h5 className='font-bold text-2xl  text-neutral-200 sm:text-4xl '>Wilkommen bei MyCallendar</h5>
                <p className='font-bold  text-neutral-200 pt-5 sm:text-xl'>Hier kannst du...</p>
                <div className="pl-5 py-10">
                    <div className="point flex flex-row relative pb-5 sm:p-4">
                        <div className="rounded-full bg-brown-900 w-5 h-5 mr-8">
                        </div>
                        <div className="absolute left-1 bottom-6 sm:bottom-5 sm:left-5">
                            <CheckIcon style={{ color: "#F1DABF" }} />
                        </div>
                        <span className=' font-bold text-neutral-200'>...Termine anlegen</span>
                    </div>
                    <div className="point flex flex-row relative pb-5 sm:p-4">
                        <div className="rounded-full bg-brown-900 w-5 h-5 mr-8"></div>
                        <div className="absolute left-1 bottom-6 sm:bottom-5 sm:left-5">
                            <CheckIcon style={{ color: "#F1DABF" }} />
                        </div>
                        <span className='font-bold text-neutral-200'>...Termine anzeigen lassen</span>
                    </div>
                    <div className="point  flex flex-row relative pb-5 sm:p-4">
                        <div className="rounded-full bg-brown-900 w-5 h-5 mr-8"></div>
                        <div className="absolute left-1 bottom-6 sm:bottom-5 sm:left-5">
                            <CheckIcon style={{ color: "#F1DABF" }} />
                        </div>
                        <span className='font-bold text-neutral-200'>...Benachrichtigungen bekommen</span>
                    </div>
                    <div className="point flex flex-row relative sm:p-4">
                        <div className="rounded-full bg-brown-900 w-5 h-5 mr-8"></div>
                        <div className="absolute left-1 bottom-7 sm:bottom-5 sm:left-5">
                            <CheckIcon style={{ color: "#F1DABF" }} />
                        </div>
                        <span className='font-bold text-neutral-200'>...Termine exportieren und importieren!</span>
                    </div>
                </div>
            </div>
            <div className='flex justify-center mx-5 flex-col sm:w-[40%]' onMouseDown={() => console.log("ich bin drinne 2")} onMouseEnter={() => { console.log("2") }}>
                <div className="sign-button-group">
                    {/* border-b-2 */}
                    <button ref={anmeldenWidth} onClick={handleAnmeldenClick}
                        className={` text-white middle px-10 pb-2`}>Anmelden</button>
                    <button ref={registerWidth} onClick={handleRegisterClick} className={` text-white middle  px-10 pb-2`}>Registrieren</button>
                    <span ref={animateSpan} className={`border-t-2 w-[150px] block relative`}></span>
                </div>

                {
                    anmelden ?
                        <form className='my-5' onSubmit={onSubmit}>
                            <div className="my-2">
                                <label htmlFor="email" className="block  text-sm font-medium text-gray-300 dark:text-gray-300">Email</label>
                                <input  {...register("email", { required: true, maxLength: 20 })} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
                            </div>
                            <div className="my-2">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300 dark:text-gray-300">Passwort</label>
                                <input {...register("password")} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="flex items-start mb-6">
                                <div className="flex items-center h-5">
                                    <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" />
                                </div>
                                <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-300 dark:text-gray-300">Remember me</label>
                            </div>
                            <input type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" />
                        </form>
                        :
                        <form className='my-5' onSubmit={onSubmit}>
                            <div className="my-2">
                                <label htmlFor="email" className="block  text-sm font-medium text-gray-300 dark:text-gray-300">Email</label>
                                <input  {...register("email", { required: true, maxLength: 20 })} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
                            </div>
                            <div className="my-2">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300 dark:text-gray-300">Passwort</label>
                                <input {...register("password")} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="my-2">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300 dark:text-gray-300">Passwort wiederholen</label>
                                <input {...register("password")} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <input type="submit" className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" />
                        </form>

                }

            </div>
        </div >
    );
};

export default HomePage;


