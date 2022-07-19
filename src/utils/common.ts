export function log(message: any, optionalParams?: any[]) {
  // if production disable console logs
  if (process.env.NODE_ENV !== 'development') return;

  if (window !== undefined) {
    window.console.log(message, optionalParams);
    return;
  }

  throw new Error('Custom console log error');
}

export function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
