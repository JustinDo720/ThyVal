import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import  Button  from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Introduction(){
    // Build my navigate 
    const navigate = useNavigate() 
    const [showMessage, setShowMessage] = useState(false);
    const [formInfo, setFormInfo] = useState({
    })

    const updateForm = (event) => {
        let {name, value} = event.target
        
        setFormInfo({
            ...formInfo,
            [name]: value
        })
    }

    const handleForm = (e)=>{
        e.preventDefault()
        const code = formInfo['code_entry']
        if(code == process.env.REACT_APP_VALENTINE_CODE){
            // Our Code is validated so let's push to our validated route 
            navigate('/validated', {state: {code}})
        }
        
    }

    const handleKeyDown = (e)=>{
        if(e.key==='Enter'){
            handleForm(e)
        }
    }


    return(
        <>
        <Container className='text-center mt-5'>
            <Row>
                <Col xs={12} md={12}>
                    <h1 className="mb-4">
                        <b>Ê Ai Vầy?!?</b>
                    </h1>
                    <p>Phải ny của Tin không?</p>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={12}>
                <Card style={{ width: '30rem', margin: 'auto'}} className='shadow-lg p-3'>
                    <Card.Body>
                        <Form onSubmit={(e)=>handleForm(e)}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="code-entry1">
                                    <FontAwesomeIcon icon={faHeart} size="md" color="red" />
                                </InputGroup.Text>
                                <Form.Control
                                placeholder="Số Code"
                                aria-label="Số Code"
                                name='code_entry'
                                value={formInfo.code}
                                aria-describedby="code-entry1"
                                onChange={updateForm}
                                onKeyDown={handleKeyDown}
                                type='password'
                                />
                                <Button
                                    variant="primary"  // Bootstrap's blue variant
                                    id="code-entry1"
                                    type="submit"
                                    >
                                    <FontAwesomeIcon icon={faHeart} size="md" color="white" /> {/* White heart to contrast well with the blue */}
                                </Button>
                            </InputGroup>
                        </Form>
                        
                    </Card.Body>
                    <Card.Img variant="bottom" src="https://cataas.com/cat/gif" alt="Cute Cat Meme" className="img-fluid rounded shadow" />
                </Card>
                </Col>
            </Row>
        </Container>
        

        {/* <div className="my-4">
            <button
            className="btn btn-primary btn-lg"
            onClick={() => setShowMessage(true)}
            >
            Click Me! 🐱
            </button>
        </div>
        {showMessage && (
            <div className="alert alert-success mt-4" role="alert">
            Will you be my Valentine? 💖
            </div>
        )}
        <div className="mt-4">
            <img
            src="https://cataas.com/cat/gif"
            alt="Cute Cat Meme"
            className="img-fluid rounded shadow"
            />
        </div>
        </div> */}
        </>
    )
}

export default Introduction