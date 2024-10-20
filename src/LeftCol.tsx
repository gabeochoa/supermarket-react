import { useContext } from 'react';
import { DataContext } from './DataContext.tsx';

function PlayerStats(props) {
  const data = useContext(DataContext);
  return <div className="">Money {data.money}</div>;
}

function ButtonUpIcon(props) {
  return <button className="btn btn-square btn-xs">🔼</button>;
}

function ButtonDownIcon(props) {
  return <button className="btn btn-square btn-xs">🔽</button>;
}

function InventoryItem(props) {
  return (
    <div className="card card-compact" key={props.id}>
      <div className="card-body">
        <div className="join">
          <p>{props.name}</p>
          <p>${props.price}</p>
          <ButtonUpIcon />
          <ButtonDownIcon />
        </div>
      </div>
    </div>
  );
}

function Inventory(props) {
  const { inventory, ITEMS } = useContext(DataContext);
  return (
    <div className="">
      {inventory.map((item) => (
        <InventoryItem {...item} {...ITEMS[item.item_id]} />
      ))}
    </div>
  );
}

export default function LeftCol() {
  return (
    <div
      style={{
        height: 1000,
      }}
    >
      <PlayerStats />
      <div className="divider"></div>
      <Inventory />
    </div>
  );
}
