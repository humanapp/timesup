import { stateAndDispatch } from "../state";
import * as Actions from "../state/actions";
import { ModalType } from "../types";

export function setModal(modal: ModalType | undefined) {
  const { state, dispatch } = stateAndDispatch();
  dispatch(Actions.setModal(modal));
}
