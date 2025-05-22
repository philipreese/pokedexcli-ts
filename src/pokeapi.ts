import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private cache: Cache;

    constructor(cacheInterval: number) {
        this.cache = new Cache(cacheInterval);
    }

    async fetchLocations(pageURL?: string): Promise<LocationArea> {
        const url = pageURL ?? `${PokeAPI.baseURL}/location-area`;
        const cachedResponse = this.cache.get<LocationArea>(url);
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
        const cachedResponse = this.cache.get<Location>(url);
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

    async fetchPokemon(pokemonName: string): Promise<Pokemon> {
        const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
        const cachedResponse = this.cache.get<Pokemon>(url);
        if (cachedResponse) {
            return cachedResponse;
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

            const pokemon: Pokemon = await response.json();
            this.cache.add(url, pokemon);
            return pokemon;
        } catch (error) {
            throw new Error(`Error fetching pokemon: ${(error as Error).message}`);
        }
    }
}

export type LocationArea = {
    count: number;
    next: string;
    previous?: string;
    results: NamedAPIResource[];
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

export type Pokemon = {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: PokemonAbility[];
    forms: NamedAPIResource[];
    game_indices: VersionGameIndex[];
    held_items: PokemonHeldItem[];
    location_area_encounters: string;
    moves: PokemonMove[];
    past_types: PokemonTypePast[];
    past_abilities: PokemonAbilityPast[];
    sprites: PokemonSprites;
    cries: PokemonCries;
    species: NamedAPIResource;
    stats: PokemonStat[]
    types: PokemonType[]
  }
  
  type PokemonAbility = {
    is_hidden: boolean;
    slot: number;
    ability: NamedAPIResource;
  }

  type VersionGameIndex = {
    game_index: number;
    version: NamedAPIResource;
  }

  type PokemonHeldItem = {
    item: NamedAPIResource;
    version_details: PokemonHeldItemVersion[];
  }

  type PokemonHeldItemVersion = {
    version: NamedAPIResource;
    rarity: number;
  }

  type PokemonMove = {
    move: NamedAPIResource;
    version_group_details: PokemonMoveVersion[];
  }

  type PokemonMoveVersion = {
    move_learn_method: NamedAPIResource;
    version_group: NamedAPIResource;
    level_learned_at: number;
    order: number;
  }

  type PokemonTypePast = {
    generation: NamedAPIResource;
    types: PokemonType[];
  }

  type PokemonType = {
    slot: number;
    type: NamedAPIResource;
  }

  type PokemonAbilityPast = {
    generation: NamedAPIResource;
    abilities: PokemonAbility[];
  }

  type PokemonSprites = {
    front_default: string;
    front_shiny: string;
    front_female: string;
    front_shiny_female: string;
    back_default: string;
    back_shiny: string;
    back_female: string;
    back_shiny_female: string;
  }

  type PokemonCries = {
    latest: string;
    legacy: string;
  }

  type PokemonStat = {
    stat: NamedAPIResource;
    effort: number;
    base_stat: number;
  }