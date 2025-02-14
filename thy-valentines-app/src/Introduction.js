import React, { useState, useEffect } from 'react';
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
    // Let's check our width immediately
    const [cardWidth, setCardWidth] = useState(window.innerWidth < 768? "100%":'45rem')
    const [formInfo, setFormInfo] = useState({
    })

    // Checking for mobile device to optimize our card component 
    useEffect(()=>{
        // Need a fuction to add to listener for event 
        const handleResize = ()=>{
            setCardWidth(window.innerWidth < 768? "100%":'30rem')
        }

        // Adding that Event listener (if resize event we run this handleResize func)
        window.addEventListener('resize', handleResize)
        // Once component unmounts we'll remove this eventListener 
        return () => window.removeEventListener('resize', handleResize)
    }, [])

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
                <Card style={{ width: cardWidth, margin: 'auto'}} className='shadow-lg p-3'>
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
        
        </>
    )
}

export default Introduction