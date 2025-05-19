import { State } from "./state.js";

export function startREPL(state: State) {
    state.readline.prompt();

    state.readline.on('line', (input) => {
        const words = cleanInput(input);
        if (words.length === 0) {
            state.readline.prompt();
            return;
        }

        const commandWord = words[0];
        if (commandWord in state.commands) {
            state.commands[commandWord].callback(state);
        } else {
            console.log(`Unknown command: "${commandWord}". Type "help" for a list of commands.`);
        }
        
        state.readline.prompt();
    }); 
}

export function cleanInput(input: string): string[] {
    return input.trim().toLowerCase().split(" ").filter((i) => i !== "");
}