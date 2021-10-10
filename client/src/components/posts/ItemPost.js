import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import ActionButtons from "./ActionButtons";

export default function ItemPost({
  post: { _id, status, title, description, url },
}) {
  return (
    <Card
      className=""
      border={
        status === "LEARNED"
          ? "success"
          : status === "LEARNING"
          ? "warning"
          : "danger"
      }
    >
      <Card.Body>
        <Card.Title>
          <Row>
            <Col>
              <p className="post-title">{title}</p>
              <div>
                <Button disabled variant={
                    status === "LEARNED"
                      ? "success"
                      : status === "LEARNING"
                      ? "warning"
                      : "danger"
                  }
                  size='sm'
                >
                  {status}
                </Button>
              </div>
            </Col>
            <Col className="text-right">
              <ActionButtons url={url} _id={_id}/>
            </Col>
          </Row>
        </Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}
