/**
 * @class Provides functions for Favorites class.
 * @author Chad Chapman
 */
export class Favorites {
    private city: string;
    private country: string;
    private latitude: number;
    private longitude: number;

    constructor(city: string, country: string, latitude: number, longitude: number) {
        this.city = city;
        this.country = country;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}