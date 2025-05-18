import { createInterface } from 'node:readline';
import { stdin, stdout } from 'node:process';

export function startREPL() {
    const rl = createInterface({
        input: stdin,
        output: stdout,
        prompt: "Pokedex > "
    });

    rl.prompt();

    rl.on('line', (input) => {
        const words = cleanInput(input);
        if (words.length > 0) {
            console.log(`Your command was: ${words[0]}`);
        }
        rl.prompt();
    }); 
}

export function cleanInput(input: string): string[] {
    return input.trim().toLowerCase().split(" ").filter((i) => i !== "");
}