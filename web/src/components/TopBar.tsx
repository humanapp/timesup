import { useContext } from "react";
import { AppStateContext } from "../state/AppStateContext";
import { Navbar, Dropdown } from "flowbite-react";

const Render = () => {
  const { state, dispatch } = useContext(AppStateContext);

  return (
    <Navbar
      fluid
      className=""
      style={{ background: "rgb(255, 255, 255, .25)" }}
    >
      <Navbar.Brand className="">
        <span className="text-lg font-bold">Times Up!</span>
      </Navbar.Brand>
      <div className="flex">
        <Dropdown arrowIcon={true} inline label={<span>Options</span>}>
          {!state.passkey && <Dropdown.Item>Sign In</Dropdown.Item>}
          {state.passkey && <Dropdown.Item>Sign Out</Dropdown.Item>}
        </Dropdown>
      </div>
    </Navbar>
  );
};

export default Render;
