import * as React from "react";
import { useRef, useState, useCallback } from "react";
import { Label, TextInput } from "../elements";
import { setPasskey } from "../transforms/setPasskey";
import Confirm from "./Confirm";

type Props = {
  onClose: () => void;
};

const Render: React.FC<Props> = ({ onClose }) => {
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
    <Confirm onCancel={onClose} onConfirm={okClicked} headerText={"Sign in"} confirmDisabled={!passkeyValue}>
      <Label htmlFor="passkey">Enter account name</Label>
      <TextInput
        type="text"
        id="passkey"
        ref={inputRef}
        sizing="sm"
        onChange={passkeyChanged}
      />
    </Confirm>
  );
};

export default Render;
