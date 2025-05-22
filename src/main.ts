import { startREPL } from "./repl.js";
import { initState } from "./state.js";

async function main() {
    const state = initState(5 * 60 * 1000);
    await startREPL(state);
}

main();