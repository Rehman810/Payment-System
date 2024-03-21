import React, { useEffect, useState } from "react";
import "./payments.css";
import axios from "axios";
import { usePaymentContext } from "../../../Context";

const payments = () => {
  const [records, setRecords] = useState([]);
  const { actions } = usePaymentContext();

  useEffect(() => {
    const fetchData = async () => {
      let token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://localhost:5000/api/customer/records",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setRecords(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [actions]);
  return (
    <div className="payments">
      <h1 className="paymentsh1">Payments</h1>
      <div className="records">
        <div className="record1">
          <span className="recordSpan">Total Pending Records</span>
          <span className="pen-rec">{records.totalPending} records</span>
        </div>
        <div className="record2">
          <span className="recordSpan">Total Paid Records</span>
          <span className="paid-rec">{records.totalPaid} records</span>
        </div>
        <div className="record3">
          <span className="recordSpan">Total Rejected Records</span>
          <span className="rej-rec">{records.totalRejected} records</span>
        </div>
      </div>
    </div>
  );
};

export default payments;
