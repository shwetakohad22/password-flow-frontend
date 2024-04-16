import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/dashboard/Dashboard";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login setUsername={setUsername} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard username={username} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
