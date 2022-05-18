import { DateRange } from "react-day-picker";
import create from "zustand";


export interface StaticVariables {
    selectedMonth:number,
    changeMonth: (month:number) => void,
    range: DateRange | undefined,
    changeRange: (range:DateRange| undefined) => void
}

const useRangeStore = create<StaticVariables>((set,get) => ({
  range: { from: new Date(), to: undefined },
  selectedMonth: new Date().getMonth(),
  changeMonth: (month) => {
    set((prev) => ({ selectedMonth: month }));
  },
  changeRange: (range:DateRange| undefined) => {
    set(() => ({ range }));
  }
}))

export default useRangeStore;
