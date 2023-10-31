import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 4);

export function uniqueId(size = 4): string {
  return nanoid(size);
}
