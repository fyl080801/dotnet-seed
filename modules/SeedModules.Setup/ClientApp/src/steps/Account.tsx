import React from 'react';
import { Row, Col, Form, Input } from 'antd';

export default () => {
  return (
    <Row gutter={20}>
      <Col span={12}>
        <Form.Item label="用户名">
          <Input />
        </Form.Item>
        <Form.Item label="密码">
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="邮箱">
          <Input />
        </Form.Item>
        <Form.Item label="确认密码">
          <Input />
        </Form.Item>
      </Col>
    </Row>
  );
};
