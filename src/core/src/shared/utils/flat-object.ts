export function flatObject(obj: object): object {
  const result = {};

  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      const flattened = flatObject(obj[key]);
      for (const subKey in flattened) {
        result[key + '.' + subKey] = flattened[subKey];
      }
    } else {
      result[key] = obj[key];
    }
  }

  return result;
}
