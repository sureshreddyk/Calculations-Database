import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css"; // Tailwind or normal CSS

function App() {
  const [occupations, setOccupations] = useState([]);
  const [form, setForm] = useState({
    name: "",
    ageNextBirthday: "",
    dateOfBirth: "",
    occupation: "",
    deathSumInsured: ""
  });
  const [premium, setPremium] = useState(null);
  const [error, setError] = useState("");

  // Load occupations from backend
  useEffect(() => {
    axios
      .get("https://localhost:7203/api/Premium/occupations")
      .then((res) => {
        console.log("Occupations loaded:", res.data);
        setOccupations(res.data);
      })
      .catch((err) => {
        console.error("Error fetching occupations:", err);
        setError("Failed to load occupations. Check API connection.");
      });
  }, []);

  // Handle field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Calculate premium
  const calculatePremium = async () => {
    const { name, ageNextBirthday, dateOfBirth, occupation, deathSumInsured } = form;

    if (!name || !ageNextBirthday || !dateOfBirth || !occupation || !deathSumInsured) {
      setError("All fields are mandatory.");
      setPremium(null);
      return;
    }

    try {
      const response = await axios.post("https://localhost:7203/api/Premium/calculate", {
        name,
        ageNextBirthday: Number(ageNextBirthday),
        dateOfBirth,
        occupation,
        deathSumInsured: Number(deathSumInsured)
      });

      setPremium(response.data.premium);
      setError("");
    } catch (err) {
      console.error("Premium calculation failed:", err);
      setError("Error calculating premium.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculatePremium();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Monthly Premium Calculator
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Age Next Birthday */}
          <div>
            <label className="block font-medium">Age Next Birthday</label>
            <input
              type="number"
              name="ageNextBirthday"
              value={form.ageNextBirthday}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block font-medium">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={form.dateOfBirth}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Occupation Dropdown */}
          <div>
            <label className="block font-medium">Occupation</label>
            <select
              name="occupation"
              value={form.occupation}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">-- Select Occupation --</option>
              {occupations.map((occ, index) => (
                <option key={index} value={occ.occupationName}>
                  {occ.occupationName}
                </option>
              ))}
            </select>
          </div>

          {/* Death Sum Insured */}
          <div>
            <label className="block font-medium">Death Sum Insured</label>
            <input
              type="number"
              name="deathSumInsured"
              value={form.deathSumInsured}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Calculate Premium
          </button>
        </form>

        {/* Premium Result */}
        {premium && (
          <div className="mt-6 text-center bg-green-50 border border-green-300 p-3 rounded">
            <h3 className="text-lg font-semibold text-green-700">
              Calculated Monthly Premium: ₹{premium}
            </h3>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mt-4 text-red-600 text-center font-medium">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
