import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [messes, setMesses] = useState([]);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const fetchMesses = async () => {
    const res = await API.get("/student/messes");
    setMesses(res.data);
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") navigate("/");
    fetchMesses();
  }, []);

  const handleAddMess = async () => {
    if (!name || !password) return;
    await API.post("/admin/add-mess", { name, password });
    setName("");
    setPassword("");
    fetchMesses();
  };

  const handleDelete = async (id) => {
    await API.delete(`/admin/remove-mess/${id}`);
    fetchMesses();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Mess Name"
          className="p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Mess Password"
          className="p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-green-600 text-white px-4 rounded"
          onClick={handleAddMess}
        >
          Add Mess
        </button>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="text-left p-2">Mess Name</th>
            <th className="text-left p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {messes.map((mess) => (
            <tr key={mess._id} className="border-t">
              <td className="p-2">{mess.name}</td>
              <td className="p-2">
                <button
                  onClick={() => handleDelete(mess._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
