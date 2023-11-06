import * as React from "react";
import { Button, Modal } from "../elements";

type Props = React.PropsWithChildren & {
  onCancel: () => void;
  onConfirm: () => void;
  confirmDisabled?: boolean;
  headerText?: string;
  messageText?: string;
  messageJsx?: JSX.Element;
};

const Render: React.FC<Props> = ({
  onConfirm,
  onCancel,
  confirmDisabled,
  headerText,
  messageText,
  messageJsx,
  children,
}) => {
  return (
    <Modal show={true} dismissible={true} onClose={onCancel} position="center">
      {headerText && <Modal.Header>{headerText}</Modal.Header>}
      {(messageText || messageJsx || children) && (
        <Modal.Body>
          {messageJsx && messageJsx}
          {messageText && messageText}
          {children}
        </Modal.Body>
      )}
      <Modal.Footer>
        <Button color="primary" onClick={onConfirm} disabled={confirmDisabled}>
          {"OK"}
        </Button>
        <Button onClick={onCancel}>{"CANCEL"}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Render;
