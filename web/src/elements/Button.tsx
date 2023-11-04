import * as React from "react";
import { Button as FButton, ButtonProps as FButtonProps } from "flowbite-react";
import theme from "../theme";

const Button: React.FC<FButtonProps> = (props) => {
  return <FButton {...props} theme={theme.button}>{props.children}</FButton>;
};

export { Button };
