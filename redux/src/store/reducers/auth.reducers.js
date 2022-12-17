const initialStateAuth = {
  isLogin: false,
  user: {},
};

function authReducer(state = initialStateAuth, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      const newState = {
        ...state,
        isLogin: true,
        user: action.payload,
      };
      return newState;
    default:
      return state;
  }
}

export default authReducer;
