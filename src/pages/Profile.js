import React, { useEffect, useState } from "react";
import API from "../api/axios"; // Make sure API points to your Axios instance
import { Container, Card, Row, Col, Spinner } from "react-bootstrap";
import TopNavbar from "../components/Navbar";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get user role from localStorage
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileRes = await API.get("/profile");
        setProfile(profileRes.data.data);

        const dashboardRes = await API.get("/dashboard");
        setDashboardData(dashboardRes.data.data);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!profile) {
    return (
      <Container className="text-center mt-5">
        <h5>Profile data not available</h5>
      </Container>
    );
  }

  return (
    <>
      <TopNavbar />

      <Container className="mt-4">

        <h3 className="mb-4">Profile</h3>
        <Card>
          <Card.Body>
            <Row>
              <Col md={6}>
                <p><strong>Name:</strong> {profile.name}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Role:</strong> {profile.role}</p>

                {profile.role === "Employee" && (
                  <>
                    <p><strong>Phone:</strong> {profile.phone}</p>
                    <p><strong>Designation:</strong> {profile.designation}</p>
                    <p><strong>Department:</strong> {profile.department}</p>
                    <p><strong>Date of Joining:</strong> {profile.dateOfJoining ? new Date(profile.dateOfJoining).toLocaleDateString() : "N/A"}</p>
                  </>
                )}

                {profile.role === "Admin" && profile.officeLocation && (
                  <>
                    <p><strong>Office Latitude:</strong> {profile.officeLocation.latitude}</p>
                    <p><strong>Office Longitude:</strong> {profile.officeLocation.longitude}</p>
                    <p><strong>Allowed Radius (meters):</strong> {profile.officeLocation.radius}</p>
                  </>
                )}
              </Col>

              <Col md={6}>
                <h5>Dashboard Summary</h5>
                {role === "Admin" && dashboardData && (
                  <>
                    <p><strong>Total Employees:</strong> {dashboardData.totalEmployees}</p>
                    <p><strong>Present Today:</strong> {dashboardData.attendanceSummary.present}</p>
                    <p><strong>Absent Today:</strong> {dashboardData.attendanceSummary.absent}</p>
                    <p><strong>Total Records:</strong> {dashboardData.attendanceSummary.totalRecords}</p>
                  </>
                )}

                {role === "Employee" && dashboardData && (
                  <>
                    <p><strong>Total Attendance:</strong> {dashboardData.totalAttendance}</p>
                    <p><strong>Last Check-In:</strong> {dashboardData.lastCheckIn ? new Date(dashboardData.lastCheckIn).toLocaleString() : "N/A"}</p>
                    <p><strong>Last Check-Out:</strong> {dashboardData.lastCheckOut ? new Date(dashboardData.lastCheckOut).toLocaleString() : "N/A"}</p>
                  </>
                )}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Profile;
