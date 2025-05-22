import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private cache: Cache;

    constructor(cacheInterval: number) {
        this.cache = new Cache(cacheInterval);
    }

    async fetchLocations(pageURL?: string): Promise<LocationArea> {
        const url = pageURL ?? `${PokeAPI.baseURL}/location-area`;
        let cachedResponse = this.cache.get<LocationArea>(url);
        if (cachedResponse) {
            return cachedResponse;
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error(`${response.status} ${response.statusText}`);
            }
            
            const locationArea: LocationArea = await response.json();
            this.cache.add(url, locationArea);
            return locationArea;
          } catch (error) {
            throw new Error(`Error fetching locations: ${(error as Error).message}`);
          }
    }

    // async fetchLocation(locationName: string): Promise<Location> {

    // }
}

export type LocationArea = {
    count: number;
    next: string;
    previous?: string;
    results: {
        name: string;
        url: string;
    }[];
};

export type Location = {

};