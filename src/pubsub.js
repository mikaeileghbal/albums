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

export default pubsub;
