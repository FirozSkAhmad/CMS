import "./Login.css";
import { useState } from "react";

const Login = () => {
//   const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState();

  const onChangeInput = (e) => {
    console.log(e.target.checked);
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "rememberMe":
        setRememberMe(e.target.checked);
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="login_pg">
      <h3>ProSquad</h3>
      <div>
        <h4>Login</h4>
        <form onSubmit={handleSubmit} className="login_con">
          <div className="input__Fld">
            <input
              type="email"
              value={email}
              onChange={onChangeInput}
              placeholder="Email"
              required
              autoComplete="off"
              name="email"
            />
          </div>
          <div className="input__Fld">
            <input
              type="password"
              value={password}
              onChange={onChangeInput}
              placeholder="Password"
              required
              autoComplete="off"
              name="password"
            />
          </div>
          <div className="rem__Div">
            <div className="rm_Pass">
              <label>
                <input
                  name="rememberMe"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={onChangeInput}
                />{" "}
                <p>Remember me</p>
              </label>
            </div>
            <div className="frg__Pas">
              <p onClick={""}>Forgot password</p>
            </div>
          </div>
          <div>
            {/* <span style={{ color: "red" }}>{error}</span> */}
          </div>
          <div className="sbt__Btn">
            <button type="submit">Login</button>
          </div>
        </form>
        <div className="ck__Act">
          <p>©2023 Prosquad. All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
