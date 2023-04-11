import { TatCa } from "./reducer";

export const FetchOrders = (tab, orders) => {
  return {
    type: tab || TatCa, // default is tab `Tất cả`
    payload: orders,
  };
};
