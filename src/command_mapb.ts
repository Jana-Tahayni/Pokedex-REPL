import type {State} from "./state.js";

export async function commandMapb (state:State){
    if (state.prevLocationsURL === null){
        console.log (`you are on the first page`); 
        return; 
    }
    const data = await state.pokeapi.fetchLocations(state.prevLocationsURL);
    state.nextLocationsURL = data.next; 
    state.prevLocationsURL = data.previous;

    for (const location of data.results)
        console.log (location.name);
}