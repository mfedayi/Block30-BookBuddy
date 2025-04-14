// add import Login from "...." to App.jsx and put within app ( <Login /> )
import "bootstrap/dist/css/bootstrap.min.css"; // <--- is this redundant?
import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = Navigate;

  const submit = (e) => {
    e.preventDefault();
    const obj = {
      user,
      password,
    };
    console.log(obj);
  };
  return (
    <div className="signInContainer">
      <h2 className="signIn">Welcome!</h2>
      <h4 className="signIn">Please sign in</h4>
      <form onSubmit={submit}>
        <div className="form-group">
          <label className="fw-light">Email address</label>
          <input
            type="email"
            value={user}
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            className="form-control"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-secondary">
          Submit
        </button>
      </form>
    </div>
  );
}

