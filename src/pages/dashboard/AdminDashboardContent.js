import { useEffect, useState } from "react";
import API from "../../api/axios";
import { Card, Row, Col, Container } from "react-bootstrap";
import EmployeeList from "../employees/EmployeeList"
import { useNavigate } from "react-router-dom";

const AdminDashboardContent = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/dashboard")
      .then((res) => setData(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <p className="text-center mt-5">Loading dashboard...</p>;

  const { totalEmployees, attendanceSummary } = data;

  return (
    <>
      <Container className="mt-4">
        <Row>
          <Col md={4}>
            <Card className="p-3 shadow-sm text-center mb-2">
              <h5>Total Employees</h5>
              <h3>{totalEmployees}</h3>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="p-3 shadow-sm text-center mb-2">
              <h5>Present</h5>
              <h3>{attendanceSummary?.present}</h3>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="p-3 shadow-sm text-center mb-2">
              <h5>Absent</h5>
              <h3>{attendanceSummary?.absent}</h3>
            </Card>
          </Col>
        </Row>
        <div className="mt-3">
          <button
            className="btn btn-primary me-2 mb-2 "
            onClick={() => navigate("/admin/add-employee/")}
          >
            ➕ Add Employee
          </button>
          <button
            className="btn btn-primary me-2 mb-2"
            onClick={() => navigate("/admin/set-location")}
          >
            ➕ Add location
          </button>
          <button className="btn btn-primary me-2 mb-2" onClick={() => navigate("/admin/attendance")}>
            Attendance Management
          </button>
          <button className="btn btn-primary me-2 mb-2" onClick={() => navigate("/profile")}>
            Profile
          </button>

        </div>
      </Container>
      <EmployeeList />
    </>
  );
};

export default AdminDashboardContent;
