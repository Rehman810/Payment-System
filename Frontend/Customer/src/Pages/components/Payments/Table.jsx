import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Button from "@mui/material/Button";
import "./table.css";
import { usePaymentContext } from "../../../Context";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

let token = localStorage.getItem("token");
export default function TableComp() {
  const { updateAction } = usePaymentContext();

  const [data, setData] = useState([]);
  let [action, setAction] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/customer/getPayments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = async (value, paymentId) => {
    console.log("Button clicked:", value, "Payment ID:", paymentId);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/customer/respondToPaymentRequest",
        { action: value, paymentId: paymentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setAction((prevState) => ({
        ...prevState,
        [paymentId]: true,
      }));
      updateAction(paymentId, value);
      setData((prevData) =>
        prevData.map((item) => {
          if (item._id === paymentId) {
            item.status = value === "approve" ? "paid" : "reject";
          }
          return item;
        })
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <TableContainer component={Paper} style={{ width: "80%" }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Customer Account Number</StyledTableCell>
            <StyledTableCell>Merchant Account Number</StyledTableCell>
            <StyledTableCell align="right">Description</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Amount</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length != 0 ? (
            data.map((a) => (
              <StyledTableRow key={a._id}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  style={{ color: "#00bdd5" }}
                >
                  {a.customerAccountNumber}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {a.merchantAccountNumber}
                </StyledTableCell>
                <StyledTableCell align="right">{a.description}</StyledTableCell>
                <StyledTableCell align="right">
                  {a.status === "pending" ? (
                    <span
                      style={{
                        borderRadius: "15px",
                        padding: "10px",
                        color: "#525151",
                        backgroundColor: "#c1bcbc",
                      }}
                    >
                      Pending
                    </span>
                  ) : a.status === "paid" ? (
                    <span
                      style={{
                        borderRadius: "15px",
                        padding: "10px",
                        color: "#04e004",
                        backgroundColor: "#bff7bf",
                      }}
                    >
                      Succeeded
                    </span>
                  ) : (
                    <span
                      style={{
                        borderRadius: "15px",
                        padding: "10px",
                        color: "#fb0000",
                        backgroundColor: "#fe8f8f",
                      }}
                    >
                      Rejected
                    </span>
                  )}
                </StyledTableCell>

                <StyledTableCell align="right" style={{ fontWeight: "bolder" }}>
                  {a.amount} PKR
                </StyledTableCell>
                <StyledTableCell align="right">
                  {a.status === "pending" && !action[a._id] && (
                    <div>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleButtonClick("approve", a._id)}
                      >
                        Pay
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleButtonClick("reject", a._id)}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <p>No data</p>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
