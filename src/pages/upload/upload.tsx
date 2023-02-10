
import React, { useState, useEffect } from 'react';
import { Alert, Button, Carousel, Col, Container, Form, Row } from 'react-bootstrap';
import axios from 'axios'
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import { Guid } from "guid-typescript";

const sasToken = 'sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-02-28T21:55:55Z&st=2023-02-10T13:55:55Z&spr=https&sig=uRq0rVJPmWMMRDQUqwws8WrX6aOnJqYXuxFFTG9sMbE%3D'
const containerStorage = 'files'
const urlBlob = 'https://msastorage2023.blob.core.windows.net/'

interface IFileBlob {
    url: string
    name: string
}

const Upload = () => {



    const [show, setShow] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const [file, setFile] = useState<File>()
    const [fileBlob, setFileBlob] = useState<Array<IFileBlob>>([])

    const blobService = new BlobServiceClient(
        urlBlob + '?' + sasToken
    )

    const containerClient = blobService.getContainerClient(containerStorage)

    useEffect(() => { GetBlobs() }, [])

    const UploadFile = async () => {
        if (file) {
            const blobClient = containerClient.getBlockBlobClient(Guid.create() + ' - ' + file.name)
            const options = { blobHTTPHeaders: { blobContentType: file.type } };
            const responseBlob = await blobClient.uploadData(file, options)
            setShow(true)
            setMessage('uploaded file')
            GetBlobs()
            setTimeout(() => {
                setShow(false)
            }, 3000);
        }

    }

    const GetBlobs = async () => {
        let items = new Array<IFileBlob>()
        for await (const blob of containerClient.listBlobsFlat()) {

            const blobItem: IFileBlob = {
                url: `${urlBlob}${containerStorage}/${blob.name}?${sasToken}`,
                name: blob.name
            }
            items.push(blobItem);
        }
        setFileBlob(items)
        console.log(fileBlob)
    }

    const CarouselView = () => {
        return (
            <Row>
                <Col lg={12} className='' style={{ height: '200px' }}>

                    <Carousel>
                        {
                            fileBlob.map(m => {
                                return (
                                    <Carousel.Item style={{
                                        background: '#adb5bd'
                                    }}>
                                        <div className="d-flex justify-content-center">
                                            <img
                                                style={{ width: 800, height: 400 }}
                                                className="d-block"
                                                src={m.url}
                                                alt={m.name}
                                            />
                                        </div>

                                        <Carousel.Caption>
                                            <h3>{m.name}</h3>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                )
                            })
                        }
                    </Carousel>
                </Col>
            </Row>
        )
    }

    return (
        <>
            <Container className='py-1' fluid>
            <h3 className='fw-normal'>Employees</h3>
                <Row>
                    <Col lg={10} className='mb-3'>                        
                        <input type='file' accept="image/*"  onChange={(e) => setFile(e.target.files ? e.target.files[0] : undefined)}></input>
                    </Col>
                    <Col lg={2} className='mb-3'>
                        <Button variant="primary" type="button" onClick={UploadFile}>
                            Upload file
                        </Button>
                    </Col>
                </Row>
                {
                    CarouselView()
                }
            </Container>
            {
                show ?
                    <Alert className="position-absolute bottom-0 end-0"
                        key={'success'}
                        variant={'success'}
                        onClose={() => setShow(!show)}
                        dismissible
                        style={{ marginBottom: '0px' }}
                    >
                        {message}
                    </Alert> :
                    <></>
            }
        </>
    )
}
export default Upload;