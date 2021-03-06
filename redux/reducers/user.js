import { SET_CURRENT_USER } from "../actions/types";

const initialState = null;
//set state as user object
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
