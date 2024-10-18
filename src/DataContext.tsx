import { createContext, useState } from 'react';

type InventoryItem = {
  amount: number;
  id: number;
  name: string;
  price: number;
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
  addItem: (m: Array<InventoryItem>, i: InventoryItem) => {},
  inventory: Array<InventoryItem>(),
  money: 0,
  removeAmount: (m: Array<InventoryItem>, i: number, amt: number) => {},
  setMoney: (m: number) => {},
};

export const DataContext = createContext(defaultValue);

export default function DataProvider(props) {
  const [money, setMoney] = useState<number>(0);
  const [inventory, setInventory] = useState<Array<InventoryItem>>([
    {
      amount: 1,
      id: 0,
      name: 'potato',
      price: 1,
    },
    {
      amount: 1,
      id: 0,
      name: 'apple',
      price: 1,
    },
  ]);

  return (
    <DataContext.Provider
      value={{
        addItem: (arr, item) => {
          setInventory(addItem(arr, item));
        },
        inventory,
        money,
        removeAmount: (arr, item_id, amt) => {
          setInventory(removeAmount(arr, item_id, amt));
        },
        setMoney,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}
