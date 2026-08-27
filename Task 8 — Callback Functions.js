// Task 8: Asynchronous Programming & Callback Functions

function checkTimeLeftCallback(seconds, callback) {
    setTimeout(() => {
        callback(null, seconds);
    }, 1000);
}

checkTimeLeftCallback(5, (error, remaining) => {
    if (error) {
        console.log("Error:", error.message);
    } else {
        console.log("Time remaining:", remaining, "seconds");
    }
});
