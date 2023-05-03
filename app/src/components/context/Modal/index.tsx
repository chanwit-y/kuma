import {
  ComponentType,
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from 'react';
import { DisplayModal } from './DisplayModal';

type ModalContextType = {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setTitleModal: Dispatch<SetStateAction<string>>;
  displayModal: (
    title: string,
    open: boolean,
    component: JSX.Element,
    width?: number,
    footerComponent?: React.ReactNode,
    titleLine?: boolean,
    maxHieght?: number
  ) => void;
};
const ModalContext = createContext<ModalContextType>({} as ModalContextType);

type Props = {
  children: ReactNode;
  Modal: ComponentType<any> | FC<any>;
};
const ModalProvider = ({ children, Modal }: Props) => {
  const [titleModal, setTitleModal] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [titleLine, setTitleLine] = useState<boolean>();
  const [component, setComponent] = useState<JSX.Element>(<></>);
  const [footerComponent, setFooterComponent] = useState<React.ReactNode>(null);
  const [widthModal, setWidthModal] = useState(0);
  const [maxHieght, setMaxHieght] = useState(0);

  const displayModal = useCallback(
    (
      title: string,
      open: boolean,
      component: JSX.Element,
      width?: number,
      footerComponent?: React.ReactNode,
      titleLine?: boolean,
      maxHieght?: number,
    ) => {
      setTitleModal(title);
      setOpenModal(open);
      setComponent(component);
      setWidthModal(width || 600);
      setMaxHieght(maxHieght || 500);
      setFooterComponent(footerComponent);
      setTitleLine(titleLine);
    },
    []
  );

  const handleClose = useCallback(() => {
    setOpenModal(false);
  }, []);

  return (
    <ModalContext.Provider
      value={{ displayModal, setOpenModal, setTitleModal }}
    >
      <DisplayModal
        Modal={Modal}
        title={titleModal}
        open={openModal}
        handleClose={handleClose}
        component={component}
        width={widthModal}
        footerComponent={footerComponent}
        titleLine={titleLine}
        maxHeight={maxHieght}
      />
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
export default ModalProvider;
