import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DECREASE_ITEM_QUANTITY,
  INCREASE_ITEM_QUANTITY,
  REMOVE_FROM_BASKET,
  selectBasket,
} from "../../features/basketSlice";
import "../CSS/ProductCheckout.css";
import Subtotal from "./Subtotal";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

function ProductCheckout() {
  const dispatch = useDispatch();
  const basket = useSelector(selectBasket);

  return (
    <div className="basket">
      <div className="checkout_left">
        <div>
          <table className="table product_table">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Subtotal</th>
              </tr>
            </thead>
            <tbody className="product_productrow">
              {basket?.map((item) => (
                <>
                  <tr style={{ textAlign: "center" }}>
                    <td scope="row" className="productimage_th">
                      <div className="product_option">
                        <CloseIcon
                          onClick={() => dispatch(REMOVE_FROM_BASKET(item.id))}
                          className="close_btn"
                        />
                        <img
                          className="product_image"
                          src={item.image}
                          alt=""
                        />
                        <h5
                          style={{
                            fontSize: "14px",
                            color: "black",
                            fontWeight: "600",
                            margin: "10px",
                            color: "#6c7bbf",
                          }}
                        >
                          {item.description}
                        </h5>
                      </div>
                    </td>
                    <td>
                      <div
                        style={{
                          marginTop: "30px",
                          fontSize: "14px",
                          color: "black",
                          fontWeight: "600",
                          color: "#6c7bbf",
                        }}
                      >
                        £{item.price}.00
                      </div>
                    </td>
                    <td>
                      <div
                        className="quantity_btn"
                        style={{
                          marginTop: "20px",
                        }}
                      >
                        <div className="quantity">
                          <RemoveIcon
                            className="qtn_btn"
                            onClick={() =>
                              dispatch(DECREASE_ITEM_QUANTITY(item.id))
                            }
                          />
                          <span
                            style={{
                              fontSize: "14px",
                              color: "black",
                              fontWeight: "600",
                            }}
                          >
                            {item.quantity}
                          </span>
                          <AddIcon
                            onClick={() =>
                              dispatch(INCREASE_ITEM_QUANTITY(item.id))
                            }
                            className="qtn_btn"
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ marginTop: "30px" }}>
                        <span
                          style={{
                            fontSize: "14px",
                            color: "black",
                            fontWeight: "600",
                            color: "#6c7bbf",
                          }}
                        >
                          £{item.quantity * item.price}.00
                        </span>
                      </div>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default ProductCheckout;
