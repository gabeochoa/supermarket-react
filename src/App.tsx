import { useState } from 'react';
import DataProvider from './DataContext.tsx';
import LeftCol from './LeftCol.tsx';
import Tabs from './tabs.tsx';

const Column = (props) => (
  <div className={'' + props.size + ' h-1/2'}>{props.children} </div>
);

const Item = (props) => (
  <div
    style={{
      backgroundColor: props.color,
      height: 100,
      width: 100,
    }}
  />
);

const Shelves = (props) => (
  <div className={''}>
    <div className={'container mx-auto flex columns-5 flex-nowrap'}>
      <Item color="green" />
      <Item color="red" />
      <Item color="blue" />
      <Item color="green" />
      <Item color="red" />
      <Item color="blue" />
    </div>
    <div className={'container mx-auto flex columns-5 flex-nowrap'}>
      <Item color="red" />
      <Item color="blue" />
      <Item color="green" />
      <Item color="red" />
      <Item color="blue" />
      <Item color="green" />
    </div>
    <div className={'container mx-auto flex columns-5 flex-nowrap'}>
      <Item color="blue" />
      <Item color="green" />
      <Item color="red" />
      <Item color="blue" />
      <Item color="green" />
      <Item color="red" />
    </div>
    <div className={'container mx-auto flex columns-5 flex-nowrap'}>
      <Item color="green" />
      <Item color="red" />
      <Item color="blue" />
      <Item color="green" />
      <Item color="red" />
      <Item color="blue" />
    </div>
    <div className={'container mx-auto flex columns-5 flex-nowrap'}>
      <Item color="red" />
      <Item color="blue" />
      <Item color="green" />
      <Item color="red" />
      <Item color="blue" />
      <Item color="green" />
    </div>
    <div className={'container mx-auto flex columns-5 flex-nowrap'}>
      <Item color="blue" />
      <Item color="green" />
      <Item color="red" />
      <Item color="blue" />
      <Item color="green" />
      <Item color="red" />
    </div>
  </div>
);

export default function App() {
  return (
    <DataProvider>
      <div className="container mx-auto flex h-full columns-auto flex-nowrap">
        <Column size="w-1/4">
          <LeftCol />
        </Column>
        <Column size="w-1/2">
          <Shelves />
        </Column>
        <Column size="w-1/4">
          <Tabs />
        </Column>
      </div>
    </DataProvider>
  );
}
