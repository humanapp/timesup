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
    body: {
      base: "text-black p-6 flex-1 overflow-auto",
    },
    content: {
      base: "relative h-auto w-full p-4",
    },
    header: {},
  },
};

export default theme;
