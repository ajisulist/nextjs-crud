import React, { useState } from 'react';
import { ChevronUp, Plus } from 'react-feather';
import { motion, Variants } from 'framer-motion';

import Table from '../../../uis/Table/Table';
import Text from '../../../uis/Text/Text';
import Flexbox from '../../../uis/Flexbox/Flexbox';
import Button from '../../../uis/Button/Button';

import { useCommodityList, SortState } from './useCommodityList';

import styles from './Commodity.module.scss';
import CommodityAddModal from './CommodityAddModal';
import Input from '../../../uis/Input/Input';

const Commodity = () => {
  const [open, setOpen] = useState(false);
  const { data, sortState, setSortState, searchText, setSearchText, loadCommodityList } = useCommodityList();

  const handleSort = (column: SortState['column']) => () => {
    setSortState(prev => ({
      column,
      order: prev.column === column && prev.order === 'asc' ? 'desc' : 'asc',
    }));
  };

  return (
    <Flexbox flexDirection="column">
      <Flexbox>
        <Input
          label="Cari"
          type="text"
          value={searchText}
          onChange={str => {
            setSearchText(str as string);
          }}
        />
      </Flexbox>
      <Flexbox>
        <Button
          icon={<Plus height={20} width={20} />}
          color="green"
          text="Tambah Data"
          onClick={() => {
            setOpen(true);
          }}
        />
        <CommodityAddModal
          isVisible={open}
          handleClose={() => {
            setOpen(false);
          }}
          onSuccess={loadCommodityList}
        />
      </Flexbox>
      <Flexbox classNames={styles.tableWrapper}>
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell className={styles.stickyColumn} onClick={handleSort('komoditas')}>
                <HeaderIcon text="Komoditas" state={sortState} column="komoditas" />
              </Table.HeaderCell>
              <Table.HeaderCell onClick={handleSort('area_kota')}>
                <HeaderIcon text="Area" state={sortState} column="area_kota" />
              </Table.HeaderCell>
              <Table.HeaderCell onClick={handleSort('size')}>
                <HeaderIcon text="Ukuran" state={sortState} column="size" />
              </Table.HeaderCell>
              <Table.HeaderCell onClick={handleSort('price')}>
                <HeaderIcon text="Harga" state={sortState} column="price" />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {data.map((el, idx) => {
              const priceText = el.price === null ? '-' : `Rp. ${el.price}`;
              return (
                <Table.Row key={`${el.uuid}-${idx}`}>
                  <Table.Cell className={styles.stickyColumn}>
                    <Text weight="bold" text={el.komoditas || ''} />
                  </Table.Cell>
                  <Table.Cell className={styles.antiWrap}>
                    <Flexbox flexDirection="column">
                      <Text weight="bold" text={el.area_kota || ''} />
                      <Text size="sm" text={el.area_provinsi || ''} />
                    </Flexbox>
                  </Table.Cell>
                  <Table.Cell className={styles.antiWrap}>
                    <Text weight="bold" text={el.size || ''} />
                  </Table.Cell>
                  <Table.Cell className={styles.antiWrap}>
                    <Text weight="bold" text={priceText} />
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </Flexbox>
    </Flexbox>
  );
};

const iconVariants: Variants = {
  asc: {
    rotateZ: 0,
  },
  desc: {
    rotateZ: 180,
  },
};

type HeaderIconProps = {
  state: SortState;
  column: SortState['column'];
  text: string;
};

const HeaderIcon = (props: HeaderIconProps) => {
  const { text, state, column } = props;
  return (
    <Flexbox classNames={styles.header}>
      {text}
      {state.column === column && (
        <Flexbox classNames={styles.headerIcon}>
          <motion.div animate={state.order} variants={iconVariants}>
            <ChevronUp size={20} />
          </motion.div>
        </Flexbox>
      )}
    </Flexbox>
  );
};

export default Commodity;
