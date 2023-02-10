import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Container, Form, FormGroup, FormLabel, Row, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const loginAPI = 'https://msa-authservice.azurewebsites.net/api/auth/login';


const Login = () => {

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [disabledButton, setDisabledButton] = useState(false)
    const [message, setMessage] = useState('')
    const [show, setShow] = useState(false)

    const navigate = useNavigate();
    const submitLoginForm = (event: React.SyntheticEvent): void => {
        localStorage.clear();
        setDisabledButton(!disabledButton)

        var data = JSON.stringify({
            "email": user,
            "password": password
        });

        var config = {
            method: 'post',
            url: loginAPI,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then((response) => {
                localStorage.setItem('user', JSON.stringify(response.data))
                navigate('/');
            })
            .catch((error) => {
                setShow(!show)
                setMessage(error.response.data.message)
                setTimeout(() => {
                    setShow(false)
                }, 2000);
            }).finally(() => {
                setDisabledButton(false)
            });
    }
    return (

        <React.Fragment>
            <Container className="my-5">
                <h2 className="fw-normal mb-5">Login To React Auth Demo</h2>
                <Row>
                    <Col md={{ span: 6 }}>
                        <Form >
                            <FormGroup className="mb-3">
                                <FormLabel htmlFor={'login-username'}>Username</FormLabel>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    required
                                    onChange={(e) => setUser(e.target.value)}
                                    onPaste={(e: any) => {
                                        e.preventDefault();
                                        return false;
                                    }}
                                    onCopy={(e: any) => {
                                        e.preventDefault();
                                        return false;
                                    }}
                                />
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <FormLabel htmlFor={'login-password'}>Password</FormLabel>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                    onPaste={(e: any) => {
                                        e.preventDefault();
                                        return false;
                                    }}
                                    onCopy={(e: any) => {
                                        e.preventDefault();
                                        return false;
                                    }}
                                />
                            </FormGroup>
                            <Button
                                type="button"
                                className="btn-success mt-2"
                                onClick={submitLoginForm}
                                disabled={disabledButton}
                            >Login</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
            {
                show ?
                    <Alert className="position-absolute top-0 end-0"
                        key={'danger'}
                        variant={'danger'}
                        onClose={() => setShow(!show)}
                        dismissible
                    >
                        {message}
                    </Alert> :
                    <></>
            }

        </React.Fragment>
    );
}


export default Login