import React from 'react'
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

export default function About() {
    return (
        <Row className="mt-5">
            <Col className="text-center">
                <Button variant="dark" size='xl' href='facebook.com'>
                    Facebook
                </Button>
            </Col>
        </Row>
    )
}
