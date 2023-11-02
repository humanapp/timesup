import * as storage from "../services/storage";

export type AppState = {
  passkey?: string;
};

export const initialAppState: AppState = {
  passkey: storage.loadPasskey(),
};
