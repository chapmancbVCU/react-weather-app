/**
 * @class Class for handling API keys.
 * @author Chad Chapman
 */
export class API {

    // Instance variables
    //private weatherKey:string;
    
    
    /**
     * Default constructor.
     */
    constructor() {
        const fetchData = async () => {
            const res = await fetch('http://localhost:3000/api?type=simple&&foo=bar');
            const data = await res.json();
            console.log(data.data);
        }

        fetchData();
    }


    /**
     * Getter function for open weather API key.
     * @returns The API key for open weather.
     */
    // getWeatherKey() {
    //     return this.weatherKey;
    // }
}