import React from 'react';
import { Row, Col, Form, Input, Upload, Icon } from 'antd';
import { Button } from '../components';

export default () => {
  return (
    <Row gutter={20}>
      <Col span={12}>
        <Form.Item label="功能模板">
          <Row gutter={5}>
            <Col span={12}>
              <Input />
            </Col>
            <Col span={12}>
              <Upload>
                <Button>
                  <Icon type="upload" /> 选择模板
                </Button>
              </Upload>
            </Col>
          </Row>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="名称">
          <Input />
        </Form.Item>
      </Col>
    </Row>
  );
};
