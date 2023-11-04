import { CustomFlowbiteTheme } from "flowbite-react";

const theme: CustomFlowbiteTheme = {
  button: {
    color: {
      primary: "bg-violet-500 hover:bg-violet-600",
      info: "bg-slate-500 hover:bg-slate-600",
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
