import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const HomePage = () => {
    return (
        <div className="home-page">
            <Container>
                <Row className="justify-content-center text-center">
                    <Col md={8}>
                        <h1 className="mt-5">Welcome to Cookbook</h1>
                        <p className="mt-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Nulla facilisi. In hac habitasse platea dictumst. Ut ut dui id lorem cursus aliquet at eget magna. Aliquam erat volutpat. Suspendisse potenti.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt turpis at justo bibendum dapibus. Aenean ultrices leo id libero facilisis, ac sagittis elit pharetra. Duis lacinia erat nec odio fringilla, in varius nisl vehicula.
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default HomePage;
