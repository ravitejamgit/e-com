import { useState } from "react";
import InputField from "./InputField";
import SubmitButton from "./SubmitBtn";
import { REGISTER_URL } from "../config";
import axios from "axios";

const validate = ({ fullName, username, email, password, confirmPassword }) => {
  const errors = {};

  if (!fullName.trim())
    errors.fullName = "Full name is required.";

  if (!username.trim())
    errors.username = "Username is required.";
  else if (username.length < 3)
    errors.username = "Username must be at least 3 characters.";

  if (!email.trim())
    errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Enter a valid email address.";

  if (!password)
    errors.password = "Password is required.";
  else if (password.length < 8)
    errors.password = "Password must be at least 8 characters.";

  if (!confirmPassword)
    errors.confirmPassword = "Please confirm your password.";
  else if (password !== confirmPassword)
    errors.confirmPassword = "Passwords do not match.";

  return errors;
};

export default function RegisterCard() {
  const [fields, setFields] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (key) => (e) =>
    setFields((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(fields);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);

    try {
      const jdata = {
        name: fields.fullName,
        email: fields.email,
        password: fields.password
      }
      //console.log(jdata);
      await axios.post(REGISTER_URL, {
        name: fields.fullName,
        email: fields.email,
        password: fields.password
      }).then(response => {
        console.log(response?.data?.message);
        setSubmitted(true)
      }).catch(err => {
        console.log(err.response?.data?.error)
        setErrors({ api: err.response?.data?.error || 'Error please check data'});
      });
    }
    catch(err) {
      //console.log(err.data);
      setErrors({ api: err.error || "API Call got error."});
    }
    finally {
      setLoading(false);
    }

  };

  if (submitted) {
    return (
      <div className="card">
        <div className="success">
          <div className="success__icon">🎉</div>
          <h2 className="success__title">Account Created!</h2>
          <p className="success__message">
            Your account has been successfully created. You can now sign in.
          </p>
          <a href="/" className="success__link">
            Go to Login →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card__header">
        <h2 className="card__title">Create an account</h2>
        <p className="card__subtitle">Fill in your details to get started.</p>
      </div>
  
      <form onSubmit={handleSubmit} className="card__form" noValidate>

        {errors.api && (
          <p className="card__api-error">{errors.api}</p>
        )}
 
        <div className="card__row">
          <InputField
            label="Full Name"
            id="fullName"
            type="text"
            value={fields.fullName}
            onChange={handleChange("fullName")}
            error={errors.fullName}
            placeholder=""
          />
          
        </div>
        <InputField
            label="Username"
            id="username"
            type="text"
            value={fields.username}
            onChange={handleChange("username")}
            error={errors.username}
            placeholder="janedoe"
        />

        <InputField
          label="Email"
          id="email"
          type="email"
          value={fields.email}
          onChange={handleChange("email")}
          error={errors.email}
          placeholder="jane@example.com"
        />

        <InputField
          label="Password"
          id="password"
          type="password"
          value={fields.password}
          onChange={handleChange("password")}
          error={errors.password}
          placeholder="Min. 8 characters"
          showToggle
        />

        <InputField
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          value={fields.confirmPassword}
          onChange={handleChange("confirmPassword")}
          error={errors.confirmPassword}
          placeholder="Repeat your password"
          showToggle
        />

        {/* <select id = "role" value={fields.role} onChange={ handleChange("role") }>
          <option value="ADMIN" >ADMIN</option>
          <option value= "CUSTOMER" >CUSTOMER</option>
        </select> */}

        <SubmitButton loading={loading} label="Create Account" />
      </form>

      <p className="card__prompt">
        Already have an account?
        <a href="/login" className="card__prompt-link">Sign in</a>
      </p>
    </div>
  );
}