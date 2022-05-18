import create from "zustand";


export interface Width {
    width: number,
    changeWidth: (newVal:number) => void
}


const useWidthStore = create<Width>((set,get) => ({
  width: 0,
  changeWidth: (newVal) => {
    set(() => ({ width: newVal }));
  }
}))

export default useWidthStore;
