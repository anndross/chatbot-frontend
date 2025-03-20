import { useState } from "react";

type Timer = ReturnType<typeof setTimeout>;

/**
 *
 * @param func The original, non debounced function (You can pass any number of args to it)
 * @param delay The delay (in ms) for the function to return
 * @returns The debounced function, which will run only if the debounced function has not been called in the last (delay) ms
 */
export function useDebounce<T extends unknown[]>(
  func: (...args: T) => void,
  delay = 1000
) {
  const [timer, setTimer] = useState<Timer>();

  const debouncedFunction = (...args: T) => {
    clearTimeout(timer);
    const newTimer = setTimeout(() => func(...args), delay);
    setTimer(newTimer);
  };

  return debouncedFunction;
}
