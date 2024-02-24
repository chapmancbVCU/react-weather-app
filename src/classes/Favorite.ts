/**
 * @class Provides functions for Favorites class.
 * @author Chad Chapman
 */
export class Favorite {
    private city: string;
    private country: string;
    private latitude: number;
    private longitude: number;
    private visits: number;

    /**
     * Creates instance of Favorites object.
     * @param city The locality for the favorite, may include city and state 
     * as part of the string.
     * @param country The nation for the locality we are using as a favorite.
     * @param latitude The latitude for the locality.
     * @param longitude The longitude for the locality.
     */
    constructor(city: string, country: string, latitude: number, longitude: number) {
        this.city = city;
        this.country = country;
        this.latitude = latitude;
        this.longitude = longitude;
        
        /* We will set to 1 initially.  We will track how often user visits a 
           favorite location. */
        this.visits = 1;
    }

    /**
     * Gets the number of times a user has visited a favorite location.
     * @returns The number of times a user has visited a favorite location.
     */
    getVisits(): number {
        return this.visits;
    }

    setFavoriteToStorage(favorite: Favorite, key: string)
    /**
     * This setter function increments visits each time a favorite location 
     * is viewed.
     */
    setVisits(): void {
        this.visits++;
    }
}