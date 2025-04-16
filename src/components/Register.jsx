import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRegisterMutation } from "./userSlice";

import { useNavigate } from "react-router-dom";

export default function Register() {
  const [registerUser] = useRegisterMutation();
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
  const validateValues = (email, password, firstname, lastname) => {
    const errors = {};
    if (!email || email.length < 6) {
      errors.email = "Username should be at least 6 characters long";
    }
    if (!password || password.length < 5) {
      errors.password = "password should be at least 5 characters long";
    }
    if (!firstname) {
      errors.firstname = "field cannot be empty";
    }
    if (!lastname) {
      errors.email = "field cannot be empty";
    }
    return errors;
  };

  // handle form submission
  async function handleSubmit(event) {
    event.preventDefault();

    // run vals and update state error
    const validationErrors = validateValues(email, password, firstname, lastname);
    setErrors(validationErrors);

    if (Object.keys(validationErrors || {}).length > 0) return;
    setSubmitting(true); // set submitting flag to true

    // try to register user using RTK mutation
    try {
      const result = await registerUser({
        firstname,
        lastname,
        email,
        password,
      }).unwrap();

      setSuccessMessage(`Registration Successfull ${result.message}`); // set success message
      navigate("/"); // navigate user to home after successfull reg
    } catch (err) {
      console.error("Failed to register", err);
      setErrors({ api: "Registration failed" });
    }
  }

  return (
    <div className="registerBackground">
      <h2>Register</h2>
      {/* Success and API error messages */}
      {successMessage && (
        <p className="text-success">
          {successMessage} Welcome {email}!
        </p>
      )}
      {error && error.api && <p className="text-danger">{error.api}</p>}

      <div className="registerContainer">
      {/* Registration Form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label"></label>
          Email:{" "}
          <input
            type="email"
            className="form-control"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state on input change
          />
          {error && error.email && (
            <div className="text-danger">{error.email}</div>
          )}
        </div>
        <div className="mb-3">
          <label>
            Password:{" "}
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {error && error.password && (
              <div className="text-danger">{error.password}</div>
            )}
          </label>
        </div>
        <div className="mb-3">
          <label>
            First Name:{" "}
            <input
              type="text"
              className="form-control"
              name="firstname"
              value={firstname}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            {error && error.firstname && (
              <div className="text-danger">{error.firstname}</div>
            )}
          </label>
        </div>
        <div className="mb-3">
          <label>
            Last Name:{" "}
            <input
              type="text"
              className="form-control"
              name="lastname"
              value={lastname}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
            {error && error.lastname && (
              <div className="text-danger">{error.lastname}</div>
            )}
          </label>
        </div>
        <button type="submit" className="btn btn-outline-dark">
          submit
        </button>
      </form>
      </div>
      {/* Show confirmation if no validation errors and form is being submitted */}
      {error && Object.keys(error).length === 0 && submitting && (
        <span className="text-success">Successfully submitted ✓</span>
      )}
    </div>
  );
}
