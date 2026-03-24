export function waitUntil({ hour, minute, second = 0, ms = 0 }) {
  return new Promise((resolve) => {
    const timer = setInterval(() => {
      const now = new Date();

      if (
        now.getHours() === hour &&
        now.getMinutes() === minute &&
        now.getSeconds() === second &&
        now.getMilliseconds() >= ms
      ) {
        clearInterval(timer);
        resolve();
      }
    }, 1);
  });
}