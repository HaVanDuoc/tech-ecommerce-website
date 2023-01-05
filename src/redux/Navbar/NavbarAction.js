import { GET_INDEX } from "./NavbarConstant";

export const GetIndex = (index) => ({
  type: GET_INDEX,
  payload: index,
});
