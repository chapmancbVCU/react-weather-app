// @ts-ignore
import { API } from "./API";
/**
 * @class The Weather class is responsible for getting weather data.
 * @author Chad Chapman
 */
export class Weather {
    // Instance variables
    private city: object;
    private geoLocationInfo: string;
    private initialCountryName: any;
    private initialUnits: string;
    private JSONCityData: string;
    private JSONDescriptiveWeatherData: string;
    private latitude: number;
    private longitude: number;
    private units: string;


    /**
     * Creates instance of Weather object.
     */
    constructor() {
        
        this.geoLocationInfo = this.getGeoLocationInformation();
        this.city = this.getLocalityInformation(this.geoLocationInfo);
        this.initialCountryName = this.getCountryInformation(this.geoLocationInfo);
        this.initialUnits = "";
        this.JSONCityData = "";
        this.JSONDescriptiveWeatherData = "";
        this.latitude = 0;
        this.longitude = 0;
        this.units = "";
    }

    
    /**
     * Returns the limited weather data using api call based on city name.
     * @param {String} city The locality whose weather we want to retrieve.
     * @returns The limited local weather data.
     */
    async getCityData(city: any) {
        try {
            const response = await fetch(`http://localhost:3000/api?type=SIMPLE&&city=${city}`);
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Get the name of city that is detected using geolocation based on 
     * localhost's location.
     * @returns The name of the city when using geolocation to detect location.
     */
    getCityInfo() {
        return this.city;
    }


    /**
     * The name of the country where the user resides.
     * @param {String} geoLocationInfo JSON string that contains information 
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
     * Getter function for initial unit system.  It can be either IMPERIAL or 
     * METRIC.
     * @returns The initial units that were set upon location detection when 
     * the user loads the page.
     */
    getInitialUnits() {
        return this.initialUnits;
    }


    /**
     * Getter function for returning descriptive weather data as a JSON object.
     * @returns JSON object containing descriptive weather data.
     */
    getJSONDescriptiveWeatherData() {
        return this.JSONDescriptiveWeatherData;
    }


    /**
     * Getter function for retrieving the users country.
     * @returns The nation where the user resides.
     */
    getInitialCountryName() {
        return this.initialCountryName;
    }


    /**
     * Detect location of localhost so we can get local weather on page load.
     * @returns The string representation of locality information in form of 
     * URL that references an API.
     */
    getGeoLocationInformation() {
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
     * Getter function for returning city data as a JSON object.
     * @returns JSON object containing city data.
     */
    getJSONCityData() {
        return this.JSONCityData;
    }

    
    /**
     * Getter function for the latitude.
     * @returns The latitude of the user or search query
     */
    getLatitude() {
        return this.latitude;
    }


    /**
     * Retrieves locality information of user upon initialization of page.
     * @param {String} geoLocationInfo JSON string that contains information 
     * about user's current location.
     * @returns The locality of where the user resides.
     */
    async getLocalityInformation(geoLocationInfo: string) {              
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
    getLongitude() {
        return this.longitude;
    }


    /**
     * Getter function that retrieves the units.  This value can be METRIC or 
     * IMPERIAL.
     * @returns The units name that the user as selected or detected based on 
     * the user's location.
     */
    getUnits() {
        return this.units;
    }


    /**
     * Returns the detailed weather data of the user's location or search 
     * query.
     * @param {Number} latitude The latitude of user's location or search 
     * query.
     * @param {Number} longitude The longitued of user's location or search 
     * query.
     * @returns Detailed weather data. 
     */
    async getWeatherData(latitude: number, longitude: number) {
        let units = '';
        if(this.getUnits() === 'IMPERIAL') {
            units = 'imperial';
        } else {
            units = 'metric';
        }        
        try {
            const response = await fetch(`http://localhost:3000/api?type=COMPLETE&lat=${latitude}&lon=${longitude}&units=${units}`);
            const weatherData = await response.json();
            return weatherData;
        } catch (error) {
            console.log(error);
        }
    }


    /**
     * Setter function for simple weather data in the form of a JSON object.
     * @param {JSON} cityData JSON object containing weather data. 
     */
    setJSONCityData(cityData:string) {
        this.JSONCityData = cityData;
    }


    /**
     * Setter function for descriptive weather data in the form of a JSON 
     * object.
     * @param {JSON} descriptiveWeatherData JSON object containing descriptive 
     * weather data.
     */
    setJSONDescriptiveWeatherData(descriptiveWeatherData:string) {
        this.JSONDescriptiveWeatherData = descriptiveWeatherData;
    }


    /**
     * Setter function for the latitude of the user's location or search query.
     * @param {Number} latitude The latitude of the user's location or search 
     * query.
     */
    setLatitude(latitude: number) {
        this.latitude = latitude;
    } 


    /**
     * Setter function for the longitude of the user's location or search 
     * query.
     * @param {Number} longitude The longitude of the user's location or search 
     * query.
     */
    setLongitude(longitude: number) {
        this.longitude = longitude;
    }


    /**
     * Sets the value of the units to be used based on user's location.
     * @param {String} countryName The name of the user's nation based on 
     * location detection.
     */
    setUnits(countryName:string) {
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
}