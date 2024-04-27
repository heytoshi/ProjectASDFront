import React from "react";
import "./MyTransactionsComponent.css";
import axios from "axios";

const MyTransactionsComponent = ({ id, approvalDate, pendingDate, completionDate, borrower, ownerBook, borrowerBook, status, updatedDataTran }) => {
  const token = sessionStorage.getItem("token");
  const username = sessionStorage.getItem("username");


  const handleReject = async () => {

    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.put(
        process.env.REACT_APP_BACKEND + `/project/api/v1/service/transaction/${id}/reject`,
        header
      );
      if (response.data) {
        updatedDataTran(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleApprove = async () => {
    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.put(
        process.env.REACT_APP_BACKEND + `/project/api/v1/service/transaction/${id}/approve`,
        header
      );
      if (response.data) {
        updatedDataTran(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="transaction-container">
      <div className="transaction-section">
        {status === 'PENDING' ? <p className="transaction-pendingDate">Pending Date: {pendingDate}</p> : null}
        {status === 'APPROVED' ? <p className="transaction-approvalDate">Approval Date: {approvalDate}</p> : null}
        <p className="transaction-borrower">Borrower: {borrower}</p>
        <p className="transaction-ownerBook">My Book: {ownerBook}</p>
        <p className="transaction-borrowerBook">Borrower's Book: {borrowerBook}</p>
        <p className="transaction-status">Status: {status}</p>
      </div>
      <div className="transaction-owner">
        {status === 'PENDING' && borrower !== username ? (
          <>
            <button className="approve-button" onClick={handleApprove}>Approve</button>
            <button className="reject-button" onClick={handleReject}>Reject</button>
          </>
        ): null}
      </div>
    </div>
  );
};

export default MyTransactionsComponent;
