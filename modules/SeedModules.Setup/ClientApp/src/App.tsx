import React, { useState } from 'react';
import { Button, Steps, message } from 'antd';
import './App.css';

export default (props: any) => {
  const [current, setCurrent] = useState(0);

  const steps = [
    {
      title: 'First',
      content: 'First-content'
    },
    {
      title: 'Second',
      content: 'Second-content'
    },
    {
      title: 'Last',
      content: 'Last-content'
    }
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <div>
      <Steps current={current}>
        {steps.map(item => (
          <Steps.Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && <button onClick={() => next()}>Next</button>}
        {current === steps.length - 1 && (
          <button onClick={() => message.success('Processing complete!')}>Done</button>
        )}
        {current > 0 && (
          <button style={{ marginLeft: 8 }} onClick={() => prev()}>
            Previous
          </button>
        )}
      </div>
    </div>
  );
};
