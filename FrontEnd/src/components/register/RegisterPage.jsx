// import React, { useState } from "react";
// import "./register.css";

// export default function Register() {
//   const [formData, setFormData] = useState({
//     full_name: "",
//     email: "",
//     phone: "",
//     password: "",
//     role: "Viewer",
//   });

//   const [confirmPassword, setConfirmPassword] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "confirmPassword") {
//       setConfirmPassword(value);
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     const response = await fetch("/user/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });

//     if (response.ok) {
//       alert("Registration successful!");
//       setFormData({
//         full_name: "",
//         email: "",
//         phone: "",
//         password: "",
//         role: "Viewer",
//       });
//       setConfirmPassword("");
//     } else {
//       alert("Registration failed.");
//     }
//   };

//   return (
//     <div className="main">
//       <div className="register-container">
//         <form className="register-form" onSubmit={handleSubmit}>
//           <label>Full Name</label>
//           <input
//             type="text"
//             name="full_name"
//             placeholder="Enter your full name..."
//             value={formData.full_name}
//             onChange={handleChange}
//             required
//           />

//           <label>Email address</label>
//           <input
//             type="email"
//             name="email"
//             placeholder="Enter your email address..."
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />

//           <label>Phone</label>
//           <input
//             type="text"
//             name="phone"
//             placeholder="Enter your phone number..."
//             value={formData.phone}
//             onChange={handleChange}
//             required
//           />

//           <label>Password</label>
//           <input
//             type="password"
//             name="password"
//             placeholder="Enter your password..."
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />

//           <label>Confirm Password</label>
//           <input
//             type="password"
//             name="confirmPassword"
//             placeholder="Enter your password again..."
//             value={confirmPassword}
//             onChange={handleChange}
//             required
//           />

//           <button type="submit" className="register-button">
//             Sign up
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

//////////////////////////////////////////////


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

export default function Register() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    role: "Viewer",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate(); // navigate to other pages

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (formData.password !== confirmPassword) {
  //     alert("Passwords do not match!");
  //     return;
  //   }

  //   const response = await fetch("/user/register", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(formData),
  //   });

  //   if (response.ok) {
  //     alert("המשתמש נוצר בהצלחה!"); // user created successfully in Hebrew
  //     setFormData({
  //       full_name: "",
  //       email: "",
  //       phone: "",
  //       password: "",
  //       role: "Viewer",
  //     });
  //     setConfirmPassword("");

  //     navigate("/"); // move to home page after registration
  //   } else {
  //     alert("Registration failed.");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[^\w\s]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      alert(
        "Password must be at least 8 characters long, contain at least one number, and one symbol."
      );
      return;
    }

    const response = await fetch("/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
//הבנה כבר מוכן לכן אולי מיותר
    if (response.ok) {
      alert("User created successfully");
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        password: "",
        role: "Viewer",
      });
      setConfirmPassword("");
      navigate("/");
    } else {
      alert("Registration failed.");
    }
  };

  return (
    <div className="main">
      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            name="full_name"
            placeholder="Enter your full name..."
            value={formData.full_name}
            onChange={handleChange}
            required
          />

          <label>Email address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address..."
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Phone</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter your phone number..."
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password..."
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Enter your password again..."
            value={confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit" className="register-button">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}
