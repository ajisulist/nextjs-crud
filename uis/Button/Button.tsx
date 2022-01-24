import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

import cx from 'classnames';

import Flexbox from '../Flexbox/Flexbox';
import Spinner from './Spinner';
import styles from './Button.module.scss';

type Props = {
  icon?: ReactNode;
  text: string;
  color?: 'green' | 'white';
  onClick?: () => void;
  className?: string;
  loading?: boolean;
};

const Button = (props: Props) => {
  const { color = 'white', text, icon, loading, className, onClick } = props;

  let iconEl = icon && <Flexbox classNames={styles.buttonIcon}>{icon}</Flexbox>;
  if (loading) {
    iconEl = (
      <motion.div
        className={styles.buttonIcon}
        animate={{ rotate: 360 }}
        transition={{ ease: 'linear', duration: 1, repeat: Infinity }}
      >
        <Spinner height={20} width={20} />
      </motion.div>
    );
  }
  return (
    <button
      className={cx([styles.button, styles[color], loading && styles.loading, className])}
      onClick={!loading ? onClick : () => {}}
    >
      <Flexbox classNames={styles.buttonContent}>
        {iconEl}
        {text}
      </Flexbox>
    </button>
  );
};

export default Button;
