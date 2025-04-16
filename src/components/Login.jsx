import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetLoginMutation } from "./userSlice";

export default function Login() {
  const [loginUser] = useGetLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [error, setErrors] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const validateValues = (email, password) => {
    const errors = {};
    if (!email || email.length < 6) {
      errors.email = "Username should be at least 6 characters long";
    }
    if (!password || password.length < 5) {
      errors.password = "password should be at least 5 characters long";
    }
    return errors;
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateValues(email, password);
    setErrors(validationErrors);

    if (Object.keys(validationErrors || {}).length > 0) return;
    setSubmitting(true); // set submitting flag to true

    try {
      const result = await loginUser({
        email,
        password,
      }).unwrap();

      setSuccessMessage(`Sign in Successfull ${result.message}`); // set success message
      navigate("/"); // navigate user to home after successfull reg
    } catch (err) {
      console.error("Failed to login", err);
      setErrors({ api: "login failed" });
    }
  }
  return (
    <div className="signInContainer">
      <h4 className="signIn">Please sign in</h4>
      {successMessage && (
        <p className="text-success">{successMessage} Welcome!</p>
      )}
      {error && error.api && <p className="text-danger">{error.api}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="fw-light">Email</label>
            <input
              type="email"
              value={email}
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit" className="btn btn-outline-dark">
          Submit
        </button>
      </form>
    </div>
  );
}