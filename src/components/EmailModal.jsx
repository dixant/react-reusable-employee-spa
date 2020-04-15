import React from 'react';
import { Form, Button, Row, Container, Modal } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

const EmailModal = ({ role, showEmailModal, emailModalType, showErrorMsg, errorMsg, submitEmailModal, closeModal, viewData }) => {
    console.log(viewData)
    if (emailModalType === 'create') {
        return (
            <Modal show={showEmailModal} centered >
                <Modal.Header>
                    <Modal.Title>Create New Email Data</Modal.Title>
                </Modal.Header>
                <Form onSubmit={submitEmailModal}>
                    <Modal.Body>


                        <Form.Group controlId="e-mail">
                            <Form.Label>Email*</Form.Label>
                            <Form.Control type="email" placeholder="Enter Email Id" name="email" required />
                        </Form.Group>

                        {showErrorMsg && <div className="err-msg"><p>{errorMsg}</p></div>}
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>Cancel</Button>
                        <Button variant="primary" type="submit">Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
    else if (emailModalType === 'view') {
        let { idtableEmail, tableEmailEmailAddress } = viewData;
        return (
            <Modal show={showEmailModal} centered className="view-mode">
                <Modal.Header>
                    <Modal.Title>View Email Data</Modal.Title>
                </Modal.Header>
                <Form onSubmit={submitEmailModal}>
                    <Modal.Body>


                        <Form.Group controlId="e-mail">
                            <Form.Label>Email*</Form.Label>
                            <Form.Control type="email" defaultValue={tableEmailEmailAddress} placeholder="Enter Email Id" name="email" required />
                        </Form.Group>


                        {showErrorMsg && <div className="err-msg"><p>{errorMsg}</p></div>}
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>Close</Button>
                        {/* <Button variant="primary" type="submit">Create</Button> */}
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
    else if (emailModalType === 'edit') {
        let { idtableEmail, tableEmailEmailAddress } = viewData;
        return (
            <Modal show={showEmailModal} centered>
                <Modal.Header>
                    <Modal.Title>Edit Email Data</Modal.Title>
                </Modal.Header>
                <Form onSubmit={submitEmailModal}>
                    <Modal.Body>
                        <Form.Group controlId="mail-no">
                            <Form.Label>Email No*</Form.Label>
                            <Form.Control disabled type="email" defaultValue={idtableEmail} placeholder="Enter Email No" name="emailNo" required />
                        </Form.Group>
                        <Form.Group controlId="e-mail">
                            <Form.Label>Email*</Form.Label>
                            <Form.Control type="email" defaultValue={tableEmailEmailAddress} placeholder="Enter Email Id" name="email" required />
                        </Form.Group>

                        {showErrorMsg && <div className="err-msg"><p>{errorMsg}</p></div>}
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>Close</Button>
                        <Button variant="primary" type="submit">Update</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }

}
export default EmailModal;