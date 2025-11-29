import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button , Col, Container, Form, Row} from 'react-bootstrap';
import Feedback from 'react-bootstrap/esm/Feedback';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const register = async (e: any) => {
    e.preventDefault();

    const res = await fetch('http://localhost:3001/api/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password, role })
    });
    const data = await res.json();
    if (res.ok) {
      alert("Inscription réussie");
      navigate('/login');
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
      register(event);
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

        <Row className="justify-content-center">

          <Form.Group as={Col} md="4" controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                isInvalid={validated && formData.password !== formData.confirmPassword}
              />
              <Feedback type="invalid">Passwords do not match.</Feedback>
          </Form.Group>
        </Row>
        <Row  id="connexion">
          <Col md={{ span: 0 , offset: 4 }}>
            <Button type="submit" id="connexion">Register</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}