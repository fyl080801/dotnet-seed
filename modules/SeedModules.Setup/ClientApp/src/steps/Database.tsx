import React from 'react';
import { Row, Form, Select, Col, Input } from 'antd';

export default () => {
  return (
    <Row gutter={20}>
      <Col span={12}>
        <Form.Item label="数据库类型">
          <Select />
        </Form.Item>
        <Form.Item label="服务地址">
          <Input />
        </Form.Item>
        <Form.Item label="数据库账号">
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="表前缀">
          <Input />
        </Form.Item>
        <Form.Item label="数据库名称">
          <Input />
        </Form.Item>
        <Form.Item label="数据库密码">
          <Input />
        </Form.Item>
      </Col>
    </Row>
  );
};
