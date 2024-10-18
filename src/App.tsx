import { useState } from 'react';

const Link = (props: JSX.IntrinsicElements['a']) => (
  <a
    className="text-pink-500 underline hover:no-underline dark:text-pink-400"
    {...props}
  />
);

const Column = (props) => (
  <div className={'' + props.size + ' h-1/2'}>{props.children} </div>
);

const Item = (props) => (
  <div
    style={{
      backgroundColor: props.color,
      height: 100,
      width: 100,
    }}
  />
);

const Shelves = (props) => (
  <div className={''}>
    <div className={'container mx-auto flex columns-5 flex-nowrap'}>
      <Item color="green" />
      <Item color="red" />
      <Item color="blue" />
      <Item color="green" />
      <Item color="red" />
      <Item color="blue" />
    </div>
    <div className={'container mx-auto flex columns-5 flex-nowrap'}>
      <Item color="red" />
      <Item color="blue" />
      <Item color="green" />
      <Item color="red" />
      <Item color="blue" />
      <Item color="green" />
    </div>
    <div className={'container mx-auto flex columns-5 flex-nowrap'}>
      <Item color="blue" />
      <Item color="green" />
      <Item color="red" />
      <Item color="blue" />
      <Item color="green" />
      <Item color="red" />
    </div>
    <div className={'container mx-auto flex columns-5 flex-nowrap'}>
      <Item color="green" />
      <Item color="red" />
      <Item color="blue" />
      <Item color="green" />
      <Item color="red" />
      <Item color="blue" />
    </div>
    <div className={'container mx-auto flex columns-5 flex-nowrap'}>
      <Item color="red" />
      <Item color="blue" />
      <Item color="green" />
      <Item color="red" />
      <Item color="blue" />
      <Item color="green" />
    </div>
    <div className={'container mx-auto flex columns-5 flex-nowrap'}>
      <Item color="blue" />
      <Item color="green" />
      <Item color="red" />
      <Item color="blue" />
      <Item color="green" />
      <Item color="red" />
    </div>
  </div>
);

function OrderCard(props) {
  const wrapWithIndicator = (cmp) => {
    return (
      <div className="indicator">
        <span className="badge-primaryindicator-top badge indicator-item">
          ✅
        </span>
        {cmp}
      </div>
    );
  };

  const wrapWithPadding = (cmp) => {
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
    <div className="card card-compact bg-base-100 shadow-xl">
      <div className="card-body items-center text-center">
        <p>100x for 12345$</p>
        <progress
          className={'progress ' + progressColor}
          value={props.pctRemaining}
          max="100"
        />
      </div>
    </div>
  );

  let card = innerCard;
  if (props.indicate) {
    card = wrapWithIndicator(card);
  }

  return wrapWithPadding(card);
}

enum TabType {
  IdeaTab,
  DealsTab,
}

const Tabs = (props) => (
  <div role="tablist" className="tabs tabs-lifted" style={{ marginBottom: 20 }}>
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

function TabContent(props) {
  switch (props.active) {
    case TabType.IdeaTab:
      return <div style={{ padding: 20 }}></div>;
    case TabType.DealsTab:
      return (
        <div style={{ padding: 20 }}>
          <OrderCard indicate pctRemaining={10} />
          <OrderCard pctRemaining={30} />
        </div>
      );
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.IdeaTab);

  return (
    <div className="container mx-auto flex h-full columns-auto flex-nowrap">
      <Column size="w-1/4">
        <div
          style={{
            backgroundColor: 'red',
            height: 100,
          }}
        />
      </Column>
      <Column size="w-1/2">
        <Shelves />
      </Column>
      <Column size="w-1/4">
        <Tabs active={activeTab} setActive={setActiveTab} />
      </Column>
    </div>
  );
}
