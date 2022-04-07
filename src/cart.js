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

function updateCart(topic, data) {
  switch (topic) {
    case actions.ADD_ITEM:
      console.log("Add called");
      cart.add(data);
      break;

    case actions.REMOVE_ITEM:
      console.log("Remove called");
      cart.remove(data);
      break;
  }
}

export default cart;

pubsub.subscribe(actions.ADD_ITEM, updateCart);
pubsub.subscribe(actions.REMOVE_ITEM, updateCart);
