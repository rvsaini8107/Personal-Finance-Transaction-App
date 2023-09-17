import React, { useState } from "react";
import "./styles.css";
import { Radio, Select, Table } from "antd";
import searchIcon from "../../images/search.png";
import { parse, unparse } from "papaparse";
import { toast } from "react-toastify";
const TransactionsTable = ({
  transactions,
  addTransaction,
  fetchTransactions,
}) => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];
  let filteredTransactions = [];
  let sortedTransactions = [];
  try {
    filteredTransactions = transactions.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) &&
        item.type.includes(typeFilter)
    );
  } catch (err) {
    console.log(err);
  }
  try {
    sortedTransactions = filteredTransactions.sort((a, b) => {
      if (sortKey === "date") {
        return new Date(a.date) - new Date(b.date);
      } else if (sortKey === "amount") {
        return a.amount - b.amount;
      } else {
        return 0;
      }
    });
  } catch (err) {
    console.log(err);
  }

  // Import CSV
  function importFormCsv(event) {
    try {
      parse(event.target.files[0], {
        header: true,
        complete: async function (results) {
          console.log("Results>>", results);
          for (const transaction of results.data) {
            const newTransaction = {
              ...transaction,
              amount: parseFloat(transaction.amount),
            };
            if(newTransaction.name) {
               await addTransaction(newTransaction);
            }
           
          }
        },
      });
      toast.success("All Transactions Imported!");
      fetchTransactions();
      event.target.value = null;
    } catch (err) {
      console.log(err);
      toast.error(err.massage);
    }
  }
  // Export CSV convert json to  csv
  function exportCSV() {
    var csv = unparse({
      fields: ["name", "amount", "tag", "type", "date"],
      data: transactions,
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  return (
    <div className="TransactionsTable">
      <div className="search-Bar">
        <div className="searchInput">
          {searchIcon && <img src={searchIcon} alt="" className="searchIcon" />}
          <input
            className="search-input"
            type="text"
            name=""
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            id=""
            placeholder="Search by Name"
          />
        </div>

        <Select
          className="select-input select-input-filter"
          onChange={(value) => {
            setTypeFilter(value);
          }}
          value={typeFilter}
          placeholder="Filter"
          allowClear
        > 
          <Select.Option value="">All</Select.Option>
          <Select.Option value="income">Income</Select.Option>
          <Select.Option value="expense">Expense</Select.Option>
        </Select>
      </div>
      
      <div className="TransactionsSecRow">
        <div className="TransactionSecCol">My Transactions</div>
        <Radio.Group
          className="input-radio radio-group"
          onChange={(e) => {
            setSortKey(e.target.value);
          }}
          value={sortKey}
        >
          <Radio.Button value="">No Sort</Radio.Button>
          <Radio.Button value="date">Sort by Date</Radio.Button>
          <Radio.Button value="amount">Sort by Amount</Radio.Button>
        </Radio.Group>
        <div className="transactionImportExport">
          <button onClick={() => exportCSV()} className="btn inline-btn">
            Export To CSV
          </button>
          <label for="file-csv" className="btn inline-btn btn-blue">
            Import From CSV
          </label>
          <input
            id="file-csv"
            type="file"
            accept=".csv"
            required
            onChange={(event) => importFormCsv(event)}
            style={{ display: "none" }}
          />
        </div>
      </div>

      <Table dataSource={sortedTransactions} columns={columns} />
    </div>
  );
};

export default TransactionsTable;
