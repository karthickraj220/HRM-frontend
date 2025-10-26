import { useState } from "react";
import API from "../../api/axios";
import { Form, Button, Container, Alert } from "react-bootstrap";
import TopNavbar from "../../components/Navbar";

const SetOfficeLocation = () => {
    const [form, setForm] = useState({ latitude: "", longitude: "", radius: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await API.post("/admin/set-location", form);
        setMessage(res.data.message);
    };

    return (
        <>
            <TopNavbar />
            <Container className="mt-4">
                <h3>Set Office Location</h3>
                {message && <Alert variant="success">{message}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Latitude</Form.Label>
                        <Form.Control name="latitude" onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Longitude</Form.Label>
                        <Form.Control name="longitude" onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Radius (meters)</Form.Label>
                        <Form.Control name="radius" onChange={handleChange} required />
                    </Form.Group>
                    <Button type="submit">Save Location</Button>
                </Form>
            </Container>
        </>
    );
};

export default SetOfficeLocation;
