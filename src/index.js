import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";

import { HashRouter } from "react-router-dom";

import { ShoesContextProvider } from "./Context/DataContext";
import { FilterContextProvider } from "./Context/FiltersContext";
import { AuthContextProvider } from "./Context/AuthContext";
import { CartContextProvider } from "./Context/CartContext";
import { WishListContextProvider } from "./Context/WishListContext";
import { AddressContextProvider } from "./Context/AddressContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <AuthContextProvider>
        <ShoesContextProvider>
          <CartContextProvider>
            <WishListContextProvider>
              <FilterContextProvider>
                <AddressContextProvider>
                  <App />
                </AddressContextProvider>
              </FilterContextProvider>
            </WishListContextProvider>
          </CartContextProvider>
        </ShoesContextProvider>
      </AuthContextProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
