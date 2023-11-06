import { useContext } from "react";
import { AppStateContext } from "../state/AppStateContext";
import { setModal } from "../transforms/setModal";
import EnterPasskey from "./EnterPasskey";
import ForgetYou from "./ForgetYou";

const Render = () => {
  const { state, dispatch } = useContext(AppStateContext);

  const onClose = () => {
    setModal(undefined);
  };

  switch (state.modal) {
    case "enter-passkey": {
      return <EnterPasskey onClose={onClose} />;
    }
    case "forget-you": {
      return <ForgetYou onClose={onClose} />;
    }
  }

  return null;
};

export default Render;
