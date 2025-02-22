import "./ProductDetails.css";

import { NavLink } from "react-router-dom";
import { useRef } from "react";

import { useShoesContext } from "../../Context/DataContext";
import { useCartContext } from "../../Context/CartContext";
import { useWishListContext } from "../../Context/WishListContext";
import { useParams } from "react-router-dom";

import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export const ProductDetail = () => {
  const productDetailRef = useRef();
  const { addToCart, isPresentInCart } = useCartContext();
  const { addToWishList, isPresentInWishList, removeFromWishlist } =
    useWishListContext();
  const { state } = useShoesContext();
  const { shoeId } = useParams();

  const findShoe = state?.shoesData?.find((item) => item?._id == shoeId);

  const delayHandler = (actionHandler, duration) => {
    clearTimeout(productDetailRef.current);
    productDetailRef.current = setTimeout(() => {
      actionHandler(findShoe);
    }, duration);
  };
  const delayHandleRemoveWishlist = (actionHandler, duration) => {
    clearTimeout(productDetailRef.current);
    productDetailRef.current = setTimeout(() => {
      actionHandler(findShoe?._id);
    }, duration);
  };

  return (
    <div className="product_detail">
      <div className="img_container">
        <img src={findShoe?.image} alt="shoes" />
        {isPresentInWishList(findShoe) === -1 ? (
          <button
            className="add_to_wishlist"
            onClick={() => delayHandler(addToWishList, 600)}
          >
            <FavoriteOutlinedIcon />
          </button>
        ) : (
          <button
            className="remove_wishlist"
            onClick={(e) => {
              delayHandleRemoveWishlist(removeFromWishlist, 600);
            }}
          >
            <FavoriteOutlinedIcon></FavoriteOutlinedIcon>
          </button>
        )}
        <button className="star_rating">
          <StarRateRoundedIcon />
          {findShoe?.rating}
        </button>
      </div>
      <div className="shoes_details">
        <h2 className="shoe_detail_brand">{findShoe?.brand}</h2>
        <h4
          className="shoe_detail_name"
          style={{
            fontFamily: "Rokkitt, Georgia, serif",
          }}
        >
          {findShoe?.name}
        </h4>
        <h4
          className="shoe_detail_name"
          style={{
            fontFamily: "Rokkitt, Georgia, serif",
          }}
        >
          {findShoe?.description}
        </h4>
        <h4 style={{ fontFamily: "Rokkitt, Georgia, serif" }}>
          {" "}
          Reviews :{" "}
          <span style={{ fontSize: "1rem", fontWeight: "500" }}>
            {findShoe?.reviews}
          </span>
        </h4>
        <h4 style={{ fontFamily: "Rokkitt, Georgia, serif" }}>
          {" "}
          For :{" "}
          <span style={{ fontSize: "1rem", fontWeight: "500" }}>
            {findShoe?.gender}
          </span>
        </h4>
        <div className="product_detail_prices">
          <p
            style={{ fontSize: "1.5rem", fontWeight: "700", color: "#16a34a" }}
          >
            ₹{findShoe?.price}
          </p>
          <p
            style={{
              fontSize: "1.2rem",
              fontWeight: "700",
              textDecoration: "line-through",
              color: "red",
            }}
          >
            ₹{findShoe?.originalPrice}
          </p>
        </div>
        <h4 style={{ fontFamily: "Rokkitt, Georgia, serif" }}>
          Raw:{" "}
          <span style={{ fontSize: "1rem", fontWeight: "500" }}>
           {<pre>{JSON.stringify(findShoe, null, 2)}</pre>}
          </span>
        </h4>
        {/* <h4 style={{ fontFamily: "Rokkitt, Georgia, serif" }}>
          Delivery:{" "}
          <span style={{ fontSize: "1rem", fontWeight: "500" }}>
            {findShoe?.delivery}
          </span>
        </h4> */}
        {isPresentInCart(findShoe) !== -1 ? (
          <button className="go_to_cart">
            {" "}
            <ShoppingCartIcon /> <NavLink to="/cart">Go to cart</NavLink>
          </button>
        ) : (
          <button
            className="add_cart"
            onClickCapture={() => delayHandler(addToCart, 600)}
          >
            {" "}
            <ShoppingCartIcon /> Add to cart
          </button>
        )}
      </div>
    </div>
  );
};
