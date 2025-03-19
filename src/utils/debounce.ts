export function debounce(func: any, delay: number = 500) {
  let timeoutId: any;

  return function (...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
