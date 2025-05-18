import { createInterface } from 'node:readline';
import { stdin, stdout } from 'node:process';
import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';
import { CLICommand } from './command.js';

export function getCommands(): Record<string, CLICommand> {
    return {
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        },
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
    }
}

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
            const commandWord = words[0];
            const commands = getCommands();
            if (commandWord in commands) {
                commands[commandWord].callback(commands);
            } else {
                console.log("Unknown command")
            }
        }
        rl.prompt();
    }); 
}

export function cleanInput(input: string): string[] {
    return input.trim().toLowerCase().split(" ").filter((i) => i !== "");
}