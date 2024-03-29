/**
 * @class Contains functions that support the display of date and time 
 * information.
 * @author Chad Chapman
 */

export class DateTimeUtility {
    constructor() {
        
    }

    /**
     * Determines time for locality we are getting weather forecast.  This 
     * function takes into account the timezone offset of the location we are 
     * retrieving the weather forecast.
     * @param {JSON} descriptiveWeatherData JSON string containing descriptive 
     * weather data.
     * @returns A string containing local timestamp.
     */
    /*getDateTime(descriptiveWeatherData) {
        let dt = descriptiveWeatherData.current.dt;
        let timezone = descriptiveWeatherData.timezone_offset;
        const utc_seconds = parseInt(dt, 10) + parseInt(timezone, 10);
        const utc_milliseconds = utc_seconds * 1000;
        return new Date(utc_milliseconds).toUTCString();
    }*/

    /**
     * Converts unix time to a UTCString and takes into account timezone 
     * offset.
     * @param {Number} unixTime The time as a number that we want to convert to a 
     * string.
     * @param {String} timezoneOffset The timezone offset.
     * @returns A string containing a timestamp.
     */
    getDateTime(unixTime:number, timezoneOffset:any) {
        return new Date((timezoneOffset + unixTime) * 1000).toUTCString();
    }


    /**
     * This function reports the local date in the following format: 
     * <day_of_week>, <month> <day_of_month>, <year>.
     * @param {String} localDateTime The local timestamp.
     */
    getDateInfo(localDateTime: string): string {
        return this.getDayOfWeek(localDateTime) + ', ' + 
            this.getFullMonthName(localDateTime) + ' ' + 
            this.getDayOfMonth(localDateTime) + ', ' + 
            localDateTime?.slice(12, 16);
    }


    /**
     * Returns the day of month using the ISO string as a parameter.
     * @param {String} dateTimeStamp Date and time information in the form of 
     * an ISO string.
     * @returns The day of month contained in ISO timestamp string.
     */
    getDayOfMonth(dateTimeStamp: string): string {
        let dayOfMonth:any = dateTimeStamp?.toString().slice(5, 7);
        if (dayOfMonth < 10) {
            return dayOfMonth?.slice(1, 2);
        } else {
            return dayOfMonth;
        }
    }


    /**
     * Returns the full day of the week using the ISO string as a parameter.
     * @param {string} dateTimeStamp Date and time information in the form of 
     * an ISO string.
     * @returns Full day of week name.
     */
    getDayOfWeek(dateTimeStamp: string): string|void {
        let days = [['Sunday', 'Sun'], ['Monday', 'Mon'], ['Tuesday', 'Tue'],
            ['Wednesday', 'Wed'], ['Thursday', 'Thu'], ['Friday', 'Fri'],
            ['Saturday', 'Sat']];

        let dayOfWeek = dateTimeStamp?.toString().slice(0, 3);
        for (let i = 0; i < days.length; i++) {
            if (dayOfWeek?.includes(days[i][1])) {
                return dayOfWeek?.replace(days[i][1], days[i][0]);
            }
        }
    }


    /**
     * Returns a string containing the day of week, month, and day of month.
     * @param {String} dateTimeStamp Date and time information in the form of 
     * an ISO string.
     * @returns String in the following format: <day of week>, <month> 
     * <day of month>.
     */
    getForecastDate(dateTimeStamp: string) {
        return this.getDayOfWeek(dateTimeStamp) + ", " + 
            this.getFullMonthName(dateTimeStamp) + " " + 
            this.getDayOfMonth(dateTimeStamp);
    }


    /**
     * Returns the full name of the month using the ISO string as a parameter.
     * @param {String} dateTimeStamp Date and time information in the form of 
     * an ISO string.
     * @returns Full name of the month.
     */
    getFullMonthName(dateTimeStamp: string) {
        let months = [['January', 'Jan'], ['February', 'Feb'],
            ['March', 'Mar'], ['April', 'Apr'], ['May', 'May'],
            ['June', 'Jun'], ['July', 'Jul'], ['August', 'Aug'],
            ['September', 'Sep'], ['October', 'Oct'], ['November', 'Nov'],
            ['December', 'Dec']];

        let monthName = dateTimeStamp?.toString().slice(8, 11);
        for (let i = 0; i < months.length; i++) {
            if (monthName?.includes(months[i][1])) {
                return monthName?.replace(months[i][1], months[i][0]);
            }
        }
    }


    /**
     * This function reports the local time.
     * @param {String} localDateTime The local timestamp.
     * @param {HTMLDivElement} timeContainer The element whose text we will 
     * set with the time.
     */
    getTimeInfo(localDateTime: String) {
        let hours: any = localDateTime.slice(17, 19);
        let minutes: any = localDateTime.slice(20, 22);

        if (minutes < 10) {
            minutes = minutes.slice(0, 1);
        }

        let timePeriod = '';
        if (hours >= 12) {
            timePeriod = 'PM';
        } else {
            timePeriod = 'AM';
        }
        
        // When hours is greater than 12
        if (hours > 12) {
            hours = hours - 12;
        }

        // Handle midnight
        if (hours == 0) {
            hours = 12;
        }

        // Get minutes and format it correctly if the value is less than 10.
        if (minutes < 10) {
            minutes = '0' + minutes;
        }

        //const currentTime = document.querySelector('#current-time');
        return hours + ':' + minutes + ' ' + timePeriod;
    }
}