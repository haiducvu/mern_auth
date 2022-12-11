import { combineReducers, createStore } from "redux";

import authReducer from "./reducers/auth.reducers";
import userReducer from "./reducers/user.reducers";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
