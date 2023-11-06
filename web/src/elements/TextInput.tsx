import * as React from "react";
import { forwardRef } from "react";
import {
  TextInput as FTextInput,
  TextInputProps as FTextInputProps,
} from "flowbite-react";
import theme from "../theme";

const TextInput = forwardRef<HTMLInputElement, FTextInputProps>(
  (props, ref) => {
    return (
      <FTextInput {...props} ref={ref} theme={theme.textInput}>
        {props.children}
      </FTextInput>
    );
  }
);

export { TextInput };
