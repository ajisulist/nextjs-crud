import { useEffect, useMemo, useState } from 'react';
import orderBy from 'lodash/orderBy';

import { get } from '../../../utils/api';
import { Commodity } from '../../../contracts/commodity';
import { API_LIST } from '../../../constants/apiUrls';

type SortColumn = 'komoditas' | 'area_kota' | 'size' | 'price';
type SortOrder = 'asc' | 'desc';

export type SortState = {
  column: SortColumn;
  order: SortOrder;
};

export const useCommodityList = () => {
  const [data, setData] = useState<Commodity[]>([]);
  const [sortState, setSortState] = useState<SortState>({ column: 'komoditas', order: 'asc' });
  const [searchText, setSearchText] = useState<string>('');
  useEffect(() => {
    loadCommodityList();
  }, []);

  const loadCommodityList = () => {
    get<Commodity[]>(API_LIST)
      .then(res => {
        setData(res.filter(item => item.uuid && item.komoditas));
      })
      .catch(err => {
        console.log(err);
      });
  };

  const sortedData = useMemo(() => {
    const filteredData = data.filter(el => {
      if (searchText !== '') {
        const itemKey = `${el.komoditas}${el.area_kota}${el.area_provinsi}${el.size}${el.price}`;
        return itemKey.toLocaleLowerCase().includes(searchText.toLocaleLowerCase());
      }
      return true;
    });
    const iteratees = (el: Commodity) => {
      switch (sortState.column) {
        case 'price':
          return Number(el.price);
        case 'size':
          return Number(el.size);
        default:
          return el[sortState.column];
      }
    };

    return orderBy(filteredData, [iteratees], [sortState.order]);
  }, [sortState.column, sortState.order, data, searchText]);

  return {
    data: sortedData,
    sortState,
    setSortState,
    loadCommodityList,
    searchText,
    setSearchText,
  };
};
