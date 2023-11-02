import { AppState } from "./state";
import { Action } from "./actions";
import * as storage from "../services/storage";

export default function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SET_PASSKEY": {
      storage.savePasskey(action.passkey);
      return {
        ...state,
        passkey: action.passkey,
      };
    }
  }
}
