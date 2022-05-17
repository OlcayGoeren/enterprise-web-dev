import { MoreVert } from '@mui/icons-material';
import React from 'react';

export interface IUpcommingeventsComponentProps {
    // dayNamesShort: string[],
    // weekChunks?: Date[][],
    // currentMonth?: number
}

const Upcommingevents: React.FunctionComponent<IUpcommingeventsComponentProps> = () => {
    return (
        <div className="overflow-scroll h-[17em]">
            <h1 className='text-white font-bold mb-2'>Es stehen xx Termine bevor</h1>

            <div className="flex flex-col">
                <span className='text-[#858383] font-bold px-4 py-2'>31.03.2022</span>
                <div className="card flex flex-col bg-[#1D355C] text-[#CFCFCF] p-4 rounded-xl shadow-md relative">
                    <span className="text-[12px]">Donnerstag, 31.03.2022 04:50-06:00</span>
                    <span className="my-1"></span>
                    <span className="font-bold text-lg">Mathe lernen</span>
                    <button className="absolute top-2 right-5"><MoreVert /></button>
                </div>
            </div>
            <div className="flex flex-col">
                <span className='text-[#858383] font-bold px-4 py-2'>31.03.2022</span>
                <div className="card flex flex-col bg-[#1D355C] text-[#CFCFCF] p-4 rounded-xl shadow-md relative">
                    <span className="text-[12px]">Donnerstag, 31.03.2022 04:50-06:00</span>
                    <span className="my-1"></span>
                    <span className="font-bold text-lg">Mathe lernen</span>
                    <button className="absolute top-2 right-5"><MoreVert /></button>
                </div>
            </div>
            <div className="flex flex-col">
                <span className='text-[#858383] font-bold px-4 py-2'>31.03.2022</span>
                <div className="card flex flex-col bg-[#1D355C] text-[#CFCFCF] p-4 rounded-xl shadow-md relative">
                    <span className="text-[12px]">Donnerstag, 31.03.2022 04:50-06:00</span>
                    <span className="my-1"></span>
                    <span className="font-bold text-lg">Mathe lernen</span>
                    <button className="absolute top-2 right-5"><MoreVert /></button>
                </div>
            </div>
            <div className="flex flex-col">
                <span className='text-[#858383] font-bold px-4 py-2'>31.03.2022</span>
                <div className="card flex flex-col bg-[#1D355C] text-[#CFCFCF] p-4 rounded-xl shadow-md relative">
                    <span className="text-[12px]">Donnerstag, 31.03.2022 04:50-06:00</span>
                    <span className="my-1"></span>
                    <span className="font-bold text-lg">Mathe lernen</span>
                    <button className="absolute top-2 right-5"><MoreVert /></button>
                </div>
            </div>
        </div>
    );
};

export default Upcommingevents;
