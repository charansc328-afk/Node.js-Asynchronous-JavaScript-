// Task 5: Node Process Object, Command Line & Terminal I/O

const readline = require("readline");

// Get countdown duration from the command-line argument.
const seconds = Number(process.argv[2]);

if (!Number.isInteger(seconds) || seconds < 0) {
    console.log("Please provide a non-negative number of seconds.");
    process.exit(1);
}

let remaining = seconds;

console.log(`Countdown started: ${remaining} seconds`);
console.log('Type "cancel" and press Enter to stop the countdown.');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Listen for terminal input.
rl.on("line", (input) => {
    if (input.trim().toLowerCase() === "cancel") {
        clearInterval(timer);
        console.log("Countdown cancelled");
        rl.close();
        process.exit(0);
    }
});

// Start the countdown.
const timer = setInterval(() => {
    console.log(`Time left: ${remaining} seconds`);

    if (remaining === 0) {
        clearInterval(timer);
        rl.close();
        process.exit(0);
    }

    remaining--;
}, 1000);
