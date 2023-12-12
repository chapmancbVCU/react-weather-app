/**
 * @class The Weather class is responsible for getting weather data.
 * @author Chad Chapman
 */
import { API } from "./API";
export class Weather {

    private apiKeys: API;
    constructor() {
        this.apiKeys = new API();
        console.log(this.apiKeys.getWeatherKey());
    }

     getAPI() {
        return this.apiKeys;
    }
}