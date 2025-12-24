/** @format */

import { configureStore } from "@reduxjs/toolkit";
import price from "./price";

const store = configureStore({
  reducer: {
    price: price,
  },
});

export default store;