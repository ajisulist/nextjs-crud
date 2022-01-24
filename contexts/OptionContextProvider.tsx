import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { API_OPTION_AREA, API_OPTION_SIZE } from '../constants/apiUrls';
import { Area } from '../contracts/area';
import { Size } from '../contracts/size';
import { get } from '../utils/api';

type OptionItem = {
  label: string;
  value: string;
  group?: string;
};

type GroupItem = { label: string; options: OptionItem[] };
type Option = { areaOptions: GroupItem[]; sizeOptions: OptionItem[] };

const initialValue: Option = { areaOptions: [], sizeOptions: [] };

const OptionContext = createContext<Option>(initialValue);

type Props = {
  children: ReactNode;
};

const OptionItemContextProvider = (props: Props) => {
  const [state, dispatch] = useState(initialValue);

  useEffect(() => {
    loadOption();
  }, []);

  const loadOption = () => {
    Promise.all([get<Area[]>(API_OPTION_AREA), get<Size[]>(API_OPTION_SIZE)])
      .then(([area, size]) => {
        // Group Area by province and make the Select's option
        const groupedArea = area.reduce<{ [key: string]: OptionItem[] }>((carry, item) => {
          const newItem: OptionItem = {
            group: item.province,
            label: item.city,
            value: item.city,
          };
          if (Array.isArray(carry[item.province])) {
            return {
              ...carry,
              [item.province]: [...carry[item.province], newItem],
            };
          }
          return {
            ...carry,
            [item.province]: [newItem],
          };
        }, {});
        const areaOptions: GroupItem[] = Object.entries(groupedArea).map(item => ({
          label: item[0],
          options: item[1],
        }));

        const sizeOptions: OptionItem[] = size.map(item => ({ label: item.size, value: item.size }));

        dispatch({
          areaOptions,
          sizeOptions,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  return <OptionContext.Provider value={state}>{props.children}</OptionContext.Provider>;
};

export const useOption = () => {
  return useContext(OptionContext);
};

export default OptionItemContextProvider;
