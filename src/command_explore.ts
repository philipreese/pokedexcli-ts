import { State } from "./state.js";


export async function commandExplore(state: State, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error("you must provide a location name");
    }

    const location = await state.pokeAPI.fetchLocation(args[0]);
    console.log(`Exploring ${location.name}...`);
    console.log("Found Pokemon:");
    for (const encounter of location.pokemon_encounters) {
        console.log(` - ${encounter.pokemon.name}`);
    }
}