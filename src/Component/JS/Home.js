import React, { useState } from "react";
import "../CSS/Home.css";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Button } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Category from "../../Category";
import { useDispatch } from "react-redux";
import { ADD_TO_BASKET, REMOVE_FROM_BASKET } from "../../features/basketSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productData, setproductData] = useState(Category);
  const [typesProduct, settypesProduct] = useState("");
  const [sizeProduct, setsizeProduct] = useState("");
  const [searchData, setsearchData] = useState("");

  const filterProduct = (types) => {
    const result = Category.filter((curData) => {
      return curData.category == types.toLowerCase();
    });
    setproductData(result);
  };

  const filterProductSize = (types) => {
    const result = Category.filter((curData) => {
      if (typesProduct !== null) {
        return (
          curData.category == typesProduct.toLowerCase() &&
          curData.size == types
        );
      } else {
        return curData.size == types;
      }
    });
    setproductData(result);
  };

  const getChckeboxValue = (countData, item) => {
    dispatch(
      ADD_TO_BASKET({
        id: item.id,
        name: item.name,
        category: item.category,
        size: item.size,
        price: item.price,
        stock: item.stock,
        image: item.image,
        color: item.color,
        description: item.description,
        gender: item.gender,
        quantity: countData,
      })
    );
  };

  return (
    <div className="Home_main">
      <div className="home_cat">
        <div className="home_catleft">
          <div className="home_catleft1">
            <select
              value={typesProduct}
              onChange={(e) => {
                if (e.target.value != "---") {
                  settypesProduct(e.currentTarget.value);
                  filterProduct(e.currentTarget.value);
                } else {
                  setproductData(Category);
                }
              }}
              placeholder="Sort by"
            >
              <option className="option" value="---">
                ---
              </option>
              <option className="option" value="Hoodies">
                Hoodies
              </option>
              <option className="option" value="Shirts">
                Shirts
              </option>
              <option className="option" value="Tshirts">
                Tshirts
              </option>
              <option className="option" value="Jeans">
                Jeans
              </option>
            </select>
          </div>
          <div className="home_catleft2">
            <select
              value={sizeProduct}
              onChange={(e) => {
                if (e.target.value != "---") {
                  setsizeProduct(e.currentTarget.value);
                  filterProductSize(e.currentTarget.value);
                } else {
                  setproductData(Category);
                }
              }}
              placeholder="Sort by"
            >
              <option className="option" value="---">
                ---
              </option>
              <option className="option" value="S">
                S
              </option>
              <option className="option" value="M">
                M
              </option>
              <option className="option" value="L">
                L
              </option>
              <option className="option" value="XL">
                XL
              </option>
              <option className="option" value="XXL">
                XXL
              </option>
            </select>
          </div>
          <div className="reset_btn">
            <Button
              onClick={() => {
                setproductData(Category);
                setsearchData("");
                setsizeProduct("");
                settypesProduct("");
              }}
            >
              <RestartAltIcon />
              Reset
            </Button>
          </div>
        </div>
        <div className="home_catright">
          <input
            style={{
              height: "40px",
              display: "flex",
              alignContent: "center",
              justifyContent: "space-between",
              backgroundColor: "#f2f2f2",
            }}
            className="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => setsearchData(e.target.value)}
            value={searchData}
          />
          <Button
            onClick={() => {
              navigate("/cart/checkout");
              toast.success("Product Added To Basket", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
              });
            }}
          >
            ADD TO CART
          </Button>
        </div>
      </div>
      <div className="home_product">
        <table className="table home_table">
          <thead style={{ textAlign: "center", color: "#7f7f7f" }}>
            <tr>
              <th scope="col">image</th>
              <th scope="col">Name</th>
              <th scope="col">Color</th>
              <th scope="col">Stock</th>
              <th scope="col">Price</th>
              <th scope="col">Buy</th>
            </tr>
          </thead>
          <tbody className="home_productrow">
            {productData
              ?.filter((item) => {
                if (searchData == "") {
                  return item;
                } else if (
                  item.category.toLowerCase().includes(searchData.toLowerCase())
                ) {
                  return item;
                }
              })
              ?.map((item) => {
                var countData = 1;
                return (
                  <>
                    <tr
                      key={item.id}
                      style={{
                        textAlign: "center",
                        fontSize: "18px",
                        fontWeight: "400",
                      }}
                    >
                      <td scope="row" className="image_th">
                        <img
                          className="product_image"
                          src={item.image}
                          alt=""
                        />
                      </td>
                      <td style={{ width: "150px", color: "#56c0da" }}>
                        {item.name}
                        <br></br>
                        {/* {item.description} */}
                      </td>
                      <td style={{ color: "#56c0da" }}>{item.color}</td>
                      <td
                        style={{
                          display: "flex",
                          alignItems: "center",
                          color: `${item.stock == 0 ? "red" : "#1b8758"}`,
                          fontSize: "18px",
                          justifyContent: "center",
                        }}
                      >
                        <SentimentSatisfiedAltIcon />
                        {item.stock == 0 ? "Out stock" : "In Stock"}
                      </td>
                      <td style={{ color: "#56c0da" }}>£{item.price}.00</td>
                      <td>
                        <div className="procust_basket">
                          <input
                            type="number"
                            min={1}
                            onChange={(e) => (countData = e.target.value)}
                          />
                          <div className="homebasket_icons">
                            <Button>
                              <ShoppingBasketIcon />
                            </Button>
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              id="vehicle1"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  if (countData <= item.stock) {
                                    getChckeboxValue(countData, item);
                                  } else {
                                    console.log("warning Print");
                                    toast.warning("Product is not in Stock", {
                                      position: "top-right",
                                      autoClose: 5000,
                                      hideProgressBar: false,
                                      closeOnClick: true,
                                      pauseOnHover: false,
                                      draggable: true,
                                      progress: undefined,
                                    });
                                  }
                                } else {
                                  dispatch(REMOVE_FROM_BASKET(item.id));
                                }
                              }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Home;
