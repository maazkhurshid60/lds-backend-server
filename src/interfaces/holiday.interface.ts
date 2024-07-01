
export interface ICreateHoliday {
    holidayYear: number,
    holidayDate: string,
    holidayDescription: string
}

export interface IUpdateHoliday extends ICreateHoliday {
    holidayId: string
}