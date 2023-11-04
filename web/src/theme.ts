import { CustomFlowbiteTheme } from "flowbite-react";

const theme: CustomFlowbiteTheme = {
  button: {
    color: {
      primary: "bg-red-500 hover:bg-red-600",
    },
  },
  modal: {
    root: {},
    body: {},
    content: {
      base: "relative h-auto w-full p-4",
    },
    header: {},
  },
};

export default theme;
