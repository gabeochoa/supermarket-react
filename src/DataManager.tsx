import { useContext, useEffect } from 'react';
import { DataContext } from './DataContext.tsx';
import type { Order } from './DataContext.tsx';

function ordersPassTime(data: any) {
  const { orders, setOrders, inventory } = data;

  const updatedOrders = orders
    .map((order: Order) => {
      return {
        ...order,
        pctRemaining: order.pctRemaining - 1,
      };
    })
    .filter((order: Order) => order.pctRemaining > 0);

  if (updatedOrders.length < 5) {
    // TODO right now this doesnt support ratios of <1
    // imagine we want to do 2 apples for 1$
    const ratio = 1 + Math.floor(Math.random() * 10);
    const amt = 1 + Math.floor(Math.random() * 10);

    const randomIndex = Math.floor(Math.random() * inventory.length);
    const newOrder = {
      item_id: inventory[randomIndex].item_id,
      amount: amt,
      price: amt * ratio,
      pctRemaining: 100,
      indicate: false,
    };
    updatedOrders.push(newOrder);
  }

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
