import React, { useState } from 'react';
import { Steps, message, Form } from 'antd';
import { Button } from './components';
import SiteInfo from './steps/SiteInfo';
import Database from './steps/Database';
import Account from './steps/Account';

export default () => {
  const [current, setCurrent] = useState(0);

  const steps = [
    {
      title: '系统信息',
      content: SiteInfo
    },
    {
      title: '数据库信息',
      content: Database
    },
    {
      title: '初始账号',
      content: Account
    }
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <div className="container setup">
      <Steps current={current}>
        {steps.map(item => (
          <Steps.Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">
        <Form>{steps[current].content()}</Form>
      </div>
      <div className="steps-action">
        {current > 0 && (
          <Button style={{ marginRight: 8 }} onClick={() => prev()}>
            上一步
          </Button>
        )}
        {current < steps.length - 1 && <Button onClick={() => next()}>下一步</Button>}
        {current === steps.length - 1 && (
          <Button buttontype="primary" onClick={() => message.success('Processing complete!')}>
            完成
          </Button>
        )}
      </div>
    </div>
  );
};
