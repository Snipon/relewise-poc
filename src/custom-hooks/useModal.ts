import { useContext } from 'react';
import { ModalContext } from '../providers/ModalProvider';

function useModal() {
  return useContext(ModalContext);
}

export default useModal;
