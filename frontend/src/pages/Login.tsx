import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../Hooks/useAuth";
import { Button , Col, Container, Form, Row} from 'react-bootstrap';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const auth = useAuth();
  const [validated, setValidated] = useState(false);



  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (res.ok) {
      //localStorage.setItem('token', data.token);
      auth.login(data);
      navigate('/');
    } else {
      alert(data.error);

    }
  };

  const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
     } 
     else
     {
      login(event);
     }

    setValidated(true);
  };
  return (
  
    <Container >
      <Form noValidate validated={validated} onSubmit={handleSubmit} id="loginrow">
        <Row className="justify-content-center" >
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
              />
          </Form.Group>

        </Row>
        <Row className="justify-content-center">
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>
        </Row>
        <Row  id="connexion">
          <Col md={{ span: 0 , offset: 4 }}>
            <Button type="submit" id="connexion">Connexion</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
