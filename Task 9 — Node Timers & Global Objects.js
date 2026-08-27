// Task 9: Node Timers & Global Objects

let remaining = 5;

console.log(`Time left: ${remaining} seconds`);

const interval = setInterval(() => {
    remaining--;

    console.log(`Time left: ${remaining} seconds`);

    if (remaining === 0) {
        clearInterval(interval);

        setTimeout(() => {
            console.log("Time's up!");
        }, 0);
    }
}, 1000);
