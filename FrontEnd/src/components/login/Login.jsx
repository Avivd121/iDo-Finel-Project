// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./login.css";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const request = fetch("/user/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     request
//       .then((response) =>
//         response.json().then((data) => ({ ok: response.ok, data }))
//       )
//       .then(({ ok, data }) => {
//         if (ok) {
//           navigate("/main");
//         } else {
//           setError(data.message || "Invalid email or password");
//         }
//       })
//       .catch(() => {
//         setError("Something went wrong. Please try again.");
//       });
//   };

//   const handleRegisterClick = () => {
//     navigate("/register");
//   };

//   return (
//     <div className="login-background">
//       <form onSubmit={handleSubmit} className="login-form">
//         <h1 className="login-title">Login</h1>

//         {error && <p className="error-message">{error}</p>}

//         <div className="form-group">
//           <label>Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>

//         <button type="submit" className="login-button">
//           Login
//         </button>

//         <p className="register-link">
//           Not registered?{" "}
//           <span onClick={handleRegisterClick} className="register-anchor">
//             Click here to register!
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) =>
        response.json().then((data) => ({ ok: response.ok, data }))
      )
      .then(({ ok, data }) => {
        if (ok) {
          alert("User logged in successfully!"); // ✅ success message
          navigate("/main");
        } else {
          setError(data.message || "Invalid email or password");
        }
      })
      .catch(() => {
        setError("Something went wrong. Please try again.");
      });
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="login-background">
      <form onSubmit={handleSubmit} className="login-form">
        <h1 className="login-title">Login</h1>

        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-button">
          Login
        </button>

        <p className="register-link">
          Not registered?{" "}
          <span onClick={handleRegisterClick} className="register-anchor">
            Click here to register!
          </span>
        </p>
      </form>
    </div>
  );
}