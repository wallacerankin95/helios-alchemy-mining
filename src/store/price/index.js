import { createSlice } from "@reduxjs/toolkit";
import {
  getEthertoUsd,
  getTitanxtoUsd,
  getHlxtoUsd
} from "./actions";

const PREFIX = "Price";

const initialState = {
  ether_to_usd: "2000",
  titanx_to_usd: "0.0000001",
  hlx_to_usd: "0.000001",
};

export const price = createSlice({
  name: PREFIX,
  initialState,
  reducers: {
    // Define reducers to set custom values
    setEtherToUsd: (state, action) => {
      state.ether_to_usd = action.payload;
    },
    setTitanxToUsd: (state, action) => {
      state.titanx_to_usd = action.payload;
    },
    setHlxToUsd: (state, action) => {
      state.hlx_to_usd = action.payload;
    },
  },
  extraReducers: (builder) => {

    builder
      .addCase(getEthertoUsd.fulfilled.type, (state, action) => {
        state.ether_to_usd = action.payload;
      })
      .addCase(getTitanxtoUsd.fulfilled.type, (state, action) => {
        state.titanx_to_usd = action.payload; // Note the correction here
      })
      .addCase(getHlxtoUsd.fulfilled.type, (state, action) => {
        state.hlx_to_usd = action.payload;
      });
  },

});

export const { setEtherToUsd, setTitanxToUsd, setHlxToUsd } = price.actions;

export default price.reducer;
