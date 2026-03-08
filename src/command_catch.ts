import type {State} from "./state.js";

export async function commandCatch (state:State, ...args:string[]) {
    if (args.length === 0){
        console.log (`Usage: catch <pokemon-name>`);
        return;
    }
    const pokemonName = args[0];
    console.log(`Throwing a Pokeball at ${pokemonName}...`);
    const pokemon = await state.pokeapi.fetchPokemon(pokemonName);
    const catchChance = Math.min (0.95, Math.max(0.1, 1 - pokemon.base_experience/600));
    const caught = Math.random() < catchChance;
    if (caught){
        console.log (`${pokemonName} was caught!`);
        console.log(`You may now inspect it with the inspect command.`);
        state.pokedex[pokemonName] = pokemon;
    }
    else
        console.log (`${pokemonName} escaped!`);


}   