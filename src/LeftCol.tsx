import { useContext } from 'react';
import { DataContext, itemById } from './DataContext.tsx';

function PlayerStats() {
  const { money, prevEarnings } = useContext(DataContext);

  const sum = prevEarnings.reduce(
    (acc: number, curValue: number) => acc + curValue,
    0,
  );
  const rate = sum / 10;

  return (
    <div className="">
      Money ${money} (${rate}/s)
    </div>
  );
}

function IconButton(props: { icon: string }) {
  return <button className="btn btn-square btn-xs">{props.icon}</button>;
}

function ButtonUpIcon() {
  return <IconButton icon={'🔼'} />;
}

function ButtonDownIcon() {
  return <IconButton icon={'🔽'} />;
}

function InventoryItem(props: { amount: number; name: string; price: number }) {
  return (
    <tr>
      <td>{props.amount}</td>
      <td>{props.name}</td>
      <td>
        <div className="join">
          <p style={{ paddingRight: 12 }}>${props.price}</p>
          <ButtonUpIcon />
          <ButtonDownIcon />
        </div>
      </td>
    </tr>
  );
}

function Inventory() {
  const { ITEMS, inventory } = useContext(DataContext);
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
              {...(itemById(ITEMS, item.item_id) ?? { name: '?', price: 0 })}
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
