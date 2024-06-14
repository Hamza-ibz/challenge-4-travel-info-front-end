import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import "./Footer.css"

const Footer = () => {
    return (
        // <footer className="fixed-bottom">
        //     <Container>
        //         <Row>
        //             <Col className="text-center py-4">
        //                 ©️ WeatherWhenever 2024
        //             </Col>
        //         </Row>
        //     </Container>
        // </footer>
        <footer className="footer">
            <Container>
                <Row>
                    <Col className="text-center py-4">
                        ©️ WeatherWhenever 2024
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer;