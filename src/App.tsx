import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  useContext,
} from 'react';
import DataProvider, { DataContext } from './DataContext.tsx';
import type { Shelve } from './DataContext.tsx';
import LeftCol from './LeftCol.tsx';
import Tabs from './tabs.tsx';

const Column = (props: {
  size: string;
  children:
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>;
}) => <div className={'' + props.size + ' h-1/2'}>{props.children} </div>;

function Item(props: { item_id: string | number | null; amount: number }) {
  const { ITEMS } = useContext(DataContext);

  const item_info = props.item_id == null ? null : ITEMS[props.item_id];

  const icons = [];
  for (let i = 0; i < props.amount; i++) {
    icons.push(item_info?.icon);
  }

  return (
    <div
      className="items-center text-center"
      key={props.key}
      style={{
        backgroundColor: 'brown',
        border: '2px black solid',
        height: 100,
        width: 125,
      }}
    >
      <div className="container mx-auto flex columns-3 flex-nowrap">
        {icons.slice(0, 5).map((ic, i) => (
          <p key={i}>{ic}</p>
        ))}
      </div>
      <div className="container mx-auto flex columns-3 flex-nowrap">
        {icons.slice(5, 10).map((ic, i) => (
          <p key={i}>{ic}</p>
        ))}
      </div>
      <div className="container mx-auto flex columns-3 flex-nowrap">
        {icons.slice(10, 15).map((ic, i) => (
          <p key={i}>{ic}</p>
        ))}
      </div>
      <div className="container mx-auto flex columns-3 flex-nowrap">
        {icons.slice(15, 20).map((ic, i) => (
          <p key={i}>{ic}</p>
        ))}
      </div>
    </div>
  );
}

function Shelves(_props: any) {
  const { shelves } = useContext(DataContext);

  return (
    <div className={''}>
      <div className={'container mx-auto flex columns-5 flex-nowrap'}>
        {shelves.slice(0, 6).map((shelve: Shelve) => (
          <Item {...shelve} />
        ))}
      </div>
      <div className={'container mx-auto flex columns-5 flex-nowrap'}>
        {shelves.slice(6, 12).map((shelve: Shelve) => (
          <Item {...shelve} />
        ))}
      </div>
      <div className={'container mx-auto flex columns-5 flex-nowrap'}>
        {shelves.slice(12, 18).map((shelve: Shelve) => (
          <Item {...shelve} />
        ))}
      </div>
      <div className={'container mx-auto flex columns-5 flex-nowrap'}>
        {shelves.slice(18, 24).map((shelve: Shelve) => (
          <Item {...shelve} />
        ))}
      </div>
      <div className={'container mx-auto flex columns-5 flex-nowrap'}>
        {shelves.slice(24, 30).map((shelve: Shelve) => (
          <Item {...shelve} />
        ))}
      </div>
      <div className={'container mx-auto flex columns-5 flex-nowrap'}>
        {shelves.slice(30, 36).map((shelve: Shelve) => (
          <Item {...shelve} />
        ))}
      </div>
    </div>
  );
}

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
