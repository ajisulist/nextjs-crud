import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';

import { API_LIST } from '../../../constants/apiUrls';

import { useOption } from '../../../contexts/OptionContextProvider';
import { Commodity } from '../../../contracts/commodity';

import Button from '../../../uis/Button/Button';
import Flexbox from '../../../uis/Flexbox/Flexbox';
import Input from '../../../uis/Input/Input';
import Modal from '../../../uis/Modal/Modal';
import Select from '../../../uis/Select/Select';
import { post } from '../../../utils/api';

import styles from './Commodity.module.scss';

type Props = {
  isVisible: boolean;
  handleClose: () => void;
  onSuccess: () => void;
};

const NUMBER_REGEX = /^[0-9\b]+$/;

const initialValue = () => ({
  uuid: uuid(),
  tgl_parsed: new Date().toISOString(),
  timestamp: new Date().getTime(),
});

const CommodityAddModal = (props: Props) => {
  const [state, dispatch] = useState<Commodity>(initialValue());

  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const { areaOptions, sizeOptions } = useOption();

  const handleSubmit = async () => {
    if (state.komoditas && state.area_provinsi && state.area_kota && state.price && state.size) {
      setSubmitting(true);
      try {
        await post<any, Commodity[]>(API_LIST, [state]);
        setSubmitting(false);
        props.handleClose();
        props.onSuccess();
        dispatch(initialValue());
        toast.success('Berhasil menambah data');
      } catch {
        toast.error('Gagal menambah data');
      }
    } else {
      toast.error('Mohon isi semua data');
    }
  };

  const handleCancel = () => {
    props.handleClose();
    dispatch(initialValue());
  };

  return (
    <Modal title="TAMBAH DATA HARGA KOMODITAS" isVisible={props.isVisible} handleClose={props.handleClose}>
      <Input
        label="Komoditas"
        type="text"
        placeholder="Ikan Piranha"
        value={state.komoditas as string}
        onChange={text => {
          dispatch(prev => ({
            ...prev,
            komoditas: text as string,
          }));
        }}
      />
      <Select
        label="Area"
        options={areaOptions}
        onChange={selectedOption => {
          dispatch(prev => ({
            ...prev,
            area_kota: selectedOption?.value,
            area_provinsi: selectedOption?.group,
          }));
        }}
        value={{
          label: state.area_kota as string,
          value: state.area_kota as string,
          group: state.area_provinsi as string,
        }}
      />
      <Select
        label="Size"
        options={sizeOptions}
        onChange={selectedOption => {
          dispatch(prev => ({
            ...prev,
            size: selectedOption?.value,
          }));
        }}
        value={{
          label: state.size as string,
          value: state.size as string,
        }}
      />
      <Input
        label="Harga"
        placeholder="20000"
        type="number"
        value={state.price as number}
        min={0}
        onChange={newVal => {
          if (newVal === '' || NUMBER_REGEX.test(newVal as string)) {
            dispatch(prev => ({
              ...prev,
              price: newVal as number, // use newVal as Number becase we want to allow '' (empty string)
            }));
          }
        }}
      />
      <Flexbox classNames={styles.formButtonContainer}>
        <Button text="Batal" onClick={handleCancel} />
        <Button
          loading={isSubmitting}
          className={styles.formSubmitButton}
          color="green"
          text="Tambahkan"
          onClick={handleSubmit}
        />
      </Flexbox>
    </Modal>
  );
};

export default CommodityAddModal;
