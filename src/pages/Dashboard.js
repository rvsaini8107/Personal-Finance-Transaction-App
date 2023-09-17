import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";
import { Modal } from "antd";
import AddExpense from "../components/Modals/AddExpense";
import AddIncome from "../components/Modals/AddIncome";
import {
  Transaction,
  addDoc,
  collection,
  getDocs,
  query,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import moment from "moment";
import TransactionsTable from "../components/TransactionsTable";
import ChartsComponent from "../components/Charts";

function Dashboard() {
  const [user, setUser] = useState(auth.currentUser);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [Loader, setLoader] = useState(false);
  const [BtnLoader, setBtnLoader] = useState(false);

  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  const onFinish = (values, type) => {
    setBtnLoader(true);
    console.log("on Finish", values, type);
    const newTransaction = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      amount: parseFloat(values.Amount),
      tag: values.tag,
      name: values.name,
    };
    console.log(newTransaction, "<<<newTransaction");
    addTransaction(newTransaction, type);
    setBtnLoader(false);
  };

  async function addTransaction(transaction, type) {
    try {
      // Create our initial doc
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );

      console.log("Document written with ID: ", docRef.id);

      toast.success("Transaction Added!");
      if (type) {
        if (type == "expense") {
          handelExpenseModalCancel();
        } else if (type == "income") {
          handelIncomeModalCancel();
        }
      }

      let newArr = transactions;
      newArr.push(transaction);
      setTransactions(newArr);
      calculateBalance();
    } catch (err) {
      console.error("Error adding Document:");

      toast.error("Couldn't add transaction!");
    }
  }
  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };
  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };
  const handelExpenseModalCancel = () => {
    setIsExpenseModalVisible(false);
  };
  const handelIncomeModalCancel = () => {
    setIsIncomeModalVisible(false);
  };
  useEffect(() => {
    // get all docs from the collection
    fetchTransactions();
  }, [user]);
  // transactions change
  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  function calculateBalance() {
    let incomeTotal = 0;
    let expenseTotal = 0;
    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else if (transaction.type === "expense") {
        expenseTotal += transaction.amount;
      }
    });

    setExpense(expenseTotal);
    setIncome(incomeTotal);

    setTotalBalance(incomeTotal - expenseTotal);
  }

  async function fetchTransactions() {
    setLoader(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
      console.log("transactions Array>>>", transactionsArray);
      toast.success("Transactions Fetched!");
    }
    setLoader(false);
  }
  let sortedTransaction = transactions.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  return (
    <>
      <Header />
      {Loader ? (
        <p style={{ textAlign: "center", marginTop: "20rem" }}>Loading...</p>
      ) : (
        <div>
          {/* https://www.w3schools.com/howto/img_avatar.png */}

          <Cards
            income={income}
            expense={expense}
            totalBalance={totalBalance}
            showExpenseModal={showExpenseModal}
            showIncomeModal={showIncomeModal}
          />
          <AddIncome
            isIncomeModalVisible={isIncomeModalVisible}
            handelIncomeModalCancel={handelIncomeModalCancel}
            onFinish={onFinish}
            BtnLoader={BtnLoader}
          />
          <AddExpense
            isExpenseModalVisible={isExpenseModalVisible}
            handelExpenseModalCancel={handelExpenseModalCancel}
            onFinish={onFinish}
            BtnLoader={BtnLoader}
          />
          {transactions.length > 0 ? (
            <ChartsComponent sortedTransaction={sortedTransaction} />
          ) : (
            "Not Transactions Still"
          )}
          <TransactionsTable
            transactions={transactions}
            addTransaction={addTransaction}
            fetchTransactions={fetchTransactions}
          />
        </div>
      )}
    </>
  );
}

export default Dashboard;
