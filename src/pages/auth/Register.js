import { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col, Alert, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const res = await axios.post(
                "https://hrm-backend-api-ue97.onrender.com/api/auth/register",
                formData
            );

            if (res.data?.message) {
                setMessage(res.data.message);
            } else {
                setMessage("Registered successfully!");
            }
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || "Registration failed");
            } else {
                setError("Network error");
            }
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="p-4 shadow-lg">
                        <h3 className="text-center mb-3">Admin Register</h3>
                        {message && <Alert variant="success">{message}</Alert>}
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Button type="submit" className="w-100" variant="primary">
                                Register
                            </Button>
                            <div className="text-center mt-3">
                                <small>
                                    Already have an account?{" "}
                                    <span
                                        className="text-primary"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => navigate("/login")}
                                    >
                                        Login
                                    </span>
                                </small>
                            </div>

                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
