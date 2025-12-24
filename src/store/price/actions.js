import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getEthertoUsd = createAsyncThunk("get/getEtherToUsd", async () => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`);
    return response.data.ethereum.usd;
  } catch (error) {
    return error.response.data;
  }
}
);

export const getTitanxtoUsd = createAsyncThunk("get/getTitanXToUsd", async () => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=TITANX&vs_currencies=usd`);
    return response.data.titanx.usd;
  } catch (error) {
    return error.response.data;
  }
});

export const getHlxtoUsd = createAsyncThunk("get/getHLXToUsd", async () => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=hlx&vs_currencies=usd`);
    return response.data.hlx.usd;
  } catch (error) {
    return error.response.data;
  }
});
