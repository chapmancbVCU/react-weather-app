/**
 * @class The Weather class is responsible for getting weather data.
 * @author Chad Chapman
 */
export class Weather {
    // Instance variables
    private city: object;
    private geoLocationInfo: string;
    private countryName: any;
    private initialUnits: string;
    private JSONCityData: any;
    private JSONDescriptiveWeatherData: any;
    private latitude: number;
    private longitude: number;
    private units: string;


    /**
     * Creates instance of Weather object.
     */
    constructor() {
        this.geoLocationInfo = this.getGeoLocationInformation();
        this.city = this.getLocalityInformation(this.geoLocationInfo);
        this.countryName = this.getCountryInformation(this.geoLocationInfo);
        this.initialUnits = "";
        this.JSONCityData = null!;
        this.JSONDescriptiveWeatherData = null!;
        this.latitude = 0;
        this.longitude = 0;
        this.units = "";
    }


    /**
     * Converts the temperature retrieved from Open Weather Map as Kelvin to 
     * either Fahrenheit or Celsius.
     * @param temperature The temperature in Kelvin that we want to convert to 
     * either Fahrenheit or Celsius.
     * @returns The temperature in either Fahrenheit or Celsius.
     */
    calculateTemperature(temperature: number): number|any {
        if (this.getUnits() === "IMPERIAL") {
            return ((temperature - 273.15) * 9/5 + 32).toFixed(0);
        } else if (this.getUnits() === "METRIC") {
            return ((temperature - 273.15).toFixed(0))
        }
    }


    /**
     * Returns the limited weather data using api call based on city name.
     * @param {string} city The locality whose weather we want to retrieve.
     * @returns The limited local weather data as a JSON Object.
     */
    async getCityData(city: any) {
        try {
            const response = await fetch(
                `http://${import.meta.env.VITE_API_HOSTNAME}:3000/api?type=SIMPLE&city=${city}`);
            const res = await response.json()
            if (res.data) {
                return res.data;
            }
        } catch (error) {
            console.log(error);
        }
    }

    
    /**
     * Get the name of city that is detected using geolocation based on 
     * localhost's location.
     * @returns The name of the city when using geolocation to detect location.
     */
    getCityInfo(): Object {
        return this.city;
    }


    /**
     * The name of the country where the user resides.
     * @param {string} geoLocationInfo JSON string that contains information 
     * about user's current location.
     * @returns The country where the user resides.
     */
    async getCountryInformation(geoLocationInfo: string) {
        try {
            const response = await fetch(geoLocationInfo);
            const data = await response.json();
            return data.countryName;
        } catch (error) {
            console.log(error);
        }
    }


    /**
     * Detect location of localhost so we can get local weather on page load.
     * @returns The string representation of locality information in form of 
     * URL that references an API.
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
     * Getter function for retrieving the users country.
     * @returns The nation where the user resides.
     */
     getCountryName(): string {
        return this.countryName;
    }


    /**
     * Getter function for initial unit system.  It can be either IMPERIAL or 
     * METRIC.
     * @returns The initial units that were set upon location detection when 
     * the user loads the page.
     */
    getInitialUnits(): string {
        return this.initialUnits;
    }


    /**
     * Getter function for returning city data as a JSON object.
     * @returns JSON object containing city data.
     */
    getJSONFreeTierData(): any {
        return this.JSONCityData;
    }


    /**
     * Getter function for returning descriptive weather data as a JSON object.
     * @returns JSON object containing descriptive weather data.
     */
    getJSONOneCallWeatherData(): string {
        return this.JSONDescriptiveWeatherData;
    }


    /**
     * Getter function for the latitude.
     * @returns The latitude of the user or search query
     */
    getLatitude(): number {
        return this.latitude;
    }


    /**
     * Retrieves locality information of user upon initialization of page.
     * @param {string} geoLocationInfo JSON string that contains information 
     * about user's current location.
     * @returns The locality of where the user resides.
     */
    async getLocalityInformation(geoLocationInfo: string): Promise<string|void> {              
        try {
            const response = await fetch(geoLocationInfo);
            const data = await response.json();
            const country = data.countryName;
            if(country.includes('United States of America')) {
                return `${data.locality}, ${data.principalSubdivision}`;
            } else {
                return data.city + ", " + data.countryName;
            }
        } catch (error) {
            console.log(error);
        }
    }


    /**
     * Getter function for the longitude.
     * @returns The longitude of the user or search query
     */
    getLongitude(): number {
        return this.longitude;
    }


    /**
     * Returns the detailed weather data of the user's location or search 
     * query.
     * @param {number} latitude The latitude of user's location or search 
     * query.
     * @param {number} longitude The longitude of user's location or search 
     * query.
     * @returns Detailed weather data as a JSON object.
     */
    async getOneCallWeatherData(latitude: number, longitude: number) {
        let units = '';
        if(this.getUnits() === 'IMPERIAL') {
            units = 'imperial';
        } else {
            units = 'metric';
        }        
        try {
            const response = await fetch(`http://${import.meta.env.VITE_API_HOSTNAME}:3000/api?type=ONECALL&lat=${latitude}&lon=${longitude}&units=${units}`);
            const res = await response.json();
            if (res.data) {
                return res.data;
            }
        } catch (error) {
            console.log(error);
        }
    }


    /**
     * Getter function that retrieves the units.  This value can be METRIC or 
     * IMPERIAL.
     * @returns The units name that the user as selected or detected based on 
     * the user's location.
     */
    getUnits(): string {
        return this.units;
    }


    /**
     * Returns either N, NE, E, SE, S, SW, W, or NW depending on wind 
     * direction.
     * @param {Number} deg The direction of the winds. 
     * @returns A string value indicating general direction of the winds.
     */
    getWindDirection(deg: number) {
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
     * @param {Number} wind The wind speed expressed in meters per second. 
     * @returns The wind speed in mph or km/h.
     */
    getWindSpeed(wind: number) {
        if (this.getUnits() === 'IMPERIAL') {
            return (wind * 2.2369).toFixed(1) + ' mph';
        } else {
            return (wind * (18/5)).toFixed(1) + ' km/h'
        }
    }


    /**
     * Setter function for simple weather data in the form of a JSON object.
     * @param {string} cityData JSON string containing weather data. 
     */
    setJSONFreeTierData(cityData:string|any): void {
        this.JSONCityData = cityData;
    }


    /**
     * Setter function for descriptive weather data in the form of a JSON 
     * object.
     * @param {string} descriptiveWeatherData JSON string containing descriptive 
     * weather data.
     */
    setJSONOneCallWeatherData(descriptiveWeatherData:string|any): void {
        this.JSONDescriptiveWeatherData = descriptiveWeatherData;
    }


    /**
     * Setter function for the latitude of the user's location or search query.
     * @param {number} latitude The latitude of the user's location or search 
     * query.
     */
    setLatitude(latitude: number): void {
        this.latitude = latitude;
    } 


    /**
     * Setter function for the longitude of the user's location or search 
     * query.
     * @param {number} longitude The longitude of the user's location or search 
     * query.
     */
    setLongitude(longitude: number): void {
        this.longitude = longitude;
    }


    /**
     * Sets the value of the units to be used based on user's location.
     * @param {string} countryName The name of the user's nation based on 
     * location detection.
     */
    setUnits(countryName:string): void {
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
    toggleUnits() {
        if(this.units === 'IMPERIAL') {
            this.units = 'METRIC';
        } else {
            this.units = 'IMPERIAL';
        }
    }
}