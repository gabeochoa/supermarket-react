import { useContext } from 'react';
import { DataContext } from './DataContext.tsx';

function PlayerStats(props) {
  const data = useContext(DataContext);
  return <div className="">Money {data.money}</div>;
}

function ButtonXIcon(props) {
  return (
    <button className="btn btn-square btn-xs">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}

function InventoryItem(props) {
  return (
    <div className="card card-compact" key={props.id}>
      <div className="card-body">
        <div className="join">
          <p>{props.name}</p>
          <p>${props.price}</p>
          <ButtonXIcon />
          <ButtonXIcon />
        </div>
      </div>
    </div>
  );
}

function Inventory(props) {
  const data = useContext(DataContext);
  return (
    <div className="">
      {data.inventory.map((item) => (
        <InventoryItem {...item} />
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
