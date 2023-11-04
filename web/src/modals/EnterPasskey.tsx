import * as React from "react";
import { useContext, useRef, useState, useCallback } from "react";
import { AppStateContext } from "../state/AppStateContext";
import { Button, Label, Modal, TextInput } from "../elements";
import { setPasskey } from "../transforms/setPasskey";

type Props = {
  onClose: () => void;
};

const Render: React.FC<Props> = ({ onClose }) => {
  const { state, dispatch } = useContext(AppStateContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const [passkeyValue, setPasskeyValue] = useState<string>("");

  const passkeyChanged = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (passkeyValue !== ev.target.value) {
      const upr = ev.target.value.toUpperCase();
      setPasskeyValue(upr);
      if (inputRef.current) inputRef.current.value = upr;
    }
  };

  const okClicked = useCallback(() => {
    setPasskey(passkeyValue);
    onClose();
  }, [passkeyValue]);

  return (
    <Modal
      show={true}
      dismissible={true}
      onClose={onClose}
      position="center"
      initialFocus={inputRef}
    >
      <Modal.Header>PASSKEY</Modal.Header>
      <Modal.Body>
        <Label htmlFor="passkey">Enter the value</Label>
        <TextInput
          type="text"
          id="passkey"
          ref={inputRef}
          sizing="sm"
          onChange={passkeyChanged}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button color="primary" onClick={okClicked} disabled={!inputRef.current?.value}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Render;
