import React from 'react';
import OptionItemContextProvider from '../../contexts/OptionContextProvider';

import Flexbox from '../../uis/Flexbox/Flexbox';
import Text from '../../uis/Text/Text';

import Commodity from './commodity/Commodity';
import styles from './IndexPageContent.module.scss';

const IndexPage = () => {
  return (
    <OptionItemContextProvider>
      <Flexbox classNames={styles.container} flexDirection="column">
        <Text className={styles.title} weight="light" size="xl" text="DATA HARGA KOMODITAS" />
        <Commodity />
      </Flexbox>
    </OptionItemContextProvider>
  );
};

export default IndexPage;
