import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function NavComponent() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    // axios.get("api/auth/me");
    async function getuserLogin() {
      const response = await axios.get("api/auth/me");
      const user = response.data;
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });
    }

    getuserLogin();
  }, []);

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item d-none d-sm-inline-block">
          <button type="button" className="btn btn-primary">
            Logout
          </button>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item mr-3">
          <h1 className="btn btn-success">{authState.user.username}</h1>
        </li>
      </ul>
    </nav>
  );
}

export default NavComponent;
