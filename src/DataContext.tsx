import {
  createContext,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  useCallback,
  useState,
} from 'react';

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
  item_id: null | number;
  amount: number;
  price: number;
  pctRemaining: number;
  indicate: boolean;
};

// CORRECT rule: never mutate a state array in place — React sees the same
// reference and skips the render. Always return a new array (see CORRECT.md).
export function itemById(items: Array<Item>, id: number | null | undefined): Item | undefined {
  return id == null ? undefined : items.find((i) => i.id === id);
}
function addItem(list: Array<InventoryItem>, item: InventoryItem) {
  const idx = list.findIndex((i) => i.item_id === item.item_id);
  if (idx === -1) return [...list, item];
  return list.map((i, j) => (j === idx ? { ...i, amount: i.amount + item.amount } : i));
}

function removeAmount(
  list: Array<InventoryItem>,
  item_id: number,
  amount: number,
) {
  return list.map((i) => (i.item_id === item_id ? { ...i, amount: Math.max(0, i.amount - amount) } : i));
}

const defaultValue = {
  ITEMS: Array<Item>,
  addItem: (m: Array<InventoryItem>, i: InventoryItem) => {},
  inventory: Array<InventoryItem>(),
  money: 0,
  removeAmount: (m: Array<InventoryItem>, i: number, amt: number) => {},
  setMoney: (m: number) => {},
  setShelves: (m: Array<Shelve>) => {},
  shelves: Array<Shelve>,
  orders: Array<Order>,
};

export const DataContext = createContext(defaultValue);

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

export default function DataProvider(props: {
  children:
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | null;
}) {
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
      item_id: 0,
      amount: 12,
      price: 12,
      pctRemaining: 30,
      indicate: true,
    },
    {
      item_id: 1,
      amount: 3,
      price: 45,
      pctRemaining: 10,
      indicate: false,
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
        ticks,
        setTicks,
        prevEarnings,
        setPrevEarnings,
        ITEMS: Items,
        addItem: (arr, item) => {
          setInventory(addItem(arr, item));
        },
        inventory,
        money,
        removeAmount: (arr, item_id, amt) => {
          setInventory(removeAmount(arr, item_id, amt));
        },
        setMoney: (amt) => {
          saveEarning(amt - money);
          setMoney(amt);
        },
        setShelves,
        shelves,
        orders,
        setOrders,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}
