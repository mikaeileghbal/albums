import pubsub from "./pubsub.js";
import actions from "./actions.js";

const cart = {
  orders: [],
  add: function (item) {
    this.orders.push(item);
    console.log(this.orders);
  },
  remove: function (item) {},
  getCart: function () {
    return this.orders;
  },
};

const album = {
  addToCart: function (item) {
    cart.add(item);
  },
  removeFromCart: function (item) {
    console.log("Delete from cart: " + item);
  },
};

function updateCart(topic, data) {
  switch (topic) {
    case actions.ADD_ITEM:
      console.log("Add called");
      album.addToCart(data);
      break;

    case actions.REMOVE_ITEM:
      console.log("Remove called");
      album.removeFromCart(data);
      break;
  }
  return cart.getCart();
}

export default album;

pubsub.subscribe(actions.ADD_ITEM, updateCart);
pubsub.subscribe(actions.REMOVE_ITEM, updateCart);
