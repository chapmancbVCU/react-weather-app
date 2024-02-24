/**
 * @class Provides functions for Favorites class.
 * @author Chad Chapman
 */
export class Favorite {
    /**
     * The locality associated with the favorite.  It may include the city and 
     * state as part of this string.
     * @type { string }
     */
    private city: string;

    /**
     * The nation for the locality we are using as a favorite.
     * @type { string }
     */
    private country: string;

    /**
     * The latitude for the locality.
     * @type { number }
     */
    private latitude: number;

    /**
     * The longitude for the locality.
     * @type { number} 
     */
    private longitude: number;

    /**
     * The number of times a user has visited a locality.  This will be used 
     * to determine frequency of visits to make suggestions to the user.
     */
    private visits: number;

    /**
     * Creates instance of Favorites object.
     * @param city The locality for the favorite, may include city and state 
     * as part of the string.
     * @param country The nation for the locality we are using as a favorite.
     * @param latitude The latitude for the locality.
     * @param longitude The longitude for the locality.
     * @param visits The number of times a user has visited a locality.  This 
     * will be used to determine frequency to make suggestions to user.
     */
    constructor(city: string, country: string, latitude: number, 
        longitude: number, visits: number) {
        this.city = city;
        this.country = country;
        this.latitude = latitude;
        this.longitude = longitude;
        this.visits = visits;
    }

    /**
     * Retrieves a Favorite from localStorage.  Returned object is an instance 
     * of the Favorite class.
     * @param key A string containing name of key you want to retrieve the 
     * value of.
     * @returns An instance of the Favorite class.
     */
    getFavorite(key: string) {
        let deserializedObj = JSON.parse(localStorage.getItem(key)!);

        const city = deserializedObj.city;
        const country = deserializedObj.country;
        const latitude = deserializedObj.latitude;
        const longitude = deserializedObj.longitude;
        const visits = deserializedObj.visits;

        const favorite = new Favorite(city, country, latitude, longitude, visits);
        return favorite;
    }

    /**
     * Getter function for city.
     * @returns The name of the city associated with this Favorite object.
     */
    getCity(): string {
        return this.city;
    }

    /**
     * Getter function for country.
     * @returns The name of the country associated with this Favorite object.
     */
    getCountry(): string {
        return this.country;
    }

    /**
     * Getter function for city's latitude.
     * @returns The value of the latitude associated with this Favorite object.
     */
    getLatitude(): number {
        return this.latitude;
    }

    /**
     * Getter function for city's longitude.
     * @returns The value of the longitude associated with this Favorite object.
     */
    getLongitude(): number {
        return this.longitude;
    }

    /**
     * Gets the number of times a user has visited a favorite location.
     * @returns The number of times a user has visited a favorite location.
     */
    getVisits(): number {
        return this.visits;
    }

    /**
     * This function accepts a Favorite object and a key identifier then saves 
     * that information to localStorage.
     * @param favorite The Favorite object we want to save to localStorage.
     * @param key The keyName for how we will identify an item in local 
     * storage.
     */
    setFavoriteToStorage(favorite: Favorite, key: string) {
        let serializedObj = JSON.stringify(favorite);
        localStorage.setItem(key, serializedObj);
    }

    /**
     * This setter function increments visits each time a favorite location 
     * is viewed.
     */
    setVisits(): void {
        this.visits++;
    }
}