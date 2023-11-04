import * as React from "react";
import { Label as FLabel, LabelProps as FLabelProps } from "flowbite-react";
import theme from "../theme";

const Label: React.FC<FLabelProps> = (props) => {
  return <FLabel {...props} theme={theme.label}>{props.children}</FLabel>;
};

export { Label };
