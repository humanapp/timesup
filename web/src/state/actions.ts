type ActionBase = {
  type: string;
};

/**
 * Actions
 */

type SetPasskey = ActionBase & {
  type: "SET_PASSKEY";
  passkey: string;
};

export type Action = SetPasskey;

/**
 * Action creators
 */

export const setPasskey = (passkey: string): SetPasskey => ({
  type: "SET_PASSKEY",
  passkey,
});
