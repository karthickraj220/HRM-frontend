import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import API from "../../api/axios";

const EditEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const empData = location.state;

    const [employee, setEmployee] = useState(
        empData || { name: "", email: "", designation: "", department: "" }
    );

    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await API.put(`/admin/employees/${id}`, employee);
        console.log("Sending data:", employee);

        alert("Employee updated successfully!");
        navigate("/admin/dashboard");
    };

    return (
        <Container className="mt-4">
            <h3>Edit Employee</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={employee.name}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={employee.email}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Designation</Form.Label>
                    <Form.Control
                        type="text"
                        name="designation"
                        value={employee.designation}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Department</Form.Label>
                    <Form.Control
                        type="text"
                        name="department"
                        value={employee.department}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Update
                </Button>
            </Form>
        </Container>
    );
};

export default EditEmployee;
