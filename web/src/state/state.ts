import { ModalType } from "../types";
import * as storage from "../services/storage";

export type AppState = {
  passkey?: string;
  modal?: ModalType | undefined;
};

export const initialAppState: AppState = {
  passkey: storage.loadPasskey(),
};
