/* TODO - add your code to create a functional React component that renders a registration form */
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRegisterUserMutation } from "../components/userSlice"; 
import { useNavigate } from "react-router-dom";

export default function Register({ setToken }) {
  const registerUser = useRegisterUserMutation();

  // states to manage user inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");

  // State to handle errors,
  const [error, setErrors] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate(); // hook to navigate

  //form validation function to validate user input for username and pass to meet min reqs
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

  // handle form submission
  async function handleSubmit(event) {
    event.preventDefault();

    // run vals and update state error
    const validationErrors = validateValues(email, password);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;
    setSubmitting(true); // set submitting flag to true

    // try to register user using RTK mutation
    try {
      const result = registerUser({
        firstname,
        lastname,
        email,
        password,
      }).unwrap();

      // save token in both app state and localStorage
      setToken(result.token); // app state

      localStorage.setItem("token", result.token); // local storage

      // to prevent user logged out after refresh.
      useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) setToken(storedToken);
      }, []);

      //***{ Runs every time token changes (because it's in the dependency array).

      // If there's a valid token, it saves it into localStorage.

      // So that anytime a user logs in or registers and receives a new token:
      // It gets persisted across sessions.

      // It can be loaded again later (by the first useEffect).}
      useEffect(() => {
        if (token) localStorage.setItem("token", token);
      }, [token]); // due to dependency array it runs everytime token changes.

      setSuccessMessage(`Registration Successfull ${result.message}`); // set success message
      navigate("/"); // navigate user to home after successfull reg
    } catch (err) {
      console.error("Failed to register", err);
      setErrors({ api: "Registration failed" });
    }
  }

  return (
    <div className="container">
      <h2>Register</h2>
      {/* Success and API error messages */}
      {successMessage && (
        <p className="text-success">
          {successMessage} Welcome {email}!
        </p>
      )}
      {error.api && <p className="text-danger">{error.api}</p>}

      {/* Registration Form */}
      <form method="POST" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label"></label>
          email:{" "}
          <input
            type="email"
            className="form-control"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state on input change
          />
        </div>
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
    </div>
  );
}
