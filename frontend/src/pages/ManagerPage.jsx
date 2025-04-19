import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const meals = ["breakfast", "lunch", "snacks", "dinner"];

const ManagerPage = () => {
  const [mess, setMess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "manager") {
      navigate("/");
      return;
    }

    API.get("/mess")
      .then((res) => setMess(res.data))
      .catch(() => navigate("/"));
  }, []);

  const handleChange = (day, meal, value) => {
    const updated = { ...mess };
    updated.schedule[day][meal] = value;
    setMess(updated);
  };

  const saveChanges = async () => {
    try {
      await API.put(`/mess/schedule`, {
        schedule: mess.schedule,
      });
      alert("Menu updated successfully!");
    } catch (err) {
      alert("Error saving menu.", err);
    }
  };

  if (!mess) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Menu - {mess.name}</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Day</th>
              {meals.map((meal) => (
                <th key={meal} className="p-2 border capitalize">
                  {meal}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day) => (
              <tr key={day}>
                <td className="border p-2 font-semibold">{day}</td>
                {meals.map((meal) => (
                  <td className="border p-1" key={meal}>
                    <input
                      className="w-full p-1 border rounded"
                      value={mess.schedule[day][meal]}
                      onChange={(e) => handleChange(day, meal, e.target.value)}
                      placeholder="Enter item"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={saveChanges}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save Changes
      </button>
    </div>
  );
};

export default ManagerPage;
