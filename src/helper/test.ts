import { startOfMonth, previousMonday, add, endOfMonth, nextSunday, isSunday, isMonday, startOfWeek, endOfWeek } from "date-fns";


const data = new Date(2022, 6, 1);
const startMonth = isMonday(startOfMonth(data)) ? startOfMonth(data) : add(previousMonday(startOfMonth(data)), { days: 1 })
const endMonth = isSunday(endOfMonth(data)) ? endOfMonth(data) : nextSunday(endOfMonth(data));


const getStartMonth = (date: Date): Date => {


    return isSunday(startOfMonth(date)) ? previousMonday(startOfWeek(startOfMonth(date))) : add(startOfWeek(startOfMonth(date)), { days: 1 });
    // console.log(isMonday(startOfWeek(startOfMonth(date))))
    // return isSunday(startOfWeek(startOfMonth(date)))? previousMonday(startOfWeek(startOfMonth(date))) : startOfWeek(startOfMonth(date))
}


const getEndMonth = (date: Date): Date => {
    return add(endOfWeek(endOfMonth(date)), { days: 1 })
    // return isSunday(endOfMonth(data)) ? endOfMonth(data) : nextSunday(endOfMonth(data));
}

function chunk(arr: any[], len: number) {

    var chunks = [],
        i = 0,
        n = arr.length;

    while (i < n) {
        chunks.push(arr.slice(i, i += len));
    }

    return chunks;
}

const getDatesBetweenDates = (startDate: Date, endDate: Date): Date[] => {
    let dates: Date[] = [];
    const theDate = new Date(startDate)
    while (theDate < endDate) {
        dates = [...dates, new Date(theDate)]
        theDate.setDate(theDate.getDate() + 1)
    }
    return dates;
}


const getDatesAndChunkBetween = (startDate: Date, endDate: Date): Date[][] => {
    return chunk(getDatesBetweenDates(startDate, endDate), 7)
}

const nextMonth = (date: Date): Date => {
    return add(date, { months: 1 });
}

const backMonth = (date: Date): Date => {
    return add(date, { months: -1 });
}

export { getStartMonth, getEndMonth, getDatesAndChunkBetween, nextMonth, backMonth };