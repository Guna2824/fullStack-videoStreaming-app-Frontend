import React from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Dashboard from "./Dashboard";
import VideoUploadForm from "./VideoUploadForm";
import NavBar from "./NavBar";
import Footer from "./Footer";
import PrivateRoute from "./ProtectedRouter";
import Userpage from "./Userpage";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <PrivateRoute>
              <VideoUploadForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <Userpage />
            </PrivateRoute>
          }
        />
      </Routes>

      <Footer />

      <ToastContainer />
    </div>
  );
}

export default App;
