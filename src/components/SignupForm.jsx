import React from 'react';
import { Form, Button } from 'react-bootstrap';

const SignupForm = ({ role, onSignup, passwordValidate, showErrorMsg, errorMsg }) => {
    return (
        <Form onSubmit={onSignup} className="emp-form">
            <h4>Enter Following Details to Signup</h4>
            <Form.Group controlId="signup-name">
                <Form.Label>Email address*</Form.Label>
                <Form.Control type="text" placeholder="Enter Your Name" name="name" required />
            </Form.Group>
            <Form.Group controlId="signup-email">
                <Form.Label>Email address*</Form.Label>
                <Form.Control type="email" placeholder="Enter Email" name="email" required />
            </Form.Group>

            <Form.Group controlId="signup-password">
                <Form.Label>Password*</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" required />
            </Form.Group>

            <Form.Group controlId="signup-role">
                <Form.Label>Role*</Form.Label>
                <Form.Control as="select" name="role" required>
                {role && role.map((v, i) => (
                    <option key={i} value={v.role}>{v.role}</option>
                ))}
            </Form.Control>
            </Form.Group>

            

            {showErrorMsg && <div className="err-msg"><p>{errorMsg}</p></div>}
            <Button variant="primary" type="submit">
                Sign Up
            </Button>
        </Form>
    );
}
export default SignupForm;