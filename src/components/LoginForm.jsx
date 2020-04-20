import React from 'react';
import { Form, Button } from 'react-bootstrap';

const LoginForm = ({ onLogin, showErrorMsg, errorMsg }) => {
    return (
        <Form onSubmit={onLogin} className="emp-form">
            <h4>Enter Following Details to Log in</h4>
            
            <Form.Group controlId="login-email">
                <Form.Label>Email address*</Form.Label>
                <Form.Control type="email" placeholder="Enter Email" name="email" required />
            </Form.Group>

            <Form.Group controlId="login-password">
                <Form.Label>Password*</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" required />
            </Form.Group>

            {showErrorMsg && <div className="err-msg"><p>{errorMsg}</p></div>}
            <Button variant="primary" type="submit">
                Log In
            </Button>
        </Form>
    );
}
export default LoginForm;