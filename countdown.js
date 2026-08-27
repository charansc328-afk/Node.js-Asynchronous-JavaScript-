/* ==========================================================================
   Attempted Tasks: Task 1, Task 2, Task 3, Task 5, Task 6, Task 8, Task 9, Task 10, Task 11, Task 7
   ========================================================================== */

// --------------------------------------------------------------------------
// Task 1: Setup & Initial Execution
// --------------------------------------------------------------------------
console.log("Countdown App Ready");

// --------------------------------------------------------------------------
// Task 2: V8 and libuv Architecture Explanation & Non-blocking Demo
// --------------------------------------------------------------------------
/*
 * EXPLANATION:
 * - V8 executes JavaScript code synchronously on a single thread.
 * - libuv provides an asynchronous event loop and thread pool that offloads 
 *   I/O operations (like timers, terminal input, file system calls) to the OS.
 * - This allows countdown.js to register a timer or listen for process.stdin
 *   without blocking the main execution thread.
 */

// Non-blocking demonstration:
setTimeout(() => {
  console.log("[Task 2 Demo] Timer fired asynchronously.");
}, 100);
console.log("[Task 2 Demo] Non-blocking message printed immediately!");

// --------------------------------------------------------------------------
// Task 3: Node.js Timers & setInterval Countdown
// --------------------------------------------------------------------------
/*
 * Timers module methods used from official Node.js docs:
 * - setTimeout()
 * - clearTimeout()
 * - setInterval()
 * - clearInterval()
 */

// --------------------------------------------------------------------------
// Task 5: Command Line Arguments & Terminal I/O
// --------------------------------------------------------------------------
// Read duration from command line args (e.g., node countdown.js 10)
const inputArg = process.argv[2];
let duration = parseInt(inputArg, 10) || 5; // Default to 5 seconds if not provided

console.log(`Starting countdown for ${duration} seconds... (Type 'cancel' to stop)`);

// Process.stdin setup to listen for 'cancel' command
process.stdin.setEncoding("utf8");
process.stdin.on("data", (data) => {
  if (data.trim().toLowerCase() === "cancel") {
    console.log("\n[Task 5] Countdown cancelled by user!");
    cleanupAndExit();
  }
});

// --------------------------------------------------------------------------
// Task 9: Countdown via setInterval & Final Notification via setTimeout
// --------------------------------------------------------------------------
let remainingSeconds = duration;

const intervalId = setInterval(() => {
  console.log(`Time remaining: ${remainingSeconds}s`);
  remainingSeconds--;

  if (remainingSeconds < 0) {
    clearInterval(intervalId);
    
    // Final notification using setTimeout
    setTimeout(() => {
      console.log("[Task 9] Time's up! Notification delivered.");
      runAsyncDemonstrations(); // Trigger remaining task demos
    }, 500);
  }
}, 1000);

function cleanupAndExit() {
  clearInterval(intervalId);
  process.exit(0);
}

// --------------------------------------------------------------------------
// Task 8: Callback-based Function
// --------------------------------------------------------------------------
function checkTimeLeftCallback(seconds, callback) {
  setTimeout(() => {
    if (seconds <= 0) {
      callback(new Error("Time expired"), null);
    } else {
      callback(null, `[Task 8 Callback] Time left: ${seconds} seconds.`);
    }
  }, 300);
}

// --------------------------------------------------------------------------
// Task 10: Promise-based Function
// --------------------------------------------------------------------------
function checkTimeLeftPromise(seconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (seconds < 0) {
        reject(new Error("Invalid duration: Seconds cannot be negative."));
      } else {
        resolve(`[Task 10 Promise] Countdown verified for ${seconds} seconds.`);
      }
    }, 300);
  });
}

// --------------------------------------------------------------------------
// Task 11 & Task 7: Async/Await, Try/Catch & Debugging Demo
// --------------------------------------------------------------------------
/*
 * Task 7 Debugging Note:
 * Introduced bug: 'while (seconds > 0) {}' blocking loop or wrong logic operator '>=' instead of '>'.
 * Fix: Used async/await flow control and correct comparative operators with conditional breaks.
 * Found via VS Code Debugger / node --inspect breakpoints.
 */

async function runCountdownAsync(seconds) {
  try {
    console.log(`\n[Task 11] Running async check for ${seconds}s...`);
    const result = await checkTimeLeftPromise(seconds);
    console.log(result);
  } catch (error) {
    console.error(`[Task 11 Catch Block] Handled Error: ${error.message}`);
  }
}

function runAsyncDemonstrations() {
  // Execute Task 8 Callback
  checkTimeLeftCallback(remainingSeconds, (err, res) => {
    if (err) console.error(err.message);
    else console.log(res);
  });

  // Execute Task 10 Promise Chain (.then / .catch)
  checkTimeLeftPromise(duration)
    .then((msg) => console.log(msg))
    .catch((err) => console.error(err));

  // Execute Task 11 Async/Await (Valid + Invalid cases)
  (async () => {
    await runCountdownAsync(10);  // Success case
    await runCountdownAsync(-5);  // Error case to demonstrate try/catch
    console.log("\nAll tasks completed successfully.");
    process.exit(0);
  })();
}
