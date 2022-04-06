/* 
  OBSERVER 
  known as
  PUBLISHER / SUBSCRIBER (Pub/Sub) Design Pattern
*/

// topics = {
//   ADD_ITEM: [
//     { token: 1, func: "addItem" },
//     { token: 2, func: "updateUi" },
//   ],
//   REMOVE_ITEM: [
//     { token: 3, func: "reoveItem" },
//     { tojen: 4, func: "updateLists" },
//   ],
// };

const pubsub = (function () {
  let topics = {};
  let subUid = -1;

  function subscribe(topic, func) {
    if (!topics[topic]) {
      topics[topic] = [];
    }

    let token = (++subUid).toString();
    topics[topic].push({ token: token, func: func });
    return token;
  }

  function unsubscribe(token) {
    for (let prop in topics) {
      if (topics[prop]) {
        for (let i = 0, j = topics[prop].length; i < j; i++) {
          if (topics[prop][i].token === token) {
            topics[prop].splice(i, 1);
            return token;
          }
        }
      }
    }

    return this;
  }

  function publish(topic, args) {
    if (!topics[topic]) {
      return false;
    }

    const subscribers = topics[topic];
    let length = subscribe ? subscribers.length : 0;

    while (length--) {
      subscribers[length].func(topic, args);
    }

    return this;
  }

  function showTopics() {
    console.log(topics);
  }

  return {
    subscribe: subscribe,
    unsubscribe: unsubscribe,
    publish: publish,
    showTopics: showTopics,
  };
})();

// Example 1  pub/sub

const testAddHandler = function (topic, data) {
  console.log(topic + ": " + data);
};

const testDeleteHandler = function (topic, data) {
  console.log(topic + ": " + data);
};

const testSubscripion = pubsub.subscribe("addItem", testAddHandler);
const testSubscripion2 = pubsub.subscribe("deleteItem", testDeleteHandler);

pubsub.publish("addItem", "Hello");
pubsub.publish("addItem", [1, 2, 3]);
pubsub.publish("deleteItem", "Deleted");

console.log(testSubscripion);
console.log(testSubscripion2);

pubsub.unsubscribe(testSubscripion);
pubsub.unsubscribe(testSubscripion2);
pubsub.publish("addItem", [1, 2, 3]);
pubsub.publish("deleteItem", "Deleted");

// Example 2 pub/sub

// const data = {
//   title: "Microsoft share",
//   changenet: 4,
//   percentage: 33,
//   timestamp: "17:34:12",
// };

const grid = {
  addEntry: function (data) {
    console.table(data);
  },
  updateCountr: function (timestamp) {
    console.log("Last updated at : ", timestamp);
  },
};

const gridUpdate = function (topic, data) {
  grid.addEntry(data);
  grid.updateCountr(data.timestamp);
};

pubsub.subscribe("dataUpdated", gridUpdate);

pubsub.publish("dataUpdated", {
  title: "Microsoft share",
  changenet: 4,
  percentage: 33,
  timestamp: "17:34:12",
});
pubsub.publish("dataUpdated", {
  title: "Dell shares",
  changenet: 10,
  percentage: 20,
  timestamp: "17:35:16",
});
