import { RECENT } from "./constant";

export const Recent = (recent) => {
  return {
    type: RECENT,
    payload: recent,
  };
};
