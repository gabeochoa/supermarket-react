import type { ReactNode } from 'react';
import { useContext } from 'react';
import { DataContext, itemById } from './DataContext.tsx';
import type { Order } from './DataContext.tsx';

enum TabType {
  IdeaTab,
  DealsTab,
}

function OrderCard(props: Order) {
  const { ITEMS } = useContext(DataContext);
  const item_info = itemById(ITEMS, props.item_id);

  const wrapWithIndicator = (cmp: ReactNode) => {
    return (
      <div className="indicator">
        <span className="badge-primaryindicator-top badge indicator-item">
          ✅
        </span>
        {cmp}
      </div>
    );
  };

  const wrapWithPadding = (cmp: ReactNode) => {
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
            {item_info?.name}
            {item_info?.icon}
          </p>
          <p>
            {props.amount} for {props.price}$
          </p>
          <p>
            (${props.price / props.amount}/ {item_info?.icon})
          </p>
          <progress
            className={'progress ' + progressColor}
            max="100"
            value={props.pctRemaining}
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
      className="tabs tabs-lifted"
      role="tablist"
      style={{ marginBottom: 20, marginLeft: 10 }}
    >
      <input
        aria-label="Ideas"
        className="tab"
        name="tabs_rc"
        role="tab"
        type="radio"
      />
      <div className="tab-content p-10" role="tabpanel">
        <TabContent active={TabType.IdeaTab} />
      </div>

      <input
        aria-label="Orders"
        className="tab"
        defaultChecked
        name="tabs_rc"
        role="tab"
        type="radio"
      />
      <div className="tab-content p-10" role="tabpanel">
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
