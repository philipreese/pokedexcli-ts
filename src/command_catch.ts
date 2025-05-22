import { State } from "./state.js";


export async function commandCatch(state: State, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error("you must provide a pokemon name");
    }

    const pokemon = await state.pokeAPI.fetchPokemon(args[0]);
    console.log(`Throwing a Pokeball at ${pokemon.name}...`);
    
    const minExp = 36.0;
	const maxExp = 608.0;
	const minProb = 0.7;
	const maxProb = 0.05;
	const interpolationFactor = (pokemon.base_experience - minExp) / (maxExp - minExp)
	const catchProbability = minProb + (maxProb - minProb) * interpolationFactor
	
	if (Math.random() < catchProbability) {
        console.log(`${pokemon.name} was caught!`);
        console.log("You may now inspect it with the inspect command.");
        state.pokedex[pokemon.name] = pokemon;
    } else {
        console.log(`${pokemon.name} escaped!`);
    }
}