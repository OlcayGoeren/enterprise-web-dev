import React, { AnimationEventHandler, EventHandler, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import { useForm } from 'react-hook-form';
import './home.css';
import ErrorDiv from '../components/ErrorDiv';
import axios from 'axios';
import useAuthStore from '../store/useAuthStore';

export interface IHomePageProps { }

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();
    const [anmelden, setAnmelden] = useState(true);
    let navigate = useNavigate();
    const errorDiv = useRef<HTMLDivElement>(null);

    const anmeldenWidth = useRef<HTMLButtonElement>(null);
    const registerWidth = useRef<HTMLButtonElement>(null);
    const animateSpan = useRef<HTMLSpanElement>(null);
    const [aw, setAw] = useState(0);
    const [rw, setRw] = useState(0);
    const [showError, setError] = useState(false);
    const [showTipm, setShowTip] = useState(false);

    const [errorText, setErrorText] = useState<String>('Email oder Passwort sind falsch! Bitte versuche es erneut.');
    const [tipText, setTipText] = useState<String>('Wir haben dir einen Verifizierungslink geschickt.');

    const { changeIsSignIn, setToken } = useAuthStore((state) => state);

    useEffect(() => {
        setAw(anmeldenWidth.current?.offsetWidth!);
        setRw(registerWidth.current?.offsetHeight!);
    }, []);

    const handleRegisterClick = () => {
        setAnmelden(false);
        animateSpan.current?.classList.add('animateRight');
        const mySpan = animateSpan.current!;
        if (mySpan.classList.contains('animateLeft')) {
            mySpan.classList.remove('animateLeft');
        }
    };

    const handleAnmeldenClick = () => {
        setAnmelden(true);
        animateSpan.current?.classList.add('animateLeft');
        const mySpan = animateSpan.current!;
        if (mySpan.classList.contains('animateRight')) {
            mySpan.classList.remove('animateRight');
        }
    };

    const handleAnmelden = handleSubmit((data) => {
        const { email, password } = data;
        axios
            .post(process.env.REACT_APP_LOGIN!, null, { headers: { Authorization: 'Basic ' + window.btoa(email + ':' + password) } })
            .then((resp) => {
                const data = resp.data['jwt-token'];
                setToken(data);
                changeIsSignIn(true);
                navigate('/test', { replace: true });
            })
            .catch((err) => {
                console.log(err);
                console.log(process.env.REACT_APP_LOGIN!);
                console.log(process.env);
                setErrorText(err.response.data.message)
                setError(true);
            });
    });

    const handleRegistrieren = handleSubmit((data) => {
        const { email, password, passwordWdh } = data;
        if (password !== passwordWdh) {
            setError(true);
        } else {
            axios
                .post(process.env.REACT_APP_REGISTER!, { email, password }, {})
                .then((resp) => {
                    setShowTip(true);
                })
                .catch((err) => {
                    console.log(err);
                    setErrorText(err.response.data.message)
                    setError(true);
                });
        }
    });

    useEffect(() => {
        let timer1 = setTimeout(() => setError(false), 3000);

        return () => clearTimeout(timer1);
    }, [showError]);

    return (
        <div className="w-screen h-screen bg-stone-900 flex flex-col sm:flex-row sm:justify-center py-10 sm:px-40 px-2">
            <div className="left mx-5 sm:flex sm:justify-center sm:flex-col sm:w-[40%]">
                <h5 className="font-bold text-2xl  text-neutral-200 sm:text-4xl ">Wilkommen bei MyCallendar</h5>
                <p className="font-bold  text-neutral-200 pt-5 sm:text-xl">Hier kannst du...</p>
                <div className="pl-5 py-10">
                    <div className="point flex flex-row relative pb-5 sm:p-4">
                        <div className="rounded-full bg-brown-900 w-5 h-5 mr-8"></div>
                        <div className="absolute left-1 bottom-6 sm:bottom-5 sm:left-5">
                            <CheckIcon style={{ color: '#F1DABF' }} />
                        </div>
                        <span className=" font-bold text-neutral-200">...Termine anlegen</span>
                    </div>
                    <div className="point flex flex-row relative pb-5 sm:p-4">
                        <div className="rounded-full bg-brown-900 w-5 h-5 mr-8"></div>
                        <div className="absolute left-1 bottom-6 sm:bottom-5 sm:left-5">
                            <CheckIcon style={{ color: '#F1DABF' }} />
                        </div>
                        <span className="font-bold text-neutral-200">...Termine anzeigen lassen</span>
                    </div>
                    <div className="point  flex flex-row relative pb-5 sm:p-4">
                        <div className="rounded-full bg-brown-900 w-5 h-5 mr-8"></div>
                        <div className="absolute left-1 bottom-6 sm:bottom-5 sm:left-5">
                            <CheckIcon style={{ color: '#F1DABF' }} />
                        </div>
                        <span className="font-bold text-neutral-200">...Benachrichtigungen bekommen</span>
                    </div>
                    <div className="point flex flex-row relative sm:p-4">
                        <div className="rounded-full bg-brown-900 w-5 h-5 mr-8"></div>
                        <div className="absolute left-1 bottom-7 sm:bottom-5 sm:left-5">
                            <CheckIcon style={{ color: '#F1DABF' }} />
                        </div>
                        <span className="font-bold text-neutral-200">...Termine exportieren und importieren!</span>
                    </div>
                </div>
            </div>
            <div ref={errorDiv} className="flex justify-center mx-5 flex-col sm:w-[40%]">
                <div className="sign-button-group">
                    {/* border-b-2 */}
                    <button ref={anmeldenWidth} onClick={handleAnmeldenClick} className={` text-white middle px-10 pb-2`}>
                        Anmelden
                    </button>
                    <button ref={registerWidth} onClick={handleRegisterClick} className={` text-white middle  px-10 pb-2`}>
                        Registrieren
                    </button>
                    <span ref={animateSpan} className={`border-t-2 w-[150px] block relative`}></span>
                </div>

                {anmelden ? (
                    <form className="my-5" onSubmit={handleAnmelden}>
                        <div className="my-2">
                            <label htmlFor="email" className="block  text-sm font-medium text-gray-300 dark:text-gray-300">
                                Email
                            </label>
                            <input
                                {...register('email', { required: true, maxLength: 20 })}
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@flowbite.com"
                            />
                        </div>
                        <div className="my-2">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300 dark:text-gray-300">
                                Passwort
                            </label>
                            <input
                                {...register('password')}
                                type="password"
                                id="password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="flex items-start mb-6">
                            <div className="flex items-center h-5">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    value=""
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                                />
                            </div>
                            <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-300 dark:text-gray-300">
                                Remember me
                            </label>
                        </div>
                        <input
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        />
                    </form>
                ) : (
                    <form className="my-5" onSubmit={handleRegistrieren}>
                        <div className="my-2">
                            <label htmlFor="email" className="block  text-sm font-medium text-gray-300 dark:text-gray-300">
                                Email
                            </label>
                            <input
                                {...register('email', { required: true, maxLength: 20 })}
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@flowbite.com"
                            />
                        </div>
                        <div className="my-2">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300 dark:text-gray-300">
                                Passwort
                            </label>
                            <input
                                {...register('password')}
                                type="password"
                                id="password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="my-2">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300 dark:text-gray-300">
                                Passwort wiederholen
                            </label>
                            <input
                                {...register('passwordWdh')}
                                type="password"
                                id="password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                            />
                        </div>
                        <input
                            type="submit"
                            className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        />
                    </form>
                )}
                {showError ? (
                    <div className="absolute flex justify-center content-center bottom-[-6em] slideIn">
                        <div id="alert-2" className="flex p-4 mb-4 bg-red-100 rounded-lg dark:bg-red-200 " role="alert">
                            <svg className="flex-shrink-0 w-5 h-5 text-red-700 dark:text-red-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fill-rule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                            <div className="ml-3 text-sm font-medium text-red-700 dark:text-red-800">{errorText}</div>
                            <button
                                onClick={() => setError(false)}
                                type="button"
                                className="ml-auto -mx-1.5 -my-1.5 bg-red-100 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300"
                                aria-label="Close"
                            >
                                <span className="sr-only">Close</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fill-rule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                ) : null}

                {showTipm ? (
                    <div className="absolute flex justify-center content-center bottom-[-6em] slideIn">
                        <div id="alert-3" className="flex p-4 mb-4 bg-green-100 rounded-lg dark:bg-green-200" role="alert">
                            <svg className="flex-shrink-0 w-5 h-5 text-green-700 dark:text-green-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fill-rule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                            <div className="ml-3 text-sm font-medium text-green-700 dark:text-green-800">
                                {tipText}
                            </div>
                            <button
                                onClick={() => setShowTip(false)}
                                type="button"
                                className="ml-auto -mx-1.5 -my-1.5 bg-green-100 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8 dark:bg-green-200 dark:text-green-600 dark:hover:bg-green-300"
                                data-dismiss-target="#alert-3"
                                aria-label="Close"
                            >
                                <span className="sr-only">Close</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fill-rule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default HomePage;
