import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const TopNavbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand>HRM Dashboard</Navbar.Brand>
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                <Nav className="ms-auto">
                    <Button variant="outline-light" onClick={handleLogout}>
                        Logout
                    </Button>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default TopNavbar;
