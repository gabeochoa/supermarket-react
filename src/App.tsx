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

function OrderCard(props) {
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
        <p>test content</p>
        <progress
          className={'progress ' + progressColor}
          value={props.pctRemaining}
          max="100"
        />
      </div>
    </div>
  );

  if (!props.indicate) {
    return innerCard;
  }

  return (
    <div className="indicator">
      <span className="badge-primaryindicator-top badge indicator-item">
        ✅
      </span>
      {innerCard}
    </div>
  );
}

export default function App() {
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
        <div
          style={{
            backgroundColor: 'blue',
            height: 100,
          }}
        />
      </Column>
      <Column size="w-1/4">
        <div role="tablist" className="tabs tabs-lifted">
          <a role="tab" className="tab tab-active">
            Ideas
          </a>
          <a role="tab" className="tab">
            Deals
          </a>
        </div>
        <OrderCard indicate pctRemaining={10} />
        <OrderCard pctRemaining={30} />
      </Column>
    </div>
  );
}
