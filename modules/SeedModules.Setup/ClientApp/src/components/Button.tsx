import React from 'react';
import { Button } from 'antd';
import { ButtonProps, ButtonType } from 'antd/lib/button';

export default (props: ButtonProps & { buttontype?: ButtonType }) => {
  const fix: any = { type: props.buttontype };

  return <Button {...props} {...fix} />;
};
