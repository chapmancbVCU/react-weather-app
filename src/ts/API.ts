/**
 * @class Class for handling API keys.
 * @author Chad Chapman
 */
export class API {

    // Instance variables
    private city: string;
    private latitude: number;
    private longitude: number;
    private requestURL: string;
    private requestType: string;
    private units: string;
    
    
    /**
     * Default constructor.
     */
    constructor(city: string, latitude: number, longitude: number, 
            requestUrl: string, requestType: string, units: string) {
        this.city = city;
        this.latitude = 0;
        this.longitude = 0;
        this.requestURL = "";
        this.requestType = "";
        this.units = "";
        

        this.fetchData();
    }

    async fetchData() {
        const res = await fetch('http://localhost:3000/api?type=simple&&foo=bar');
        const data = await res.json();
        console.log(data.data);
    }

    /**
     * Getter function for open weather API key.
     * @returns The API key for open weather.
     */
    // getWeatherKey() {
    //     return this.weatherKey;
    // }
}