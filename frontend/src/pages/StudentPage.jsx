import { useEffect, useState } from "react";
import API from "../api/axios";
import InstallButton from "../components/InstallButton";

// Utility to get today's day name
const getToday = () => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[new Date().getDay()];
};

const StudentPage = () => {
  const [messes, setMesses] = useState([]);
  const [selectedMess, setSelectedMess] = useState(null);
  const [selectedDay, setSelectedDay] = useState(getToday());
  const [menuData, setMenuData] = useState(null);

  // Fetch messes on load
  useEffect(() => {
    const fetchMesses = async () => {
      try {
        const res = await API.get("/student/messes");
        setMesses(res.data);
        setSelectedMess(res.data[0]?._id); // Default to first mess
      } catch (err) {
        console.error("Failed to fetch messes", err);
      }
    };
    fetchMesses();
  }, []);

  // Fetch menu when mess or day changes
  useEffect(() => {
    const fetchMenu = async () => {
      if (selectedMess && selectedDay) {
        try {
          const res = await API.get(
            `/student/schedule/${selectedMess}/${selectedDay}`
          );
          setMenuData({ day: selectedDay, schedule: res.data });
        } catch (err) {
          console.error("Failed to fetch menu", err);
        }
      }
    };
    fetchMenu();
  }, [selectedMess, selectedDay]);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Mess Menu</h1>

      <div className="flex gap-4 flex-wrap justify-center mb-6">
        {/* Mess selection dropdown */}
        <select
          className="p-2 border rounded"
          onChange={(e) => setSelectedMess(e.target.value)}
          value={selectedMess || ""}
        >
          {messes.map((mess) => (
            <option key={mess._id} value={mess._id}>
              {mess.name}
            </option>
          ))}
        </select>

        {/* Day selection dropdown */}
        <select
          className="p-2 border rounded"
          onChange={(e) => setSelectedDay(e.target.value)}
          value={selectedDay}
        >
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>

      {/* Menu display */}
      {menuData ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Day: {menuData.day}
          </h2>
          <ul className="space-y-2">
            <li>
              <strong>Breakfast:</strong>{" "}
              {menuData.schedule.breakfast?.join(", ") || "Not set"}
            </li>
            <li>
              <strong>Lunch:</strong>{" "}
              {menuData.schedule.lunch?.join(", ") || "Not set"}
            </li>
            <li>
              <strong>Snacks:</strong>{" "}
              {menuData.schedule.snacks?.join(", ") || "Not set"}
            </li>
            <li>
              <strong>Dinner:</strong>{" "}
              {menuData.schedule.dinner?.join(", ") || "Not set"}
            </li>
          </ul>
        </div>
      ) : (
        <p className="text-center">Loading schedule...</p>
      )}

      <InstallButton />
    </div>
  );
};

export default StudentPage;
