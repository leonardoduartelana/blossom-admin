// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';

export const getCurrentDate = () => {
    const date = new Date()
    return moment(date).format('YYYY_MM_DD')
}

export const formatToCalendarDate = (date) => moment(date).format('DD/MM/YYYY')

export const formatDate = (date, format) => moment(date).format(format)

export const convertBackendDateToFormat = (dateFromBackend, format) => {
    if (!dateFromBackend)
        return ''

    return moment(dateFromBackend).format(format || 'DD/MM/YYYY')
}

export const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export const dateToBackendDateFormat = (date) => formatDate(date, "YYYY-MM-DDTHH:mm:ss.sssZ")

// eslint-disable-next-line consistent-return
export const convertBackendWeekDayToText = (day) => {
    if(!day)
        return ''

    // eslint-disable-next-line default-case
    switch (day) {
        case 1: return 'Monday'
        case 2: return 'Tuesday'
        case 3: return 'Wednesday'
        case 4: return 'Thursday'
        case 5: return 'Friday'
        case 6: return 'Saturday'
        case 7: return 'Sunday'
    }
}

export const getDaySuffix = (day) => {
    if(!day)
        return ''

    switch (day) {
        case 1: return 'st'
        case 2: return 'nd'
        case 3: return 'rd'
        default: return 'th'
    }
}

export const differenceInMonths = (dateFrom, dateTo) => dateTo.getMonth() - dateFrom.getMonth() +
        (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))