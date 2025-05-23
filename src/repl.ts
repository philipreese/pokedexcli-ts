import { State } from "./state.js";

export async function startREPL(state: State) {
    state.readline.prompt();

    state.readline.on('line', async (input) => {
        const words = cleanInput(input);
        if (words.length === 0) {
            state.readline.prompt();
            return;
        }

        const commandWord = words[0];
        const args = words.slice(1);

        if (commandWord in state.commands) {
            try {
                await state.commands[commandWord].callback(state, ...args);
            } catch (err) {
                console.log((err as Error).message);
            }
        } else {
            console.log(`Unknown command: "${commandWord}". Type "help" for a list of commands.`);
        }

        state.readline.prompt();
    }); 
}

export function cleanInput(input: string): string[] {
    return input.trim().toLowerCase().split(" ").filter((i) => i !== "");
}