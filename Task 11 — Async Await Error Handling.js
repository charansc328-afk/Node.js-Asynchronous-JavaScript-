// Task 11: Try/Catch Error Handling & Async-Await

function checkTimeLeftPromise(seconds) {
    return new Promise((resolve, reject) => {
        if (seconds < 0) {
            reject(new Error("Duration cannot be negative"));
        } else {
            setTimeout(() => {
                resolve(seconds);
            }, 1000);
        }
    });
}

async function runCountdownAsync(seconds) {
    try {
        const remaining = await checkTimeLeftPromise(seconds);

        console.log("Time remaining:", remaining, "seconds");
    } catch (error) {
        console.log("Caught error:", error.message);
    }
}

// Invalid negative duration to demonstrate catch.
runCountdownAsync(-5);
