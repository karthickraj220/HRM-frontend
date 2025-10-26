import React, { useState } from "react";
import API from "../../api/axios";
import { Form, Button, Alert, Container } from "react-bootstrap";
import TopNavbar from "../../components/Navbar";

const EmployeeForm = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        designation: "",
        department: "",
        dateOfJoining: "",
    });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/admin/employees", data);
            setMessage(res.data.message);
            setError("");
        } catch (err) {
            setError(err.response?.data?.message || "Error adding employee");
        }
    };

    return (
        <>
            <TopNavbar />
            <Container className="mt-4">
                <h3>Add New Employee</h3>
                {message && <Alert variant="success">{message}</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    {Object.keys(data).map((field) => (
                        <Form.Group className="mb-3" key={field}>
                            <Form.Label>{field}</Form.Label>
                            <Form.Control
                                type="text"
                                name={field}
                                value={data[field]}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    ))}
                    <Button type="submit">Add Employee</Button>
                </Form>
            </Container>
        </>
    );
};

export default EmployeeForm;
