import React, { useEffect, useState, useCallback } from "react";
import { Table, Button, Form, Container, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit] = useState(10)
    const navigate = useNavigate();

    const fetchEmployees = useCallback(
        async (pageNumber = page) => {
            try {
                const res = await API.get(
                    `/admin/employees?page=${pageNumber}&search=${search}`
                );
                setEmployees(res.data.employees || []);
                setPage(res.data.page);
                setTotalPages(Math.ceil(res.data.total / limit));
            } catch (err) {
                console.error(err);
                alert("Failed to fetch employees");
            }
        },
        [page, search, limit]
    );

    useEffect(() => {
        fetchEmployees(1);
    }, [fetchEmployees]);


    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
        fetchEmployees(pageNumber);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure to delete?")) return;
        await API.delete(`/admin/employees/${id}`);
        fetchEmployees(page);
    };

    const renderPagination = () => {
        let items = [];
        for (let number = 1; number <= totalPages; number++) {
            items.push(
                <Pagination.Item
                    key={number}
                    active={number === page}
                    onClick={() => handlePageChange(number)}
                >
                    {number}
                </Pagination.Item>
            );
        }
        return <Pagination>{items}</Pagination>;
    };

    const handleEdit = (emp) => {
        navigate(`/admin/edit-employee/${emp._id}`, { state: emp });
    };
    const handleSearch = (e) => {
        e.preventDefault();
        fetchEmployees(1);
    };


    return (
        <Container className="mt-4">
            <h3>Employee Management</h3>
            <Form className="mb-3 d-flex" onSubmit={(e) => e.preventDefault()}>
                <Form.Control
                    type="text"
                    placeholder="Search by name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button className="ms-2" onClick={handleSearch}>
                    Search
                </Button>
            </Form>
            <div className="table-responsive">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Designation</th>
                            <th>Department</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp) => (
                            <tr key={emp._id}>
                                <td>{emp.name}</td>
                                <td>{emp.email}</td>
                                <td>{emp.designation}</td>
                                <td>{emp.department}</td>
                                <td>
                                    <Button
                                        variant="warning"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => handleEdit(emp)}
                                    >
                                        ✏️ Edit
                                    </Button>

                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleDelete(emp._id)}
                                    >
                                        🗑️ Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            {totalPages === 1 && renderPagination()}
        </Container>
    );
};

export default EmployeeList;
