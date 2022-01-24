import React from 'react';
import RSelect, { GroupBase, OptionsOrGroups, SingleValue } from 'react-select';

import Flexbox from '../Flexbox/Flexbox';
import Text from '../Text/Text';

import styles from './Select.module.scss';

type Option = { label: string; value: string; group?: string };
type Props = {
  value: Option;
  onChange: (arg: SingleValue<Option>) => void;
  label: string;
  options: OptionsOrGroups<Option, GroupBase<Option>>;
};

const Select = (props: Props) => {
  return (
    <Flexbox classNames={styles.container} flexDirection="column">
      <Text className={styles.label} weight="bold" text={props.label} />
      <RSelect
        className={styles.select}
        classNamePrefix="RSelect"
        isSearchable
        options={props.options}
        value={props.value}
        onChange={props.onChange}
        openMenuOnFocus
        placeholder="Pilih salah satu pilihan"
      />
    </Flexbox>
  );
};

export default Select;
