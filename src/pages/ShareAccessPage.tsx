import { add } from 'date-fns';
import { env } from 'process';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import useVisitorStore from '../store/useVisitorStore';

export interface IAboutPageProps { }

const ShareAccessPage: React.FunctionComponent<IAboutPageProps> = (props) => {
    // const [message, setMessage] = useState('');
    const { putVisitor, error, setVisitor } = useVisitorStore((store) => store);
    const { shareId } = useParams();
    const { setToken } = useAuthStore(store => store);
    let navigate = useNavigate();


    useEffect(() => {

        let storageGuestEmail = localStorage.getItem(process.env.REACT_APP_GUEST_EMAIL!);


        if (storageGuestEmail?.length === 0 || storageGuestEmail === null) {
            storageGuestEmail = window.prompt("Bitte gib deine Email Adresse ein um Zugriff auf den geteilten Kalender zu bekommen", "");
            localStorage.setItem(process.env.REACT_APP_GUEST_EMAIL!, storageGuestEmail!);
        }


        if (storageGuestEmail != null) {
            putVisitor(storageGuestEmail, shareId!)
                .then((resp) => {
                    setToken(resp.data['jwt-token']);
                    setVisitor(true);
                    navigate('/kalender', { replace: true });
                })
        }
    }, []);

    return (
        <div>
            {error ? <p>ERROR</p> : null}
        </div>
    );
};

export default ShareAccessPage;
