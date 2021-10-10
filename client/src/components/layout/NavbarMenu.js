import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import learnItLogo from "../../assets/logo.svg";
import logoutIcon from "../../assets/logout.svg";
import { Button } from "react-bootstrap";
import {Link} from 'react-router-dom'
import { Container } from 'react-bootstrap';
import {useContext} from 'react';
import {AuthContext} from '../../contexts/AuthContext';

export default function NavbarMenu() {
  const {authState:{user:{username}},logoutUser}=useContext(AuthContext);
  const logout= ()=>logoutUser();

  return (
    <Navbar expand='lg' bg='primary' variant='dark' className='shadow ' sticky='top' >
      <Container>
        <Navbar.Brand className='p'>
          <Nav.Link to='/dashboard' className="font-weight-bolder text-white" as={Link}>
              <img
              src={learnItLogo}
              alt="This is logo"
              width="32"
              height="32"
              className="mr-2"
              />
              LearnItMern
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              className="font-weight-bolder text-white"
              to="/dashboard"
              as={Link}
            >
              DashBoard
            </Nav.Link>
            <Nav.Link
              className="font-weight-bolder text-white"
              to="/about"
              as={Link}
            >
              About
            </Nav.Link>
          </Nav>
          <Nav className="mr-5">
            <Nav.Link className="font-weight-bolder text-white" disabled>
              Welcome to {username}
            </Nav.Link>
            <Button variant="success" className="font-weight-bolder text-white" onClick={logout}>
              <img
                src={logoutIcon}
                alt="logoutIcon"
                width="32"
                height="32"
                className="mr-2"
              />
              LogOut
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
