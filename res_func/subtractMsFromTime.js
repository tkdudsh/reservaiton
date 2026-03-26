export function subtractMsFromTime({ hour, minute, second = 0, ms = 0 }, subtractMs) {
  const base = new Date();
  base.setHours(hour, minute, second, ms);

  const result = new Date(base.getTime() - subtractMs);

  return {
    hour: result.getHours(),
    minute: result.getMinutes(),
    second: result.getSeconds(),
    ms: result.getMilliseconds(),
  };
}