export function verifyIfEmailIsDefined(obj: object) {
  return !!obj['email'] || !!obj['mail'] || !!obj['EMAIL'] || !!obj['Email'];
}
