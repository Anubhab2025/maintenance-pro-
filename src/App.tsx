import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Machines from "./pages/Machines";
import MachineDetails from "./pages/MachineDetails";
import Tasks from "./pages/Tasks";
import TaskDetails from "./pages/TaskDetails";
import Reports from "./pages/Reports";
import NewMachine from "./pages/NewMachine";
import AssignTask from "./pages/AssignTask";
import ProtectedRoute from "./components/ProtectedRoute";
import useAuthStore from "./store/authStore";

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />

          {/* Admin only routes */}
          <Route
            path="machines"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Machines />
              </ProtectedRoute>
            }
          />
          <Route
            path="machines/new"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <NewMachine />
              </ProtectedRoute>
            }
          />
          <Route
            path="machines/:id"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <MachineDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="assign-task"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AssignTask />
              </ProtectedRoute>
            }
          />

          {/* Shared routes */}
          <Route path="tasks" element={<Tasks />} />
          <Route path="tasks/:id" element={<TaskDetails />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
Router;
