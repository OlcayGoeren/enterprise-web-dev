import create from "zustand";


export interface StaticVariables {
    months: string[],
    dayNamesShort: string[],
    dayNamesLong: string[]
}
const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
const dayNamesShort = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const dayNamesLong = ["Montag", "Dienstag", "Mitwoch", "Donnerstag", "Freitag", "Samstag", "Sontag"];

const useWeekNamesStore = create<StaticVariables>((set,get) => ({
  months,
  dayNamesShort,
  dayNamesLong
}))

export default useWeekNamesStore;
