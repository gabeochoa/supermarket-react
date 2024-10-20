import { useContext, useEffect } from 'react';
import { DataContext } from './DataContext.tsx';
import type { Order } from './DataContext.tsx';

function ordersPassTime(data: any) {
  const { orders, setOrders } = data;

  const updatedOrders = orders
    .map((order: Order) => {
      return {
        ...order,
        pctRemaining: order.pctRemaining - 1,
      };
    })
    .filter((order: Order) => order.pctRemaining > 0);
  setOrders(updatedOrders);
}

function onTick(data: any) {
  //   console.log('datamanager tick');
  data.setTicks(data.ticks + 1);
  //
  if (data.ticks % 4 == 0) {
    // console.log('datamanager second');
    onSecond(data);
  }

  ordersPassTime(data);
}

function onSecond(data: any) {
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

  return;
}

export default DataManager;
