import { createContext, ReactNode, useCallback, useState } from 'react';

type Item = {
  icon: string;
  id: number;
  name: string;
  price: number;
};

const Items: Array<Item> = [
  {
    icon: '🍎',
    id: 0,
    name: 'apple',
    price: 1,
  },
  {
    icon: '🥔',
    id: 1,
    name: 'potato',
    price: 1,
  },
];

type InventoryItem = {
  amount: number;
  item_id: number;
};

export type Shelve = {
  amount: number;
  id: number;
  item_id: null | number;
};

export type Order = {
  amount: number;
  indicate: boolean;
  item_id: null | number;
  pctRemaining: number;
  price: number;
};

// CORRECT rule: never mutate a state array in place — React sees the same
// reference and skips the render. Always return a new array (see CORRECT.md).
export function itemById(
  items: Array<Item>,
  id: number | null | undefined,
): Item | undefined {
  return id == null ? undefined : items.find((i) => i.id === id);
}
function addItem(list: Array<InventoryItem>, item: InventoryItem) {
  const idx = list.findIndex((i) => i.item_id === item.item_id);
  if (idx === -1) {
    return [...list, item];
  }
  return list.map((i, j) =>
    j === idx ? { ...i, amount: i.amount + item.amount } : i,
  );
}

function removeAmount(
  list: Array<InventoryItem>,
  item_id: number,
  amount: number,
) {
  return list.map((i) =>
    i.item_id === item_id
      ? { ...i, amount: Math.max(0, i.amount - amount) }
      : i,
  );
}

export type DataContextType = {
  ITEMS: Array<Item>;
  addItem: (m: Array<InventoryItem>, i: InventoryItem) => void;
  inventory: Array<InventoryItem>;
  money: number;
  orders: Array<Order>;
  prevEarnings: Array<number>;
  removeAmount: (m: Array<InventoryItem>, i: number, amt: number) => void;
  setMoney: (m: number) => void;
  setOrders: (m: Array<Order>) => void;
  setPrevEarnings: (m: Array<number>) => void;
  setShelves: (m: Array<Shelve>) => void;
  setTicks: (m: number) => void;
  shelves: Array<Shelve>;
  ticks: number;
};
const defaultValue: DataContextType = {
  ITEMS: Items,
  addItem: () => {},
  inventory: [],
  money: 0,
  orders: [],
  prevEarnings: [],
  removeAmount: () => {},
  setMoney: () => {},
  setOrders: () => {},
  setPrevEarnings: () => {},
  setShelves: () => {},
  setTicks: () => {},
  shelves: [],
  ticks: 0,
};

export const DataContext = createContext<DataContextType>(defaultValue);

function makeDefaultShelves(): Array<Shelve> {
  const arr: Array<Shelve> = [];
  for (let i = 0; i < 6 * 6; i++) {
    arr.push({
      amount: 17,
      id: i,
      item_id: 0,
    });
  }
  return arr;
}

export default function DataProvider(props: { children: ReactNode }) {
  const [ticks, setTicks] = useState<number>(0);
  const [prevEarnings, setPrevEarnings] = useState<Array<number>>([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [money, setMoney] = useState<number>(0);
  const [inventory, setInventory] = useState<Array<InventoryItem>>([
    {
      amount: 100,
      item_id: 0,
    },
    {
      amount: 0,
      item_id: 1,
    },
  ]);
  const [shelves, setShelves] = useState<Array<Shelve>>(makeDefaultShelves());
  const [orders, setOrders] = useState<Array<Order>>([
    {
      amount: 12,
      indicate: true,
      item_id: 0,
      pctRemaining: 30,
      price: 12,
    },
    {
      amount: 3,
      indicate: false,
      item_id: 1,
      pctRemaining: 10,
      price: 45,
    },
  ]);

  const saveEarning = useCallback(
    (diff: number) => {
      const newEarnings = [...prevEarnings];
      newEarnings.shift();
      newEarnings.push(diff);
      setPrevEarnings(newEarnings);
    },
    [prevEarnings, setPrevEarnings],
  );

  return (
    <DataContext.Provider
      value={{
        ITEMS: Items,
        addItem: (arr, item) => {
          setInventory(addItem(arr, item));
        },
        inventory,
        money,
        orders,
        prevEarnings,
        removeAmount: (arr, item_id, amt) => {
          setInventory(removeAmount(arr, item_id, amt));
        },
        setMoney: (amt) => {
          saveEarning(amt - money);
          setMoney(amt);
        },
        setOrders,
        setPrevEarnings,
        setShelves,
        setTicks,
        shelves,
        ticks,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}
