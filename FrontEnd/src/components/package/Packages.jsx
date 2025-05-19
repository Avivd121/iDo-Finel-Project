import React from "react";
import "../package/packages.css";
import { useNavigate } from "react-router-dom";

const packages = [
  {
    id: 1,
    image: "/img1.jpg",
    options: ["צלם", "זיקוקים", "זרי פרחים", "שטיח", "פינת לחיים", "נורות לד","מערכת הגברה"],
  },
  {
    id: 2,
    image: "/img2.jpg",
    options: ["צלם", "זיקוקים", "זרי פרחים", "שטיח", "פינת לחיים", "נורות לד","מערכת הגברה"],
  },
  {
    id: 3,
    image: "/img3.jpg",
    options: ["צלם", "זיקוקים", "זרי פרחים", "שטיח", "פינת לחיים", "נורות לד","מערכת הגברה"],
  },
];

const Packages = () => {
  const navigate = useNavigate();

  const handleBook = () => {
    navigate("/booking");
  };

  return (
    <div className="packages-page">
      <h1>iDo</h1>
      <div className="packages-container">
        {packages.map((pkg) => (
          <div key={pkg.id} className="package-card">
            <img src={pkg.image} alt={`Package ${pkg.id}`} />
            <div className="options">
              {pkg.options.map((opt, i) => (
                <label key={i}>
                  <input type="checkbox" /> {opt}
                </label>
              ))}
            </div>
            <button onClick={handleBook}>הזמן</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;
