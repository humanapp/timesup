import * as React from "react";
import { useContext } from "react";
import { AppStateContext } from "../state/AppStateContext";
import { Button, Label, Modal, TextInput } from "../elements";
import { setPasskey } from "../transforms/setPasskey";

type Props = {
  onClose: () => void;
};

const Render: React.FC<Props> = ({ onClose }) => {
  const { state, dispatch } = useContext(AppStateContext);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const okClicked = () => {
    setPasskey("hi");
    onClose();
  };

  return (
    <Modal show={true} dismissible={true} onClose={onClose} position="center" initialFocus={inputRef}>
      <Modal.Header>PASSKEY</Modal.Header>
      <Modal.Body>
        <Label htmlFor="passkey-field">Enter the value</Label>
        <TextInput type="text" id="passkey-field" ref={inputRef} />
      </Modal.Body>
      <Modal.Footer>
        <Button color="primary" onClick={okClicked}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Render;
