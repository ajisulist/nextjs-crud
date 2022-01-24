import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import NoSSR from 'react-no-ssr';

import Text from '../Text/Text';
import Backdrop from './Backdrop';
import Flexbox from '../Flexbox/Flexbox';

import styles from './Modal.module.scss';

const slideUpDown = {
  hidden: {
    y: '100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
  },
  exit: {
    y: '100vh',
    opacity: 0,
  },
};

type ModalProps = {
  isVisible: boolean;
  title: string;
  handleClose: () => void;
  children: ReactNode;
};

const ModalPortal = (props: ModalProps) => {
  const { handleClose, title, isVisible, children } = props;
  return createPortal(
    <AnimatePresence initial={false} exitBeforeEnter={true} onExitComplete={() => null}>
      {isVisible && (
        <Backdrop onClick={handleClose}>
          <motion.div
            onClick={e => e.stopPropagation()}
            className={styles.modal}
            variants={slideUpDown}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Flexbox classNames={styles.modalContent} flexDirection="column">
              <Flexbox classNames={styles.modalTitle}>
                <Text weight="light" size="xl" text={title} />
              </Flexbox>
              {children}
            </Flexbox>
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>,
    window.document.body
  );
};

const Modal = (props: ModalProps) => {
  return (
    <NoSSR>
      <ModalPortal {...props} />
    </NoSSR>
  );
};
export default Modal;
