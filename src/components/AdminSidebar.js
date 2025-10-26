// AdminSidebar.js
import React, { useState } from "react";
import { Nav, Navbar, Button, Offcanvas } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminSidebar = () => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            {/* Top Navbar for mobile toggle */}
            <Navbar bg="dark" variant="dark" expand={false} className="mb-3">
                <Navbar.Brand className="ms-2">HRM Admin</Navbar.Brand>
                <Button variant="outline-light" onClick={handleShow}>
                    ☰ Menu
                </Button>
            </Navbar>

            {/* Sidebar Offcanvas */}
            <Offcanvas show={show} onHide={handleClose} responsive="lg">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Admin Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="flex-column">
                        <Button
                            className="mb-2"
                            variant="primary"
                            onClick={() => {
                                navigate("/admin/add-employee");
                                handleClose();
                            }}
                        >
                            ➕ Add Employee
                        </Button>
                        <Button
                            className="mb-2"
                            variant="primary"
                            onClick={() => {
                                navigate("/admin/set-location");
                                handleClose();
                            }}
                        >
                            📍 Set Location
                        </Button>
                        <Button
                            className="mb-2"
                            variant="primary"
                            onClick={() => {
                                navigate("/admin/attendance");
                                handleClose();
                            }}
                        >
                            📊 Attendance Management
                        </Button>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default AdminSidebar;
