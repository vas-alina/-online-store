// import { transformUser } from "../transformers";

export const getOrders = () =>
  fetch("http://localhost:3010/orders")
    .then((loadedOrders) => loadedOrders.json())
    // .then((loadedOrders) => loadedOrders && loadedOrders.map(transformUser));