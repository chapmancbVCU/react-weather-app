/**
 * @class The Weather class is responsible for getting weather data.
 * @author Chad Chapman
 */
export class Weather {
    /**
     * The city that we are currently viewing data.
     * @type { Promise<string | void> | string }
     */
    private city: Promise<string | void> | string;

    /**
     * Geolocation information the application fetches upon application start.
     * @type { string }
     */
    private geoLocationInfo: string;

    /**
     * The name of the country the current city is located.
     * @type { Promise<string|void> | string }
     */
    private countryName: Promise<string | void> | string;

    /**
     * The state of the application.  Used for decision making.  After initial 
     * steps to start the app is complete it gets set to false.
     * @type { boolean }
     */
    private init: boolean;

    /**
     * The initial units used by the application.  It can be either metric or 
     * imperial.
     * @type { string }
     */
    private initialUnits: string;

    /**
     * JSON string containing free tier data.
     * @type { Promise<string | void> }
     */
    private JSONFreeTierData: Promise<string|void>;

    /**
     * JSON string containing one call data.
     * @type { Promise<string | void> }
     */
    private JSONOneCallData: Promise<string | void>;

    /**
     * The latitude for the current city.
     * @type { Promise<number | void> | number }
     */
    private latitude: Promise<number | void> | number;

    /**
     * The longitude for the current city.
     * @type { Promise<number | void> | number }
     */
    private longitude: Promise<number | void> | number;

    /**
     * The current units selected by the user.
     * @type { string }
     */
    private units: string;

    /**
     * Creates instance of Weather object.
     */
    constructor() {
        this.geoLocationInfo = this.getGeoLocationInformation();
        this.city = this.getLocalityInformation(this.geoLocationInfo);
        this.countryName = this.getCountryInformation(this.geoLocationInfo);
        this.init = true;
        this.initialUnits = "";
        this.JSONFreeTierData = null!;
        this.JSONOneCallData = null!;
        this.latitude = this.getInitialLatitude(this.geoLocationInfo)!;
        this.longitude = this.getInitialLongitude(this.geoLocationInfo)!;
        this.units = "";
    }

    /**
     * Converts the temperature retrieved from Open Weather Map as Kelvin to 
     * either Fahrenheit or Celsius.
     * @param { number } temperature The temperature in Kelvin that we want to 
     * convert to either Fahrenheit or Celsius.
     * @returns { number | any }The temperature in either Fahrenheit or 
     * Celsius.
     */
    calculateTemperature(temperature: number): number | any {
        if (this.getUnits() === "IMPERIAL") {
            return ((temperature - 273.15) * 9/5 + 32).toFixed(0);
        } else if (this.getUnits() === "METRIC") {
            return ((temperature - 273.15).toFixed(0))
        }
    }

    /**
     * Returns the limited weather data using api call based on city name.
     * @param { string } city The locality whose weather we want to retrieve.
     * @returns { Promise<string | void> } The limited local weather data as a 
     * JSON Object.
     */
    async getCityData(city: any): Promise<string|void> {
        try {
            const response = await fetch(
                `http://${import.meta.env.VITE_API_HOSTNAME}:3000/api?type=SIMPLE&city=${city}`);
            const res = await response.json()
            if (res.data) { return res.data; }
        } catch (error) { console.log(error); }
    }

    /**
     * Get the name of city that is detected using geolocation based on 
     * localhost's location.
     * @returns { Promise<string | void> | string } The name of the city when using 
     * geolocation to detect location.
     */
    getCityInfo(): Promise<string | void> | string {
        return this.city;
    }

    /**
     * The name of the country where the user resides.
     * @param { string } geoLocationInfo JSON string that contains information 
     * about user's current location.
     * @returns { Promise<string | void> } The country where the user resides.
     */
    async getCountryInformation(geoLocationInfo: string): 
        Promise<string | undefined> {
        try {
            const response = await fetch(geoLocationInfo);
            const data = await response.json();
            return data.countryName;
        } catch (error) { console.log(error); }
    }

    /**
     * Getter function for retrieving the users country.
     * @returns { Promise<string | void> | string } The nation where the user 
     * resides.
     */
    getCountryName(): Promise<string | void> | string {
        return this.countryName;
    }

