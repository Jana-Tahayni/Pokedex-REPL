import type {State} from "./state.js";

export async function commandInspect (state:State, ...args:string[]){
    if (args.length === 0){
        console.log(`Usage: inspect <pokemon-name>`);
        return;
    }
    const pokemonName = args[0];
    const pokemon = state.pokedex[pokemonName];
    if (!pokemon){
        console.log (`You have not caught that pokemon`);
        return;
    }
    console.log (`Name: ${pokemon.name}`);
    console.log (`Height: ${pokemon.height}`);
    console.log (`Weight: ${pokemon.weight}`);
    console.log (`Stats:`);
    for (const info of pokemon.stats){
        console.log (`  -${info.stat.name}: ${info.base_stat}`);
    }
        
    console.log (`Types:`);
    for (const t of pokemon.types)
        console.log (`  - ${t.type.name}`);

}