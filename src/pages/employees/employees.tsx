
import React, { useState, useEffect } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import axios from 'axios'

import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'NAME', flex: 1 },
    { field: 'last_name', headerName: 'LAST NAME', flex: 1 },
    { field: 'birthday', headerName: 'BIRTHDAY', flex: 1, type: 'date' },
];

const Employees = () => {

    const [rows, setRows] = useState<any>([])

    const [name, setName] = useState<string>('');
    const [lastname, setLastName] = useState<string>('');
    const [birthday, setBirthday] = useState<string>('');
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        getDataGrid()
    }, [rows])

    const getDataGrid = () => {
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/:tu_nombre',
            headers: {}
        };

        axios(config)
            .then(function (response) {
                if (response.data.success) {
                    response.data.data.employees.map((f: any) => {
                        f.birthday = new Date(f.birthday)
                    })
                    setRows(response.data.data.employees)
                }

            })
    }

    const submitForm = (event: React.SyntheticEvent): void => {
        var data = JSON.stringify({
            "name": name,
            "last_name": lastname,
            "birthday": birthday
        });

        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/:tu_nombre',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                setMessage(response.data.data)
                setShow(true)
            })
            .catch(function (error) {
                setMessage('Internal error')
            }).finally(() => {
                getDataGrid()
                setName('')
                setLastName('')
                setBirthday('')
                setTimeout(() => {
                    setShow(false)
                }, 2000);
            });

    }

    return (
        <>
            <Container className='py-1' fluid>
                <h3 className='fw-normal'>Employees</h3>
                <Row>
                    <Col>
                        <div style={{ height: 500, width: '100%' }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}

                                rowsPerPageOptions={[10]}
                                pageSize={10}
                                pagination
                            />
                        </div>
                    </Col>
                    <Col>
                        <Form>
                            <Form.Group className="mb-12" controlId="formBasicName">
                                <Form.Label>NAME</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" onChange={(e) => setName(e.target.value)} value={name} />
                            </Form.Group>

                            <Form.Group className="mb-12" controlId="formBasicLastNAme">
                                <Form.Label>LAST Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter last name" onChange={(e) => setLastName(e.target.value)} value={lastname} />
                            </Form.Group>

                            <Form.Group className="mb-12" controlId="formBasicBithday">
                                <Form.Label>BIRTHDAY</Form.Label>
                                <Form.Control type="date" placeholder="Enter birthday" onChange={(e) => setBirthday(e.target.value)} value={birthday} />
                            </Form.Group>
                            <br />
                            <Button variant="primary" type="button" onClick={submitForm}>
                                Save
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
            {
                show ?
                    <Alert className="position-absolute top-0 end-0"
                        key={'success'}
                        variant={'success'}
                        onClose={() => setShow(!show)}
                        dismissible
                    >
                        {message}
                    </Alert> :
                    <></>
            }
        </>
    )
}
export default Employees;