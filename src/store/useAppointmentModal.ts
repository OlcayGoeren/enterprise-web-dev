import create from 'zustand';

export interface IAuth {
    show: boolean,
    setShow: (show: boolean) => void;
}

const useAppointmentModal = create<IAuth>((set, get) => ({
    show: false,
    setShow: (show) => {
        set((prev) => ({ show }));
    },
}));

export default useAppointmentModal;