    /**
     * Detect location of localhost so we can get local weather on page load.
     * @returns { string } The string representation of locality information 
     * in form of URL that references an API.
     */
    getGeoLocationInformation(): string {
        let _this = this;
        let bdcApi = "https://api.bigdatacloud.net/data/reverse-geocode-client";

        //check if geolocation is available
        if (navigator.geolocation) { 
            navigator.geolocation.getCurrentPosition(function(position) {
                _this.setLatitude(position.coords.latitude);
                _this.setLongitude(position.coords.longitude);
                bdcApi = bdcApi
                    + "?latitude=" + position.coords.latitude
                    + "&longitude=" + position.coords.longitude
                    + "&localityLanguage=en";         
            });   
        }
        return bdcApi;
    }

    /**
     * Returns a boolean value based on state of the application.  When the 
     * application is started this value is set to true.  When a fetch for 
     * data is made it is set to false.  Use this function to test for 
     * conditions based on whether or not the application has just started.
     * @returns { boolean } True if application has just been initialized and 
     * false otherwise.
     */
    getInit(): boolean {
        return this.init;
    }
    
    /**
     * Returns the original latitude used to get weather data on application 
     * startup.  It uses the geoLocationInfo JSON string to get this 
     * information.
     * @param { string }geoLocationInfo A string containing information pulled 
     * upon application start to determine the user's location.
     * @returns { Promise<number | undefined> } The latitude based on a fetch 
     * request used to get initial location information.
     */
    async getInitialLatitude(geoLocationInfo: string): 
        Promise<number | undefined> {
        try {
            const response = await fetch(geoLocationInfo);
            const data = await response.json();
            return data.latitude;
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Returns the original longitude used to get weather data on application 
     * startup.  It uses the geoLocationInfo JSON string to get this 
     * information.
     * @param { string } geoLocationInfo A string containing information pulled 
     * upon application start to determine the user's location.
     * @returns { Promise<number | undefined> } The longitude based on a fetch 
     * request used to get initial location information.
     */
    async getInitialLongitude(geoLocationInfo: string): 
        Promise<number | undefined> {
        try {
            const response = await fetch(geoLocationInfo);
            const data = await response.json();
            return data.longitude;
        } catch (error) { console.log(error); }
    }

    /**
     * Getter function for initial unit system.  It can be either IMPERIAL or 
     * METRIC.
     * @returns { string } The initial units that were set upon location 
     * detection when the user loads the page.
     */
    getInitialUnits(): string {
        return this.initialUnits;
    }

    /**
     * Getter function for returning city data as a JSON object.
     * @returns { Promise<string | void> } JSON object containing city data.
     */
    getJSONFreeTierData(): Promise<string | void> {
        return this.JSONFreeTierData;
    }

    /**
     * Getter function for returning descriptive weather data as a JSON object.
     * @returns { Promise<string | void> } JSON object containing descriptive 
     * weather data.
     */
    getJSONOneCallWeatherData(): Promise<string | void> {
        return this.JSONOneCallData;
    }

    /**
     * Getter function for the latitude.
     * @returns { Promise<number | void> } The latitude of the user or search 
     * query.
     */
    getLatitude(): Promise<number | void> | number {
        return this.latitude;
    }

    /**
     * Retrieves locality information of user upon initialization of page.
     * @param { string } geoLocationInfo JSON string that contains information 
     * about user's current location.
     * @returns { Promise<string | void> } The locality of where the user 
     * resides.
     */
    async getLocalityInformation(geoLocationInfo: string): 
        Promise<string | void> {              
        try {
            const response = await fetch(geoLocationInfo);
            const data = await response.json();
            const country = data.countryName;
            if(country.includes('United States of America')) {
                return `${data.locality}, ${data.principalSubdivision}`;
            } else { return data.city + ", " + data.countryName; }
        } catch (error) { console.log(error); }
    }

    /**
     * Getter function for the longitude.
     * @returns { Promise<number | void> | number } The longitude of the user or 
     * search query
     */
    getLongitude(): Promise<number | void> | number {
        return this.longitude;
    }

    /**
     * Returns the detailed weather data of the user's location or search 
     * query.
     * @param { number } latitude The latitude of user's location or search 
     * query.
     * @param { number } longitude The longitude of user's location or search 
     * query.
     * @returns { Promise<string | void> } Detailed weather data as a JSON object.
     */
    async getOneCallWeatherData(latitude: Promise<number | void> | number, 
        longitude: Promise<number | void> | number): Promise<string | void> {
        let units = '';
        this.getUnits() === 'IMPERIAL' ? units = 'imperial' : units = 'metric';

        try {
            const response = await fetch(`http://${import.meta.env.VITE_API_HOSTNAME}:3000/api?type=ONECALL&lat=${latitude}&lon=${longitude}&units=${units}`);
            const res = await response.json();
            if (res.data) { return res.data; }
        } catch (error) { console.log(error); }
    }

    /**
     * Converts pressure in hectoPascals(hPa) to inches.
     * @param { number } pressureInhPa in hectoPascals (hPa).
     * @returns The pressure represented in inches.
     */
    getPressure(pressureInhPa: number) {
        if(this.getUnits() === "IMPERIAL") {
            const PRESSURE_CONVERSION_CONSTANT: number = 0.0295;
            return (pressureInhPa * PRESSURE_CONVERSION_CONSTANT).toFixed(1) + " psi";
        } else { return pressureInhPa + " mbar"; }
    }

    /**
     * Returns temperature based on system user has application set.
     * @param { number | any } temperature Value for temperature provided by 
     * Open Weather Map.
     * @returns { number | any } Value converted to either Fahrenheit or 
     * Celsius.
     */
    getTemperature(temperature: number | any): number | any {
        if(temperature != undefined){
            if (this.getInitialUnits() == 'IMPERIAL') {
                if(this.getUnits() == 'IMPERIAL') {
                    return temperature.toFixed(0)!;
                } else { return ((temperature - 32) * (5/9)).toFixed(0)!; }   
            } else if (this.getInitialUnits() == 'METRIC') {
                if(this.getUnits() == 'IMPERIAL') {
                    return ((temperature * 1.8) + 32).toFixed(0)!;
                } else { return temperature.toFixed(0)!; }
            }
        }
    }

    /**
     * Getter function that retrieves the units.  This value can be METRIC or 
     * IMPERIAL.
     * @returns { string } The units name that the user as selected or detected 
     * based on the user's location.
     */
    getUnits(): string {
        return this.units;
    }

    /**
     * Converts visibility in meters to kilometers or miles depending on which 
     * units are selected.
     * @param { number } visibility string containing weather data for locality.
     * @returns Visibility represented as miles or kilometers depending on 
     * which units of measurement is selected.
     */
    getVisibility(visibility: number): string {
        if (this.getUnits() === 'IMPERIAL') {
            return (visibility / 1609.344).toFixed(1) + ' miles';
        } else { return (visibility / 1000).toFixed(1) + ' km'; }
    }

    /**
     * Returns either N, NE, E, SE, S, SW, W, or NW depending on wind 
     * direction.
     * @param { number } deg The direction of the winds. 
     * @returns { string | any } A string value indicating general direction 
     * of the winds.
     */
    getWindDirection(deg: number): string | any {
        if ((deg >= 337.6 && deg <= 359.9) || deg >= 0 && deg <= 22.5) {
            return 'S';
        } else if (deg >= 22.6 && deg <= 67.5) {
            return 'SW';
        } else if (deg >= 67.6 && deg <= 112.5) {
            return 'W';
        } else if (deg >= 112.6 && deg <= 157.5) {
            return 'NW';
        } else if (deg >= 157.6 && deg <= 202.5) {
            return 'N';
        } else if (deg >= 202.6 && deg <= 247.5) {
            return 'NE';
        } else if (deg >= 247.6 && deg <= 292.5) {
            return 'E';
        } else if (deg >= 292.6 && deg <= 337.5) {
            return 'SE';
        }
    }

    /**
     * Returns wind as mph or km/h depending of location.
     * @param { number } wind The wind speed expressed in meters per second. 
     * @param { boolean } toggled False if Imperial and true if metric, used 
     * for decision making for calculating correct values.
     * @returns { string } The wind speed in mph or km/h.
     */
    getWindSpeed(wind: number, toggled: boolean): string | any {
        if (this.getInitialUnits() === 'METRIC') {
            if (toggled === false) {
                return (wind / 1.609)?.toFixed(1) + ' mph';
            } else { return wind?.toFixed(1) + ' km/h'; }
        } else if (this.getInitialUnits() === 'IMPERIAL') {
            if (toggled === false) { return wind?.toFixed(1) + ' mph'; }
            else { return (wind * 1.609)?.toFixed(1) + ' km/h'; }
        }
    }

    /**
     * Returns current wind as mph or km/h depending of location.
     * @param {number} wind The wind speed expressed in meters per second. 
     * @returns {string} The wind speed in mph or km/h.
     */
    // getCurrentWindSpeed(wind: number, toggled: boolean): string | any {
    //    if (this.getInitialUnits() === 'IMPERIAL') {
    //         if (toggled === false) {
    //             return wind?.toFixed(1) + ' mph';
    //         } else {
    //             return (wind * 1.609)?.toFixed(1) + ' km/h';
    //         }
    //     } else if (this.getInitialUnits() === 'METRIC') {
    //         if (toggled === false) {
    //             return wind?.toFixed(1) + ' km/h';
    //         } else {
    //             return (wind / 1.609)?.toFixed(1) + ' km/h';
    //         }
    //     }
    // }

    /**
     * Sets name of current city.
     * @param { Promise<string | void> | string } city The name of the city.
     */
    setCity(city: Promise<string | void> | string): void {
        this.city = city;
    }

    /**
     * Sets name of current country.
     * @param { string } country The name of the country.
     */
    setCountry(country: string): void {
        this.countryName = country
    }

    /**
     * Sets string for content div to contain content class selector along 
     * with class selector for specific background images.
     * @param { string } currentConditions Description of current conditions 
     * in current forecast.
     * @returns { string } A string containing current conditions description 
     * along with another class for content.
     */
    setConditionsClass(currentConditions: string): string {
        if (currentConditions === "clear sky") {
            return "clear-sky content";
        } else if (currentConditions === "scattered clouds") {
            return "scattered-clouds content";
        } else if (currentConditions === "few clouds") {
            return "few-clouds content";
        } else if (currentConditions === "broken clouds") {
            return "broken-clouds content";
        } else if (currentConditions === "shower rain") {
            return "shower-rain content";
        } else if (currentConditions === "rain") {
            return "rain content";
        } else if (currentConditions === "thunder storm") {
            return "thunder-storm content";
        } else if (currentConditions === "snow") {
            return "snow content";
        } else if (currentConditions === "mist") {
            return "mist content";
        } else {
            return "clear-sky content";
        }
    }

    /**
     * Sets value of init to false after initial steps to get application 
     * running is completed.
     */
    setInitFalse() {
        this.init = false;
    }

    /**
     * Setter function for simple weather data in the form of a JSON object.
     * @param { string | any } JSONFreeTierData JSON string containing weather 
     * data. 
     */
    setJSONFreeTierData(JSONFreeTierData: string | any): void {
        this.JSONFreeTierData = JSONFreeTierData;
    }

    /**
     * Setter function for descriptive weather data in the form of a JSON 
     * object.
     * @param { string | any } JSONOneCallData JSON string containing 
     * descriptive weather data.
     */
    setJSONOneCallWeatherData(JSONOneCallData: string | any): void {
        this.JSONOneCallData = JSONOneCallData;
    }

    /**
     * Setter function for the latitude of the user's location or search query.
     * @param { Promise<number | void> | number } latitude The latitude of the 
     * user's location or search query.
     */
    setLatitude(latitude: Promise<number | void> | number): void {
        this.latitude = latitude;
    } 

    /**
     * Setter function for the longitude of the user's location or search 
     * query.
     * @param {Promise<number | void> | number } longitude The longitude of 
     * the user's location or search query.
     */
    setLongitude(longitude: Promise<number | void> | number): void {
        this.longitude = longitude;
    }

    /**
     * Sets the value of the units to be used based on user's location.
     * @param { string } countryName The name of the user's nation based on 
     * location detection.
     */
    setUnits(countryName: string | any): void {
        if (countryName.includes('United States of America') ||
            countryName.includes('Myanmar') ||
            countryName.includes('Liberia')) {
            this.initialUnits = 'IMPERIAL';
            this.units = 'IMPERIAL'
        } else {
            this.initialUnits = 'METRIC';
            this.units = 'METRIC';
        }
    }

    /**
     * Toggles the this.units instance variable between IMPERIAL and METRIC.
     */
    toggleUnits(): void {
        this.units === 'IMPERIAL' ? 
            this.units = 'METRIC' : this.units = 'IMPERIAL';
    }
}