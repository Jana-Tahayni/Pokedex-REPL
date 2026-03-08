import * as readline from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import type { State } from "./state.js";

export function cleanInput(input: string): string[] {
  let result : string[] = [];
  input = input.toLowerCase().trim();
  result = input.split(/\s+/); 
  return result;
}


export function startREPL (state:State) {

  state.readLine.prompt();
  // strat listening to user (READ / R from REPL)
  state.readLine.on("line", async (input:string) => {
    const result = cleanInput (input);

    // Evaluating (E from REPL)
    if (result.length === 0 || result[0] === "") {
      state.readLine.prompt();
      return; 
    }
    // update from lesson 5-ch1: check if the entered word was a command
    const commandName = result[0];
    const args = result.slice(1);
    const command = state.commands[commandName];
    if (command){
      try{
        await command.callback(state, ...args);
      } catch (err){
        console.log(`Error: ${err}`);
      }
    }
    else{
      console.log (`Unknown command`);
    }

    // Print (P from REPL)
    // console.log (`Your command was: ${result[0]}`);

    // Loop (L from REPL)
    state.readLine.prompt();
  });
  
  
}