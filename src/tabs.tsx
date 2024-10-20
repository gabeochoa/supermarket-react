import { useContext } from 'react';
import { DataContext } from './DataContext.tsx';
import type { Order } from './DataContext.tsx';

enum TabType {
  IdeaTab,
  DealsTab,
}

function OrderCard(props: Order) {
  const { ITEMS } = useContext(DataContext);
  const item_info = ITEMS[props.item_id];

  const wrapWithIndicator = (cmp: any) => {
    return (
      <div className="indicator">
        <span className="badge-primaryindicator-top badge indicator-item">
          ✅
        </span>
        {cmp}
      </div>
    );
  };

  const wrapWithPadding = (cmp: any) => {
    return <div style={{ paddingBottom: 8 }}> {cmp} </div>;
  };

  let progressColor = 'progress-primary';
  if (props.pctRemaining < 10) {
    progressColor = 'progress-error';
  }
  if (props.pctRemaining < 25) {
    progressColor = 'progress-warning';
  }

  const innerCard = (
    <div style={{ width: 120 }}>
      <div className="card card-compact bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <p>
            {item_info.name}
            {item_info.icon}
          </p>
          <p>
            {props.amount} for {props.amount}$
          </p>
          <progress
            className={'progress ' + progressColor}
            value={props.pctRemaining}
            max="100"
          />
        </div>
      </div>
    </div>
  );

  let card = innerCard;
  if (props.indicate) {
    card = wrapWithIndicator(card);
  }

  return wrapWithPadding(card);
}

export default function Tabs() {
  return (
    <div
      role="tablist"
      className="tabs tabs-lifted"
      style={{ marginBottom: 20, marginLeft: 10 }}
    >
      <input
        type="radio"
        name="tabs_rc"
        className="tab"
        role="tab"
        aria-label="Ideas"
      />
      <div role="tabpanel" className="tab-content p-10">
        <TabContent active={TabType.IdeaTab} />
      </div>

      <input
        type="radio"
        name="tabs_rc"
        className="tab"
        role="tab"
        defaultChecked
        aria-label="Deals"
      />
      <div role="tabpanel" className="tab-content p-10">
        <TabContent active={TabType.DealsTab} />
      </div>
    </div>
  );
}

function ActiveOrders() {
  const { orders } = useContext(DataContext);
  return (
    <div style={{ padding: 20 }}>
      {orders.map((order: Order) => {
        return (
          <OrderCard
            key={'' + order.item_id + order.amount + order.price}
            {...order}
          />
        );
      })}
    </div>
  );
}

function TabContent(props: { active: TabType }) {
  switch (props.active) {
    case TabType.IdeaTab:
      return <div style={{ padding: 20 }}></div>;
    case TabType.DealsTab:
      return <ActiveOrders />;
  }
}
