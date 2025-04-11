/* TODO - add your code to create a functional React component that renders a registration form */
import { useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Register({ token, setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const validateValues = (inputValues) => {
    let errors = {};

  async function handleSubmit(event) {
    event.preventDefault();
    setErrors(validateValues(username, password));
    setSubmitting(true);
    try {
      const formData = {
        username,
        password,
      };
      const response = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/register",
      );
      setToken(result.token);
      return result, setSuccessMessage(result.message);
    } catch (error) {
      console.error(error);
    }
    navigate("/");
  }

  return (
    <>
        <h2>Register</h2>
        {successMessage && (
          <p>
            {successMessage} Welcome {username}!
          </p>
        )}
        {error && <p>{error}</p>}
        {Object.keys(errors).length === 0 && submitting ? (
          <span className="success">Successfully submitted ✓</span>
        ) : null}

        <form method="POST" onSubmit={handleSubmit}>
          <label>
            Username:{" "}
            <input
              type="username"
              name="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                {
                  handleChange;
                }
              }}
            />
            {errors.username ? (
              <p className="error">
                Username should be at least 6 characters long
              </p>
            ) : null}
          </label>
          <label>
            Password:{" "}
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                {
                  handleChange;
                }
              }}
            />
            {errors.password ? (
              <p className="error">
                Password should be at least 5 characters long
              </p>
            ) : null}
          </label>
          <button type="submit" className="btn btn-outline-success">
            submit
          </button>
        </form>
    </>
  );
}}