import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Placeholder from 'react-bootstrap/Placeholder';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import Modal from 'react-bootstrap/Modal';

function Validated(){
    const location = useLocation();
    const navigate = useNavigate();
    const [loadingMsg, setLoadingMsg] = useState([true,true,true, true, true])
    const [needLoading, setNeedLoading] = useState(true)
    const [showDenial, setShowDenial] = useState(false)
    const [denied, setDenied] = useState(0)
    const [constDenied, setConstDenied] = useState(false)
    const [showModal, setShowModal] = useState(false)

    // My Split Message 
    const myMsg = [
        "Anh nhớ thương em mỗi ngày mỗi đêm.",
        "Em làm anh vui nhiều nhất tại vì anh có người quan tâm anh quái.",
        "Em rất là tốt bụng suy nghĩ tới người quan trọng cho em.",
        "Mỗi ngày anh dậy hay đi ngủ anh sẽ có em.",
        "Will you be my Valentine Thy Thy?"
    ]
    

    const { code } = location.state || {}

    useEffect(()=>{
        // Checking If our code is valid 
        if (code != process.env.REACT_APP_VALENTINE_CODE){
            // Return back to homepage
            navigate('/')
        }
    }, [code, navigate])

    // Loading Messages 
    useEffect(()=>{
        const interval = setInterval(()=>{
            // The idea is that we'll find the first true and replace it with a text 
            setLoadingMsg((prevMsg)=>{
                // We have a copy of our list before any changes
                const updateMsg = [...prevMsg]
                // Find the first True
                const trueIndex = updateMsg.indexOf(true)

                // indexOf will return -1 if it's not found 
                if(trueIndex != -1){
                    updateMsg[trueIndex] = myMsg[trueIndex] 
                } else {
                    // No more messages so
                    setNeedLoading(false)
                    clearInterval(interval); // This will stop the interval when all placeholders are replaced
                }
                return updateMsg
            })
        }, 2000)   // 2 Seconds

        // Clearing when comp is unmounted 
        return () => clearInterval(interval)
    }, [])   

    const process_denial = ()=>{
        setShowDenial(true)
        setDenied(denied+1)
        if(denied >= 2){
            setConstDenied(true)
        }
    }

    return(<>
        <Container className='text-center mt-5'>
            <Row>
                <Col xs={12} md={12}>
                    <h1 className="mb-4">
                        <b>Vợ Anh ơi, Vợ Anh!</b>
                    </h1>
                    <p>Anh muốn nói với em cái này...</p>
                </Col>
            </Row>
            <Container>
            <Row>
                <Col xs={12} md={6}>
                    <Card style={{ background: 'transparent', border: 'transparent'}}>
                        <Card.Img variant="top" src="../white_rose.gif" />
                    </Card>
                </Col>
                <Col xs={12} md={6}>
                <Card style={{ width: '30rem', margin: 'auto', background: '#FAF9F6'}} className='shadow-lg p-3'>
                    <Card.Body>
                        <ListGroup className="list-group-flush" style={{textAlign: 'left'}}>
                            {loadingMsg.map((msg, index) => (
                                // Map our messages so we build placeholder/messages based on the amount of messages provided
                                <ListGroup.Item key={index} style={{background: '#FAF9F6'}}>
                                    {typeof msg == 'boolean'?(
                                        // Check if the msg is boolean if so we are loading if its a string then we print msg
                                        <Placeholder as="p" animation="glow">
                                            <Placeholder xs={12} />
                                        </Placeholder>
                                    ): (
                                        <p>{msg}</p>
                                    )}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card.Body>
                    <Card.Body>
                        {needLoading?(
                            <>
                                <Row className="g-3">
                                    <Col xs={12} md={6}>
                                        <Placeholder.Button variant="warning" xs={6} />
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Placeholder.Button variant="primary" xs={6} />    
                                    </Col>
                                </Row>  
                            </>
                        ):(
                            <>
                            <Row className="g-3">
                                {constDenied?(
                                    <>
                                        <Col xs={12} md={6}>
                                            <Button variant="outline-info" className="w-100" onClick={()=>setShowModal(true)}>
                                                Iu Anh :))
                                            </Button>
                                        </Col>
                                    </>
                                ):(
                                    <>
                                        <Col xs={12} md={6}>
                                            <Button variant="outline-warning" className="w-100" onClick={process_denial}>
                                            Ai Thêm
                                            </Button>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <Button variant="outline-primary" className="w-100" onClick={()=>setShowModal(true)}>
                                            Um
                                            </Button>
                                        </Col>
                                    </>
                                )}
                            </Row>
                            </>
                        )}

                    </Card.Body>
                </Card>
                </Col>
            </Row>
            </Container>
            <Toast delay={3000} autohide show={showDenial} onClose={()=>setShowDenial(false)} bg='danger'>
                <Toast.Header>
                    <strong className="me-auto">Heyyyy</strong>
                </Toast.Header>
                <Toast.Body>Em không có được buồn anh nhaaaa. Iu em nhiều hơn nhiều.</Toast.Body>
            </Toast>
        </Container>

        <Modal
            size="lg"
            aria-labelledby="final-goodbye"
            centered
            show={showModal} onHide={()=>setShowModal(false)}
            >
            <Modal.Header closeButton>
                <Modal.Title id="final-goodbye">
                Anh Thương Em Nhiều
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Gọi Anh Nha</h4>
                <p>
                    Mình chuẩn bị coi phim rồi ăn gà rán được không?
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={()=>setShowModal(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    </>)
}

export default Validated