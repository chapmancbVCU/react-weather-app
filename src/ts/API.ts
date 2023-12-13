/**
 * @class Class for handlig API keys.
 * @author Chad Chapman
 */
export class API {

    // Instance variables
    private weatherKey:string;
    
    
    /**
     * Default constructor.
     */
    constructor() {
        this.weatherKey = '';
    }


    /**
     * Getter function for open weather API key.
     * @returns The API key for open weather.
     */
    getWeatherKey() {
        return this.weatherKey;
    }
}