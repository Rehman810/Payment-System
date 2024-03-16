import React from "react";
import "./payments.css";
const payments = () => {
  return (
    <div className="payments">
      <h1 className="paymentsh1">Payments</h1>
      <div className="records">
        <div className="record1">
          <span className="recordSpan">Total Pending Records</span>
          <span className="pen-rec">234 records</span>
        </div>
        <div className="record2">
          <span className="recordSpan">Total Paid Records</span>
          <span className="paid-rec">234 records</span>
        </div>
        <div className="record3">
          <span className="recordSpan">Total Rejected Records</span>
          <span className="rej-rec">234 records</span>
        </div>
      </div>
    </div>
  );
};

export default payments;
