import type { State } from "./state.js";

export async function commandHelp (state:State){
    console.log (`Welcome to the Pokedex!`);
    console.log (`Usage:\n`);

    for (const command in state.commands){
        const cmd = state.commands[command];
        console.log (`${cmd.name}: ${cmd.description}`);
    }

    console.log (``);
};