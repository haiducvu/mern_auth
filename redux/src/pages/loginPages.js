import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    setUserInput({
      ...userInput,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    const response = await axios.post("api/auth/login", userInput);

    // save user login in store

    if (response.status === 200) {
      const accessToken = response.data.accessToken;
      const userLogin = jwtDecode(accessToken);
      // console.log(userLogin, "userLogin");
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: userLogin,
      });
      localStorage.setItem("accessToken", accessToken);
      if (userLogin.role === "regular") {
        navigate("/admin");
      } else {
        // redirect to home page
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-logo">
          <a href="https://github.com">
            <b>Admin</b>LTE
          </a>
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Sign in to start your session</p>

            <form onSubmit={handleSubmitLogin}>
              <div className="input-group mb-3">
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={userInput.email}
                  name="email"
                  onChange={handleInputChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={userInput.password}
                  name="password"
                  onChange={handleInputChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    Sign In
                  </button>
                </div>
              </div>
            </form>

            <div className="social-auth-links text-center mb-3">
              <p>- OR -</p>
              <a
                href="https://github.com"
                className="btn btn-block btn-primary"
              >
                <i className="fab fa-facebook mr-2"></i> Sign in using Facebook
              </a>
              <a href="https://github.com" className="btn btn-block btn-danger">
                <i className="fab fa-google-plus mr-2"></i> Sign in using
                Google+
              </a>
            </div>

            <p className="mb-1">
              <a href="https://github.com">I forgot my password</a>
            </p>
            <p className="mb-0">
              <Link to="/register" className="text-center">
                Register a new membership
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
