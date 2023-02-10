import React from "react";
import { Button, Nav } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import axios from "axios";
const LayoutNavbar = () => {
    const navigate = useNavigate();
    const logout = () => {
        let user = JSON.parse(localStorage.getItem('user') || '')

        var config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: 'https://msa-authservice.azurewebsites.net/api/auth/logout/' + user.data.userId,
            headers: {
                'Authorization': 'Bearer ' + user.data.token
            }
        };

        axios(config)
        localStorage.clear();
        navigate('/login');
    }
    return (
        <React.Fragment>
            <Navbar bg="dark" expand="lg" className="navbar-dark">
                <Container fluid>
                    <Navbar.Brand href="/">Test</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link href="/home">Home</Nav.Link>
                            <Nav.Link href="/employees">Employess</Nav.Link>
                            <Nav.Link href="/upload">Upload</Nav.Link>
                        </Nav>
                        <Nav.Link>
                            <Button className="btn-warning" onClick={logout}>Logout</Button>
                        </Nav.Link>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </React.Fragment>
    );
}
export default LayoutNavbar;