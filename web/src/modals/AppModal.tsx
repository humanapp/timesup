import { useContext } from "react";
import { AppStateContext } from "../state/AppStateContext";
import { setModal } from "../transforms/setModal";
import EnterPasskey from "./EnterPasskey";

const Render = () => {
  const { state, dispatch } = useContext(AppStateContext);

  const onClose = () => {
    setModal(undefined);
  }

  switch (state.modal) {
    case "enter-passkey": {
      return <EnterPasskey onClose={onClose} />;
    }
  }

  return null;
}


export default Render;
