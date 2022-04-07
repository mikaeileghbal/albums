import cart from "./cart.js";
import actions from "./actions.js";
import pubsub from "./pubsub.js";

window.addEventListener("DOMContentLoaded", init);

function init() {
  const btnAddToCart = document.getElementById("addCart");
  const btnRemoveFromCart = document.getElementById("removeCart");
  const shoppingCart = document.getElementById("cart");

  btnAddToCart.addEventListener("click", addToCart);
  btnRemoveFromCart.addEventListener("click", removeFromCart);

  function addToCart(event) {
    console.log("clicked");
    pubsub.publish(actions.ADD_ITEM, {
      title: "Thriller",
      year: 1982,
      price: 30.0,
      count: 1,
    });
  }

  function removeFromCart(event) {}
}
