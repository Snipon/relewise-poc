import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState
} from 'react';

export interface ModalType {
  visible: boolean;
  data: {
    title: string;
    content: string;
  };
}

const defaultValue = { visible: false, data: { title: '', content: '' } };

export const ModalContext = createContext<[ModalType, Dispatch<SetStateAction<ModalType>>]>([
  defaultValue,
  () => null
]);
const { Provider } = ModalContext;

/* eslint-disable */
function ModalProvider({ children }: PropsWithChildren<any>) {
  const [value, setValue] = useState(defaultValue);
  /* eslint-disable */
  return <Provider value={[value, setValue]}>{children}</Provider>;
}

export const useModal = () => useContext(ModalContext);

export default ModalProvider;
