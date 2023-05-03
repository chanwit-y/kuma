import { ComponentType, ReactNode } from 'react';

type Props = {
  Modal: ComponentType<any & { children: ReactNode }>;
  title: string;
  open: boolean;
  handleClose: () => void;
  component: JSX.Element;
  footerComponent?: React.ReactNode;
  paddingClass?: string;
  width?: number;
  maxHeight?: number;
  titleLine?: boolean;
};

export const DisplayModal = ({
  Modal,
  title,
  open,
  handleClose,
  component,
  width,
  maxHeight = 500,
  footerComponent,
  titleLine,
}: Props) => {
  return (
    <Modal
      title={title}
      open={open}
      handleClose={handleClose}
      width={width}
      footerComponent={footerComponent}
      titleLine={titleLine}
      maxHeight={maxHeight}
    >
      {component}
    </Modal>
  );
};
