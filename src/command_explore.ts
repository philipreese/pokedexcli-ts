import { State } from "./state.js";


export async function commandExplore(state: State, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error("you must provide a location name");
    }

    const locationArea = await state.pokeAPI.fetchLocation(args[0]);
    console.log(`Exploring ${locationArea.name}...`);
    console.log("Found Pokemon:");
    for (const encounter of locationArea.pokemon_encounters) {
        console.log(` - ${encounter.pokemon.name}`);
    }
}