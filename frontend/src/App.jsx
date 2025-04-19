import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentPage from "./pages/StudentPage";
import AdminPage from "./pages/AdminPage";
import ManagerPage from "./pages/ManagerPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/manager" element={<ManagerPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
