import create from 'zustand';

export interface IAuth {
    show: boolean,
    setShow: (show: boolean) => void
    showButtons: boolean,
    setShowButtons: (showButtons: boolean) => void
}

const useAppointmentModal = create<IAuth>((set, get) => ({
    show: false,
    showButtons: false,
    setShowButtons: (showButtons) => {
        set((prev) => ({ showButtons }));
    },
    setShow: (show) => {
        set((prev) => ({ show }));
    },
}));

export default useAppointmentModal;
