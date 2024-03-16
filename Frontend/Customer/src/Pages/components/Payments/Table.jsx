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

export default function TableComp() {
  const [data, setData] = useState([]);
  let token = localStorage.getItem("token");
  let [action, setAction] = useState(false);
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
        console.log("Response:", response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = async (value, paymentId) => {
    console.log("Button clicked:", value, "Payment ID:", paymentId);
    let token = localStorage.getItem("token");

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
      console.log("Response:", response.data);
      setAction(true);
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
                <StyledTableCell component="th" scope="row">
                  {a.customerId}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {a.merchantId}
                </StyledTableCell>
                <StyledTableCell align="right">{a.description}</StyledTableCell>
                <StyledTableCell align="right">{a.status}</StyledTableCell>
                <StyledTableCell align="right">{a.amount}</StyledTableCell>
                <StyledTableCell align="right">
                  {action == false ? (
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
                        onClick={() => handleButtonClick("Reject", a._id)}
                      >
                        Reject
                      </Button>
                    </div>
                  ) : null}
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
