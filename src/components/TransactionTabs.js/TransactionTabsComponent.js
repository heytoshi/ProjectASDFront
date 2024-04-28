import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import "./TransactionTabsComponent.css";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import MyTransactionsComponent from "../../components/MyTransactions/MyTransactionsComponent";

const TransactionTabsComponent = () => {
  const [activeTab, setActiveTab] = useState("sent");
  const token = sessionStorage.getItem("token");
  const username = sessionStorage.getItem("username");
  const [transactionReceivedList, setTransactionReceivedList] = useState([]);
  const [transactionSentList, setTransactionSentList] = useState([]);

  const [page, setPage] = useState(1);
  const contentRef = useRef(null);


  const handleTabChange = (tab) => {
    resetInfiniteScroll();
    setActiveTab(tab);
    console.log(page)
  };

  const resetInfiniteScroll = () => {
    setPage(0);
    setTransactionReceivedList([]);
    setTransactionSentList([])
  };


  const fetchMyTransactions = async () => {
    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };


    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND + `/project/api/v1/service/transaction/${username}`,
        header
      );
      const data = response.data;

      setTransactionReceivedList(data);

    } catch (error) {
      console.log(error);
    }
  };

  const fetchBorrowerTransactions = async () => {
    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };


    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND + `/project/api/v1/service/transaction/${username}/borrower`,
        header
      );
      const data = response.data;

      setTransactionSentList(data);

    } catch (error) {
      console.log(error);
    }
  };



  useLayoutEffect(() => {
    const contentHeight = contentRef.current.clientHeight;
    if (contentHeight < window.innerHeight) {
      setPage(0);
    }
  }, [page]);

  useEffect(() => {
    resetInfiniteScroll();
    if (activeTab === "sent") {
      fetchBorrowerTransactions();
    } else if (activeTab === "received") {
      fetchMyTransactions();
    }
    // eslint-disable-next-line
  }, [activeTab]);

  const updatedDataTran = (updatedTransaction) => {
    const index = transactionReceivedList.findIndex((transaction) => transaction.id === updatedTransaction.id);

    if (index !== -1) {
      setTransactionReceivedList((prevTransactionList) => {
        const updatedList = [...prevTransactionList];
        updatedList[index] = updatedTransaction;
        return updatedList;
      });
    } else {

    }
  }

  return (
    <div id="transaction-main-content" className="transaction-main-content">
      <div ref={contentRef}></div>
      <div className="transaction-tabs">
        <button
          className={`tab ${activeTab === "sent" ? "active" : ""}`}
          onClick={() => handleTabChange("sent")}
        >
          Sent
        </button>
        <button
          className={`tab ${activeTab === "received" ? "active" : ""}`}
          onClick={() => handleTabChange("received")}
        >
          Received
        </button>
      </div>
      <InfiniteScroll
        dataLength={
          activeTab === "received"
            ? transactionReceivedList.length
            : transactionReceivedList.length
        }
        scrollableTarget={"mybook-main-content"}
      >
        {activeTab === "sent"
          ? transactionSentList.map((transaction, index) => (
            <MyTransactionsComponent
              key={index}
              id={transaction.id}
              approvalDate={transaction.approvalDate}
              pendingDate={transaction.pendingDate}
              completionDate={transaction.completionDate}
              borrower={transaction.borrower}
              ownerBook={transaction.ownerBook}
              borrowerBook={transaction.borrowerBook}
              status={transaction.status}
            />))
          : activeTab === "received"
            ? transactionReceivedList.map((transaction, index) => (
              <MyTransactionsComponent
                key={index}
                id={transaction.id}
                approvalDate={transaction.approvalDate}
                pendingDate={transaction.pendingDate}
                completionDate={transaction.completionDate}
                borrower={transaction.borrower}
                ownerBook={transaction.ownerBook}
                borrowerBook={transaction.borrowerBook}
                status={transaction.status}
                updatedDataTran={updatedDataTran}
              />))
            : null}
      </InfiniteScroll>
    </div>
  );
};

export default TransactionTabsComponent;
