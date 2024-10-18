enum TabType {
  IdeaTab,
  DealsTab,
}

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

export default function Tabs(props) {
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
