import * as React from "react";
import { useState } from "react";
import { setPasskey } from "../transforms/setPasskey";

const Render = () => {
  const [passkeyValue, setPasskeyValue] = useState<string>("");

  const textChanged = (e: React.FormEvent<HTMLInputElement>) => {
    setPasskeyValue(e.currentTarget.value);
  };

  const submitClicked = (e: React.FormEvent<HTMLButtonElement>) => {
    if (passkeyValue) {
      setPasskey(passkeyValue);
    }
  };

  return (
    <>
      <div>Enter the passkey</div>
      <form>
        <input type="text" onChange={textChanged} />
      </form>
      <button onClick={submitClicked}>Submit</button>
    </>
  );
};

export default Render;
