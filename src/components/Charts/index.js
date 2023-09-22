import { Line, Pie } from "@ant-design/charts";

import React from "react";
import "./styles.css"
function Charts({ sortedTransaction }) {

   




  const data = sortedTransaction.map((item) => {
    return {
      date: item.date,
      amount: item.amount,
    };
  });
  const spendingData = sortedTransaction.filter((transaction) => {
    if (transaction.type === "expense") {
      return {
        tag: transaction.tag,
        amount: transaction.amount,
      };
    }
  });
 let finalSpendings = spendingData.reduce((acc,obj) => {
  let key = obj.tag;
  if(!acc[key]){
    acc[key] = {tab:obj.tag,amount:obj.amount};// create a new object with the same properties
  }else{
    acc[key] += obj.amount;
  }
  return acc
  
 },{});
 let newSpendings = [
  {tag:"Food",amount:0},
  {tag:"Travel",amount:0},
  {tag:"Buy",amount:0},
  {tag:"Other",amount:0},
 ];
spendingData.forEach((item) => {
  if(item.tag === "Food"){
    newSpendings[0].amount += item.amount;
  }else if(item.tag === "Travel"){
    newSpendings[1].amount += item.amount;
  }else if(item.tag === "Buy"){
    newSpendings[2].amount += item.amount;
  }else if(item.tag === "Other"){
    newSpendings[3].amount += item.amount;
  } 
})

 console.log(finalSpendings,newSpendings,"<<<<pie chart ")

  const config = {
    data,
    //  width: "400px",
    //  height: 400,
    autoFit: false,
    xField: "date",
    yField: "amount",
    // point: {
    //   size: 5,
    //   shape: 'diamond',
    // },
    label: {
      style: {
        fill: "#aaa",
      },
    },
  };
  const spendingConfig = {
    data:newSpendings,
     width: "50%",
    // height: 400,

    angleField: "amount",
    colorField: "tag",
  };
  let chart;
  let pieChart;

  return (
    <div className="charts-wrapper">
      <div className="charts-1 charts-div">
        <h2 className="chart-heading">Your Analytics</h2>
        <Line className="chart-line-my"
          {...config}
          onReady={(chartInstance) => (chart = chartInstance)}
        />
      </div>
      <div className="charts-2 chart-div">
        <h2 className="chart-heading">Your Spending</h2>
        <Pie
          {...spendingConfig}
          onReady={(chartInstance) => (pieChart = chartInstance)}
        />
      </div>
    </div>
  );





}

export default Charts;
