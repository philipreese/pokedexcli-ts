export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";

    constructor() {}

    async fetchLocations(pageURL?: string): Promise<LocationArea> {
        const url = pageURL ?? `${PokeAPI.baseURL}/location-area`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error(`${response.status} ${response.statusText}`);
            }
        
            return await response.json();
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