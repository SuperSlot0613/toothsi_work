import React, { useEffect, useState } from "react";
import "../CSS/Subtotal.css";
import CurrencyFormat from "react-currency-format";
// import {useHistory} from 'react-router-dom'
import { getBasketTotal, selectBasket } from "../../features/basketSlice";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Subtotal() {
  // const history=useHistory();
  const basket = useSelector(selectBasket);
  const navigate = useNavigate();

  return (
    <div className="subtotal">
      <h5>Cart Totals</h5>
      <CurrencyFormat
        renderText={(value) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <p>Subtotal ({basket.length} items):</p>
              <p>
                <strong>{value}.00</strong>
              </p>
            </div>
            <span style={{ borderBottom: "1px solid black" }}></span>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <p>
                <strong style={{ color: "#4b51b5" }}>Total</strong>
              </p>
              <p>
                <strong style={{ color: "#4b51b5" }}>{value}.00</strong>
              </p>
            </div>
          </div>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"£"}
      />

      <Button onClick={() => navigate("/thankyou")} className="proceedbutton">
        Procced To checkOut
      </Button>
    </div>
  );
}

export default Subtotal;
