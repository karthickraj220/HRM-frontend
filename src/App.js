import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import EmployeeDashboard from "./pages/dashboard/EmployeeDashboard";
import EmployeeList from "./pages/employees/EmployeeList";
import EmployeeForm from "./pages/employees/EmployeeForm";
import EditEmployee from "./pages/employees/EmployeeEdit";
import SetOfficeLocation from "./pages/location/SetOfficeLocation";
import AttendanceManagement from "./pages/attendance/AttendanceManagement";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/Profile";

function App() {


  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/employees" element={<EmployeeList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/add-employee" element={<EmployeeForm />} />
        <Route path="/admin/edit-employee/:id" element={<EditEmployee />} />
        <Route path="/admin/set-location" element={<SetOfficeLocation />} />
        <Route path="/admin/attendance" element={<AttendanceManagement />} />

        {/* Employee Routes */}
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Default Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
