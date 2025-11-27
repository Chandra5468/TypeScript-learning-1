import { parentPort } from "worker_threads";

// Heavy CPU task: calculate nth Fibonacci
function fib(n: number): number {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}

parentPort?.on("message", (num: number) => {
  const result = fib(num);
  parentPort?.postMessage(result);
});
