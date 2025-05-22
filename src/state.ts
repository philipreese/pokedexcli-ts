import { stdin, stdout } from "process";
import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI, type Pokemon } from "./pokeapi.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
}

export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
    pokeAPI: PokeAPI;
    pokedex: Record<string, Pokemon>;
    nextLocationsURL?: string;
    prevLocationsURL?: string;
}

export function initState(cacheInterval: number): State {
    const rl = createInterface({
        input: stdin,
        output: stdout,
        prompt: "Pokedex > "
    });

    return {
        readline: rl,
        commands: getCommands(),
        pokeAPI: new PokeAPI(cacheInterval),
        pokedex: {},
    };
}