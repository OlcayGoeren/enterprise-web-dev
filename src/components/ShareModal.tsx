
import React, { useEffect, useRef, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import useVisitorStore from '../store/useVisitorStore';
import useAuthStore from '../store/useAuthStore';


export interface IShareModalProps { }

const ShareModal: React.FunctionComponent<IShareModalProps> = (props) => {

    const copyRef = useRef<HTMLDivElement>(null);
    const { generateVisitor } = useVisitorStore((store) => store);
    const { token } = useAuthStore((state) => state);
    const [shareId, setShareId] = useState("");
    const { toggleVisitorModal } = useVisitorStore((store) => store);


    useEffect(() => {
        (async function anyNameFunction() {
            const value = await generateVisitor(token);
            setShareId(value);
        })();
    }, []);

    function copyme() {
        copyRef.current!.style.color = "green";
        navigator.clipboard.writeText(process.env.REACT_APP_FRONTEND_URL + "/share/" + shareId);
        setTimeout(() => {
            copyRef.current!.style.color = "black";
        }, 300)
    }



    return (
        <div className=" bg-[#DBDBDB] flex flex-col justify-between absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] rounded-lg">
            <div onClick={() => toggleVisitorModal()} className="bg-[#2A4462] text-white p-5 pt-10 flex  justify-between">
                <div className="absolute top-[4px] right-[10px]">
                    <CloseIcon />
                </div>
                <h1>Kalender Freigeben</h1>
            </div>
            <button onClick={() => copyme()} className='flex bg-[#C4C4C4] p-4 w-[90%] justify-center rounded-lg ml-3 m-10'>
                <div className="mr-5">
                    <span className='text-gray-500'>{process.env.REACT_APP_FRONTEND_URL + "/share/" + shareId}</span>
                </div>
                <div className="" ref={copyRef}>
                    <ContentPasteIcon />
                </div>
            </button>
        </div>


    );
};

export default ShareModal;