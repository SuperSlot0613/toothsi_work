import React from "react";
import "../CSS/Header.css";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import PersonIcon from "@mui/icons-material/Person";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import $ from "jquery";
import { useNavigate } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const xwidth = window.screen.width;

  return (
    <div className="navbar_body">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => $(".navbar-collapse").show("slide")}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse navbar_main"
            id="navbarNavDropdown"
            onClick={() => {
              if (xwidth <= 990) {
                $(".navbar-collapse").toggle(500, "linear");
              }
            }}
          >
            <ul className="navbar-nav">
              <li className="nav-item nav_items" onClick={() => navigate("/")}>
                <a className="nav-link active" aria-current="page">
                  Home
                </a>
              </li>
              <form className="d-flex form_tag">
                <input
                  className="form-control me-2 search_input"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button
                  className="btn btn-outline-success search_btn"
                  type="submit"
                >
                  Search
                </button>
              </form>
              <div className="basket_icons">
                <li className="nav-item nav_icons">
                  <PersonIcon />
                  <span>Profile</span>
                </li>
                <li className="nav-item nav_icons">
                  <ShoppingBasketIcon
                    onClick={() => navigate("/cart/basket")}
                    />
                    <span>Basket</span>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
