import * as React from "react";
import { Modal as FModal, ModalProps as FModalProps } from "flowbite-react";
import {
  ModalHeader as FModalHeader,
  ModalHeaderProps as FModalHeaderProps,
} from "flowbite-react/lib/esm/components/Modal/ModalHeader";
import {
  ModalBody as FModalBody,
  ModalBodyProps as FModalBodyProps,
} from "flowbite-react/lib/esm/components/Modal/ModalBody";
import {
  ModalFooter as FModalFooter,
  ModalFooterProps as FModalFooterProps,
} from "flowbite-react/lib/esm/components/Modal/ModalFooter";
import theme from "../theme";

type SubComponents = {
  Header: React.FC<FModalHeaderProps>;
  Body: React.FC<FModalBodyProps>;
  Footer: React.FC<FModalFooterProps>;
};

const Header: React.FC<FModalHeaderProps> = (props) => {
  return (
    <FModalHeader {...props} theme={theme.modal?.header}>
      {props.children}
    </FModalHeader>
  );
};

const Body: React.FC<FModalBodyProps> = (props) => {
  return (
    <FModalBody {...props} theme={theme.modal?.body}>
      {props.children}
    </FModalBody>
  );
};
const Footer: React.FC<FModalFooterProps> = (props) => {
  return (
    <FModalFooter {...props} theme={theme.modal?.footer}>
      {props.children}
    </FModalFooter>
  );
};

const Modal: React.FC<FModalProps> & SubComponents = (props) => {
  return (
    <FModal {...props} theme={theme.modal}>
      {props.children}
    </FModal>
  );
};
Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export { Modal };
