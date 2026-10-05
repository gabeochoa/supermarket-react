import { useContext, useEffect } from 'react';
import { DataContext } from './DataContext.tsx';
import type { DataContextType, Order } from './DataContext.tsx';
import { topUpOrders } from './orders.ts';

function ordersPassTime(data: DataContextType) {
  const { inventory, orders, setOrders } = data;

  const updatedOrders = orders
    .map((order: Order) => {
      return {
        ...order,
        pctRemaining: order.pctRemaining - 1,
      };
    })
    .filter((order: Order) => order.pctRemaining > 0);

  const topped = topUpOrders(
    updatedOrders,
    inventory.map((i: { item_id: number }) => i.item_id),
  );
  setOrders(topped);
}

function onTick(data: DataContextType) {
  //   console.log('datamanager tick');
  data.setTicks(data.ticks + 1);
  //
  if (data.ticks % 4 == 0) {
    // console.log('datamanager second');
    onSecond(data);
  }

  ordersPassTime(data);
}

function onSecond(data: DataContextType) {
  const { money, setMoney } = data;

  setMoney(money + 1);
}

function DataManager() {
  const data = useContext(DataContext);

  useEffect(() => {
    const intervalId1 = setInterval(() => {
      onTick(data);
    }, 250);

    return () => {
      clearInterval(intervalId1);
    };
  }, [data]);

  return null;
}

export default DataManager;
