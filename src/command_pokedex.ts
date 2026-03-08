import type {State} from "./state.js";

export async function commandPokedex (state:State) {
    const caughtPokemons = Object.keys(state.pokedex);
    if (caughtPokemons.length === 0){
        console.log (`You have not caught any Pokemon untl now!`);
        return;
    }
    console.log (`Your Pokedex:`);
    for (const pokemon of caughtPokemons)
        console.log (` - ${pokemon}`);

}