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

    async fetchLocation(locationName: string): Promise<Location> {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
        let cachedResponse = this.cache.get<Location>(url);
        if (cachedResponse) {
            return cachedResponse;
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error(`${response.status} ${response.statusText}`);
            }
            
            const location: Location = await response.json();
            this.cache.add(url, location);
            return location;
          } catch (error) {
            throw new Error(`Error fetching location: ${(error as Error).message}`);
          }
    }
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

type Location = {
    id: number;
    name: string;
    game_index: number;
    encounter_method_rates: EncounterMethodRate[];
    location: NamedAPIResource;
    names: Name[];
    pokemon_encounters: PokemonEncounter[];
  }
  
type EncounterMethodRate = {
    encounter_method: NamedAPIResource;
    version_details: EncounterVersionDetails[];
}

type NamedAPIResource = {
    name: string;
    url: string;
}
  
type EncounterVersionDetails = {
    rate: number;
    version: NamedAPIResource;
}

type Name = {
    name: string;
    language: NamedAPIResource;
}
  
  
type PokemonEncounter = {
    pokemon: NamedAPIResource;
    version_details: VersionEncounterDetail[];
}
  
type VersionEncounterDetail = {
    version: NamedAPIResource;
    max_chance: number;
    encounter_details: Encounter[];
}
  
type Encounter = {
    min_level: number;
    max_level: number;
    condition_values: NamedAPIResource[];
    chance: number;
    method: NamedAPIResource;
}
  