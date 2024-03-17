import { ButtonProps } from "antd/es/button/button";
import { ReactNode } from "react";

export interface ButtonProperties extends ButtonProps {
  action?: (
    modalDetails: IModalProps,
    setModalDetails: (modalDetails: IModalProps) => void
  ) => Promise<void>;
}

export interface IModalProps {
  title?: string;
  content?: string;
  customComponent?: () => ReactNode;
  customComponentName?: string;
  customComponentProps?: any;
  firstButton?: null | ButtonProperties;
  secondButton?: null | ButtonProperties;
  closable?: boolean;
}
