// Task 10: JavaScript Promises

function checkTimeLeftPromise(seconds) {
    return new Promise((resolve, reject) => {
        if (seconds < 0) {
            reject(new Error("Duration cannot be negative"));
            return;
        }

        setTimeout(() => {
            resolve(seconds);
        }, 1000);
    });
}

checkTimeLeftPromise(5)
    .then((remaining) => {
        console.log("Time remaining:", remaining, "seconds");
    })
    .catch((error) => {
        console.log("Error:", error.message);
    });
