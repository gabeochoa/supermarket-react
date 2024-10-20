import { createContext, useState } from 'react';

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
    id: 0,
    name: 'potato',
    price: 1,
  },
];

type InventoryItem = {
  amount: number;
  item_id: number;
};

type Shelve = {
  amount: number;
  id: number;
  item: null | InventoryItem;
};

function addItem(list: Array<InventoryItem>, item: InventoryItem) {
  const existingItemIndex = list.findIndex((i) => i.id === item.id);
  if (existingItemIndex !== -1) {
    // If the item exists, merge the amounts
    list[existingItemIndex].amount += item.amount;
  } else {
    // If the item does not exist, add it to the list
    list.push(item);
  }
  return list;
}

function removeAmount(
  list: Array<InventoryItem>,
  item_id: number,
  amount: number,
) {
  const existingItemIndex = list.findIndex((i) => i.id === item_id);
  if (existingItemIndex !== -1) {
    // If the item exists, merge the amounts
    list[existingItemIndex].amount -= amount;
  }
  return list;
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
};

export const DataContext = createContext(defaultValue);

function makeDefaultShelves() {
  const arr = [];
  for (let i = 0; i < 6 * 6; i++) {
    arr.push({
      amount: 17,
      id: i,
      item_id: 0,
    });
  }
  return arr;
}

export default function DataProvider(props) {
  const [money, setMoney] = useState<number>(0);
  const [inventory, setInventory] = useState<Array<InventoryItem>>([
    {
      amount: 1,
      item_id: 0,
    },
    {
      amount: 1,
      item_id: 1,
    },
  ]);
  const [shelves, setShelves] = useState<Array<Shelve>>(makeDefaultShelves());

  return (
    <DataContext.Provider
      value={{
        ITEMS: Items,
        addItem: (arr, item) => {
          setInventory(addItem(arr, item));
        },
        inventory,
        money,
        removeAmount: (arr, item_id, amt) => {
          setInventory(removeAmount(arr, item_id, amt));
        },
        setMoney,
        setShelves,
        shelves,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}
