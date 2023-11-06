import Confirm from "./Confirm";
import { setPasskey } from "../transforms/setPasskey";

type Props = {
  onClose: () => void;
};

const Render: React.FC<Props> = ({ onClose }) => {
  const onConfirm = () => {
    setPasskey("");
    onClose();
  };
  return (
    <Confirm
      onCancel={onClose}
      onConfirm={onConfirm}
      messageText={"Forget you?"}
      headerText={"Sign out"}
    />
  );
};

export default Render;
