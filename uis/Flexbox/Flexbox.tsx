import React, { ReactNode } from 'react';
import cx from 'classnames';
import styles from './Flexbox.module.scss';

type Props = {
  flexDirection?: 'row' | 'column';
  children: ReactNode;
  classNames?: string;
};

const Flexbox = (props: Props) => {
  const { flexDirection = 'row', classNames } = props;
  return <div className={cx([styles.flex, styles[flexDirection], classNames])}>{props.children}</div>;
};

export default Flexbox;
