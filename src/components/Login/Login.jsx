import React from 'react'
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function login() {
    return (
    <div>
        <Container className= "small-container">
            <h1 className = "my-3">Login</h1>
            <Form>
            <Form.Group className="mb-3" controlId= "email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId= "password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required />
                </Form.Group>
                <duv className="mb-3">
                    <Button type="submit">Login</Button>
                </duv>
                <div className="mb-3">
                    New customer? { ' ' }
                    <Link to={`/signup?redirect=${redirect}`}>Create your account</Link> {/*cambiar para redireccionar, la ruta es un ej y redirect es una variable de redireccion desde la url*/}
                </div>
            </Form>
        </Container>
    </div>
  )
}