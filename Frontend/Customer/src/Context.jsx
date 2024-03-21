import React, { createContext, useContext, useState } from "react";

const PaymentContext = createContext();

export function usePaymentContext() {
  return useContext(PaymentContext);
}

export function PaymentProvider({ children }) {
  const [actions, setActions] = useState([]);

  const updateAction = (paymentId, value) => {
    setActions((prevActions) => [...prevActions, { paymentId, value }]);
  };

  return (
    <PaymentContext.Provider value={{ actions, updateAction }}>
      {children}
    </PaymentContext.Provider>
  );
}
