import { stateAndDispatch } from "../state";
import * as Actions from "../state/actions";

export function setPasskey(passkey: string) {
  const { state, dispatch } = stateAndDispatch();
  dispatch(Actions.setPasskey(passkey));
}
