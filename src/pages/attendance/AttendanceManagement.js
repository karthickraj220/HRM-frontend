import React, { useState, useEffect } from "react";
import API from "../../api/axios";
import { Table, Button, Form, Container, Row, Col } from "react-bootstrap";

const AttendanceManagement = () => {
    const [attendance, setAttendance] = useState([]);
    const [filters, setFilters] = useState({
        employee: "",
        department: "",
        date: "",
    });

    const fetchAttendance = async () => {
        try {
            const query = new URLSearchParams(filters).toString();
            const res = await API.get(`/attendance/all?${query}`);
            setAttendance(res.data.attendance || []);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchAttendance();
    }, []);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleExport = async (format) => {
        try {
            const query = new URLSearchParams(filters).toString();
            const res = await API.get(`/attendance/export?format=${format}&${query}`, {
                responseType: format === "csv" ? "blob" : "json",
            });

            if (format === "csv") {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", `attendance.${format}`);
                document.body.appendChild(link);
                link.click();
                link.remove();
            } else {
                // JSON download
                const blob = new Blob([JSON.stringify(res.data, null, 2)], {
                    type: "application/json",
                });
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", `attendance.json`);
                document.body.appendChild(link);
                link.click();
                link.remove();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container className="mt-4">
            <h3>Attendance Management</h3>
            <Form className="mb-3">
                <Row>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Employee Name"
                            name="employee"
                            value={filters.employee}
                            onChange={handleFilterChange}
                            className="mt-1"
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            type="date"
                            name="date"
                            value={filters.date}
                            onChange={handleFilterChange}
                            className="mt-1"
                        />
                    </Col>
                    <Col>
                        <Button className="me-2 mt-1" onClick={fetchAttendance}>
                            Filter
                        </Button>
                    </Col>
                </Row>
            </Form>
            <Button variant="success" className="me-2 mb-2" onClick={() => handleExport("json")}>
                Export JSON
            </Button>
            <Button variant="info" className="mb-2" onClick={() => handleExport("csv")}>
                Export CSV
            </Button>
            <div className="table-responsive">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Employee</th>
                            <th>Email</th>
                            <th>Check-In</th>
                            <th>Check-Out</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendance.map((att) => (
                            <tr key={att._id}>
                                <td>{att.employee?.name || "N/A"}</td>
                                <td>{att.employee?.email || "N/A"}</td>
                                <td>{att.employee?.department || "N/A"}</td>
                                <td>{att.checkIn}</td>
                                <td>{att.checkOut}</td>
                                <td>{new Date(att.date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
};

export default AttendanceManagement;
