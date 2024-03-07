

export function timeoutPromise( message:string,ms:number=5000) {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(message));
      }, ms);
    });
  }

  
export function _debounce(fn: any, delay: number) {
    let debounceTimer: number | undefined;
    return function (...args: any) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => fn(...args), delay);
    };
  }
  