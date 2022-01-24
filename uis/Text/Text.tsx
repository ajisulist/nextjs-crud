import React from 'react';
import cs from 'classnames';

import styles from './Text.module.scss';

type TextProps = {
  color?: 'black' | 'green' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  weight?: 'light' | 'regular' | 'bold';
  text: string | number;
  className?: string;
};

const Text = (props: TextProps) => {
  const { size = 'md', color = 'black', weight = 'regular', className } = props;

  return <span className={cs([styles[size], styles[color], styles[weight], className])}>{props.text}</span>;
};

export default Text;
