import { useContext } from "react";
import { AppStateContext } from "../state/AppStateContext";
import { Navbar, Dropdown } from "flowbite-react";
import { setModal } from "../transforms/setModal";
import { setPasskey } from "../transforms/setPasskey";

const Render = () => {
  const { state, dispatch } = useContext(AppStateContext);

  const signinClicked = () => {
    setModal("enter-passkey");
  };

  const signoutClicked = () => {
    setModal("forget-you");
  };

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
          {!state.passkey && (
            <Dropdown.Item onClick={signinClicked}>Sign In</Dropdown.Item>
          )}
          {state.passkey && (
            <Dropdown.Item onClick={signoutClicked}>Sign Out</Dropdown.Item>
          )}
        </Dropdown>
      </div>
    </Navbar>
  );
};

export default Render;
