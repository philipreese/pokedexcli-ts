import { State } from "./state.js";


export async function commandMap(state: State) {
    const locationArea = await state.pokeAPI.fetchLocations(state.nextLocationsURL);
    state.nextLocationsURL = locationArea.next;
    state.prevLocationsURL = locationArea.previous;
    
    for (const location of locationArea.results) {
        console.log(location.name);
    }
}

export async function commandMapBack(state: State) {
    if (!state.prevLocationsURL) {
        throw new Error("you're on the first page");
    }
    
    const locationArea = await state.pokeAPI.fetchLocations(state.prevLocationsURL);
    state.nextLocationsURL = locationArea.next;
    state.prevLocationsURL = locationArea.previous;
    
    for (const location of locationArea.results) {
        console.log(location.name);
    }
}