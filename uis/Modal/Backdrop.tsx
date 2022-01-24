import { motion } from 'framer-motion';
import { ReactNode } from 'react';

import styles from './Modal.module.scss';

type BackdropProps = {
  children: ReactNode;
  onClick: () => void;
};

const Backdrop = (props: BackdropProps) => {
  const { children, onClick } = props;

  return (
    <motion.div
      onClick={onClick}
      className={styles.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
