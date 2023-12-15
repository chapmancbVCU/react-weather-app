/**
 * @class Class for handling API keys.
 * @author Chad Chapman
 */
export class API {

    // Instance variables
    private city: string;
    private latitude: number;
    private longitude: number;
    private requestType: string;
    private units: string;
    
    
    /**
     * Default constructor.
     */
    constructor(city: string, latitude: number, longitude: number, 
            requestType: string, units: string) {
        // Setup request type and set other instance variables accordingly.
        this.requestType = requestType;
        
        if(this.requestType === "SIMPLE") {
            this.city = city;
            this.latitude = 0;
            this.longitude = 0;
            this.units = "";
            this.fetchSimpleData();
            console.log("simple");
        } else if(this.requestType === "COMPLETE") {
            this.city = "";
            this.latitude = latitude;
            this.longitude = longitude;
            this.units = units;
            this.fetchCompleteData();
            console.log("complete");
        } else {
            this.city = "error";
            this.latitude = -50000;
            this.longitude = -50000;
            this.units = "error";
            console.log("simple");
            console.log("Invalid request type for weather.  " + 
                "Must be SIMPLE or COMPLETE");
        }
    }

    async fetchCompleteData() {
        const res = await fetch(`http://localhost:3000/api?type=${this.requestType}&&city=${this.city}`);
        const data = await res.json();
        console.log(data.data);
    }

    async fetchSimpleData() {
        const res = await fetch(`http://localhost:3000/api?type=${this.requestType}&&city=${this.city}`);
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