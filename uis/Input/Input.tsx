import React from 'react';
import Flexbox from '../Flexbox/Flexbox';
import Text from '../Text/Text';

import styles from './Input.module.scss';

type Props = {
  label: string;
  value: string | number;
  type: 'text' | 'number';
  placeholder?: string;
  max?: number;
  min?: number;
  onChange: (arg: string | number) => void;
};

const Input = (props: Props) => {
  return (
    <Flexbox flexDirection="column">
      <Text className={styles.label} weight="bold" text={props.label} />
      <input
        max={props.max}
        min={props.min}
        type={props.type}
        className={styles.input}
        placeholder={props.placeholder}
        value={props.value}
        onChange={evt => props.onChange(evt.target.value)}
      />
    </Flexbox>
  );
};

export default Input;
