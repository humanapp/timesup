import { nanoid } from "nanoid";

const KEY_PASSKEY = "timesup/passkey";

function getValue(key: string, defaultValue?: string): string | undefined {
  return localStorage.getItem(key) || defaultValue;
}

function setValue(key: string, val: string) {
  localStorage.setItem(key, val);
}

function delValue(key: string) {
  localStorage.removeItem(key);
}

function getJsonValue<T>(key: string, defaultValue?: T): T | undefined {
  var value = getValue(key);
  if (value) {
    return JSON.parse(value);
  }
  return defaultValue;
}

function setJsonValue(key: string, val: any) {
  setValue(key, JSON.stringify(val));
}

export function loadPasskey(): string | undefined {
  return getValue(KEY_PASSKEY);
}

export function savePasskey(passkey: string) {
  setValue(KEY_PASSKEY, passkey);
}
