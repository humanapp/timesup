import { useContext } from "react";
import { AppStateContext } from "./state/AppStateContext";
import Background from "./components/Background";
import TopBar from "./components/TopBar";
import AppModal from "./modals/AppModal";

export const App = () => {
  const { state, dispatch } = useContext(AppStateContext);

  return (
    <>
      <Background />
      <TopBar />
      <AppModal />
    </>
  );
};
