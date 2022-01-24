import cx from 'classnames';
import React, { ReactElement, ReactNode } from 'react';

import styles from './Table.module.scss';

type TableProps = {
  children: ReactElement<BodyProps> | Array<ReactElement<BodyProps>>;
  className?: string;
};

const Table = (props: TableProps) => {
  return <table className={cx([styles.table, props.className])}>{props.children}</table>;
};

type HeadProps = {
  children: ReactElement<RowProps> | Array<ReactElement<RowProps>>;
  className?: string;
};

const Head = (props: HeadProps) => {
  return <thead className={props.className}>{props.children}</thead>;
};

type BodyProps = {
  children: ReactElement<RowProps> | Array<ReactElement<RowProps>>;
  className?: string;
};

const Body = (props: BodyProps) => {
  return <tbody className={props.className}>{props.children}</tbody>;
};

type RowProps = {
  children: ReactElement<RowProps> | Array<ReactElement<RowProps>>;
  className?: string;
};

const Row = (props: RowProps) => {
  return <tr className={props.className}>{props.children}</tr>;
};

type CellProps = {
  children: ReactNode;
  colSpan?: number;
  className?: string;
  onClick?: () => void;
};

const Cell = (props: CellProps) => {
  return (
    <td className={props.className} colSpan={props.colSpan}>
      {props.children}
    </td>
  );
};

const HeaderCell = (props: CellProps) => {
  return (
    <th
      className={cx([props.className, Boolean(props.onClick) && styles.sortable])}
      colSpan={props.colSpan}
      onClick={props.onClick}
    >
      {props.children}
    </th>
  );
};

export default Object.assign(Table, {
  Head,
  Body,
  Row,
  Cell,
  HeaderCell,
});
