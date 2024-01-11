// @ts-ignore
import { API } from "./API";
/**
 * @class The Weather class is responsible for getting weather data.
 * @author Chad Chapman
 */
export class Weather {
    // Instance variables
    private apiKeys: API;
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

        //this.apiKeys = null; //new API(this.getCityInfo(), 12, 33, "SIMPLE", "IMPERIAL");
    }

    
    /**
     * Returns the limited weather data using api call based on city name.
     * @param {String} city The locality whose weather we want to retrieve.
     * @returns The limited local weather data.
     */
    async getCityData(city: any) {
        try {
            const response = await fetch(`http://chad-ubuntu-pc:3000/api?type=SIMPLE&&city=${city}`);
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