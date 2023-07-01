export function forceBoolean(data: unknown) {
  switch (data) {
    case 'false':
      return false;
    case 'true':
      return true;
    default:
      return Boolean(data);
  }
}
