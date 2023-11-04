import * as React from "react";
import { TextInput as FTextInput, TextInputProps as FTextInputProps } from "flowbite-react";
import theme from "../theme";

type OptionalRef = {
  ref?: React.Ref<HTMLInputElement> 
};

const TextInput: React.FC<FTextInputProps & OptionalRef> = (props) => {
  return <FTextInput {...props} ref={props.ref}  theme={theme.textInput}>{props.children}</FTextInput>;
};

export { TextInput };
