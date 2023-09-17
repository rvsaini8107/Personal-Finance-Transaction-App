import React from "react";
import "./styles.css";
import { Card, Row } from "antd";
import Button from "./../Button";
const Cards = ({
  showExpenseModal,
  showIncomeModal,
  income,
  expense,
  totalBalance,
}) => {
    
  return (
    <div className="cards-page">
      <Row className="my-row">
        <Card title="Current Balance" className="my-card">
          <p className="current-balance">₹ {totalBalance}</p>
          <Button text="Reset Balance" blue={true} />
        </Card>
        <Card title="Total Income" className="my-card">
          <p className="current-balance">₹ {income}</p>
          <Button text="Add Income" blue={true} onClick={showIncomeModal} />
        </Card>
        <Card title="Total Expenses" className="my-card">
          <p className="current-balance">₹ {expense}</p>
          <Button text="Add Expenses" blue={true} onClick={showExpenseModal} />
        </Card>
      </Row>
    </div>
  );
};

export default Cards;
