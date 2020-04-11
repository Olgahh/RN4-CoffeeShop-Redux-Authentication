import { combineReducers } from "redux";

import coffeeshops from "./coffeeshops";
import cart from "./cart";
import user from "./user";

export default combineReducers({ coffeeshops, cart, user });
