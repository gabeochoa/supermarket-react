import { useContext } from 'react';
import { DataContext } from './DataContext.tsx';

function PlayerStats(_props) {
  const data = useContext(DataContext);
  return <div className="">Money {data.money}</div>;
}

function IconButton(props) {
  return <button className="btn btn-square btn-xs">{props.icon}</button>;
}

function ButtonUpIcon(_props) {
  return <IconButton icon={'🔼'} />;
}

function ButtonDownIcon(_props) {
  return <IconButton icon={'🔽'} />;
}

function InventoryItem(_props) {
  return (
    <tr>
      <td>{_props.amount}</td>
      <td>{_props.name}</td>
      <td>
        <div className="join">
          <p style={{ paddingRight: 12 }}>${_props.price}</p>
          <ButtonUpIcon />
          <ButtonDownIcon />
        </div>
      </td>
    </tr>
  );
}

function Inventory(_props: any) {
  const { inventory, ITEMS } = useContext(DataContext);
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>amt</th>
            <th>item</th>
            <th>price</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <InventoryItem
              key={item.item_id}
              {...item}
              {...ITEMS[item.item_id]}
            />
          ))}
        </tbody>
      </table>
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
