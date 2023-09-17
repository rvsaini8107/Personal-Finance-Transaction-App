import { Button,Form,Input, DatePicker, Modal, Select } from "antd";

import React, { useState } from "react";
import "./styles.css";
const AddIncome = ({
  isIncomeModalVisible,
  handelIncomeModalCancel,
  onFinish,BtnLoader
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      title="Add Income"
      visible={isIncomeModalVisible}
      onCancel={handelIncomeModalCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onFinish(values, "income");
          form.resetFields();
        }}
      >
        <Form.Item 
        className="custom-input-label"
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name of the transaction!",
            },
          ]}
        >
          <Input
            type="text"
            name="name"
            id="custom-input"
            className="custom-input"
          />
        </Form.Item>
        <Form.Item
        className="custom-input-label"
          label="Amount"
          name="Amount"
          rules={[
            {
              required: true,
              message: "Please input your Amount of the transaction!",
            },
          ]}
        >
          <Input
            type="number"
            name="Amount"
            id="custom-input"
            className="custom-input"
          />
        </Form.Item>
        <Form.Item
        className="custom-input-label"
          label="Date"
          name="date"
          rules={[
            {
              required: true,
              message: "Please select the income date!",
            },
          ]}
        >
          <DatePicker className="custom-input" formate="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item
        className="custom-input-label"
          label="Tag"
          name="tag"
          rules={[
            {
              required: true,
              message: "Please select the a tag!",
            },
          ]}
        >
          <Select className="select-input-2">
            <Select.Option value="salary">Salary</Select.Option>
            <Select.Option value="freelance">Freelance</Select.Option>
            <Select.Option value="investment">Investment</Select.Option>
            <Select.Option value="Other">Other</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button className="btn btn-blue" type="primary" htmlType="submit" >
          {BtnLoader ? "Loading..." : "Add Income"}
          </Button>
        </Form.Item>


      </Form>
    </Modal>
  );
};

export default AddIncome;
