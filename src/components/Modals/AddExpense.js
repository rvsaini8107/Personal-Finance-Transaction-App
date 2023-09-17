import { DatePicker, Form, Modal, Select, Input, Button } from "antd";
import React, { useState } from "react";
import "./styles.css";
const AddExpense = ({
  isExpenseModalVisible,
  handelExpenseModalCancel,
  onFinish,BtnLoader
}) => {
  const [form] = Form.useForm();
//   const [loader,setLoader] = useState(false);
  return (
    <Modal
      title="Add Expense"
      visible={isExpenseModalVisible}
      onCancel={handelExpenseModalCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onFinish(values, "expense");
          form.resetFields();
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          className="custom-input-label"
          rules={[
            {
              required: true,
              message: "Please input your name of the transaction!",
            },
          ]}
        >
          <input type="text" className="custom-input"  />
        </Form.Item>
        <Form.Item
        className="custom-input-label"
          name="Amount"
          label="Amount"
          rules={[
            {
              required: true,
              message: "Please input the expense amount!",
            },
          ]}
        >
          <input type="number" className="custom-input"  />
        </Form.Item>
        <Form.Item
        className="custom-input-label"
          label="Date"
          name="date"
          rules={[
            {
              required: true,
              message: "Please select the expense date!",
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
            <Select.Option value="Food">Food</Select.Option>
            <Select.Option value="Travel">Travel</Select.Option>
            <Select.Option value="Buy">Buy</Select.Option>
            <Select.Option value="Other">Other</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button className="btn btn-blue" type="primary" htmlType="submit" >
            {BtnLoader ? "Loading..." : "Add Expense"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddExpense;
