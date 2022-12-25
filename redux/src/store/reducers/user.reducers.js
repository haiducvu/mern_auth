const initialStateUser = [];

function userReducer(state = initialStateUser, action) {
  switch (action.type) {
    case "GET_USER_LIST":
      return [...action.payload];
    default:
      return state;
  }
}

export default userReducer;
