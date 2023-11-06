import { ModalType } from "../types";

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

type SetModal = ActionBase & {
  type: "SET_MODAL";
  modal: ModalType | undefined;
};

export type Action = SetPasskey | SetModal;

/**
 * Action creators
 */

export const setPasskey = (passkey: string): SetPasskey => ({
  type: "SET_PASSKEY",
  passkey,
});

export const setModal = (modal: ModalType | undefined): SetModal => ({
  type: "SET_MODAL",
  modal,
});
