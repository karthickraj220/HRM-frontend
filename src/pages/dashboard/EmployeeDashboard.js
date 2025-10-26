// src/pages/dashboard/EmployeeDashboard.js
import React, { useEffect, useState } from "react";
import { Container, Button, Table, Alert, Spinner } from "react-bootstrap";
import API from "../../api/axios";
import TopNavbar from "../../components/Navbar";

const EmployeeDashboard = () => {
    const [attendance, setAttendance] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const fetchAttendanceHistory = async () => {
        try {
            setLoading(true);
            const res = await API.get("/attendance/history?page=1");
            setAttendance(res.data.attendance || []);
        } catch (err) {
            console.error(err);
            setMessage("Failed to fetch attendance history");
        } finally {
            setLoading(false);
        }
    };

    const getLocation = () => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) reject("Geolocation not supported");
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (err) => reject(err.message)
            );
        });
    };

    const handleCheckIn = async () => {
        try {
            const location = await getLocation();
            console.log(location)
            const res = await API.post("/attendance/checkin", location);
            setMessage(res.data.message);
            setRefresh(!refresh);
        } catch (err) {
            console.error("Error response:", err.response?.data || err.message);
        }
    };

    const handleCheckOut = async () => {
        try {
            const location = await getLocation();
            const res = await API.post("/attendance/checkout", location);
            setMessage(res.data.message);
            setRefresh(!refresh);
        } catch (err) {
            console.error(err);
            setMessage("Check-out failed");
        }
    };

    useEffect(() => {
        fetchAttendanceHistory();
    }, [refresh]);

    return (
        <>
            <TopNavbar />
            <Container className="mt-4">
                <h2>Employee Dashboard</h2>
                {message && <Alert variant="info">{message}</Alert>}

                <div className="mb-3">
                    <Button variant="success" className="me-2" onClick={handleCheckIn}>
                        ✅ Check In
                    </Button>
                    <Button variant="danger" onClick={handleCheckOut}>
                        🚪 Check Out
                    </Button>
                </div>

                {loading ? (
                    <Spinner animation="border" />
                ) : (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Check-In</th>
                                <th>Check-Out</th>
                                <th>Latitude</th>
                                <th>Longitude</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendance.length > 0 ? (
                                attendance.map((item) => (
                                    <tr key={item._id}>
                                        <td>{new Date(item.date).toLocaleDateString()}</td>
                                        <td>
                                            {item.checkIn ? new Date(item.checkIn).toLocaleTimeString() : "—"}
                                        </td>
                                        <td>
                                            {item.checkOut ? new Date(item.checkOut).toLocaleTimeString() : "—"}
                                        </td>
                                        <td>{item.location?.latitude}</td>
                                        <td>{item.location?.longitude}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center">
                                        No attendance records found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                )}
            </Container>
        </>
    );
};

export default EmployeeDashboard;
