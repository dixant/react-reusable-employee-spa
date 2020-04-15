import React from 'react';
import { Form, Button, Row, Container, Modal } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

const EmpModal = ({ role, showEmpModal, empModalType, showErrorMsg, errorMsg, submitEmpModal, closeModal, viewData }) => {
    console.log(viewData)
    if (empModalType === 'create') {
        return (
            <Modal show={showEmpModal} centered >
                <Modal.Header>
                    <Modal.Title>Create New Employee Data</Modal.Title>
                </Modal.Header>
                <Form onSubmit={submitEmpModal}>
                    <Modal.Body>
                        <Form.Group controlId="emp-name">
                            <Form.Label>Employee Name*</Form.Label>
                            <Form.Control type="text" placeholder="Enter Employee Name" name="name" required />
                        </Form.Group>

                        <Form.Group controlId="emp-code">
                            <Form.Label>Employee Code*</Form.Label>
                            <Form.Control type="text" placeholder="Enter Employee Code" name="code" required />
                        </Form.Group>

                        <Form.Group controlId="emp-email">
                            <Form.Label>Employee Email*</Form.Label>
                            <Form.Control type="email" placeholder="Enter Employee Email Id" name="email" required />
                        </Form.Group>
                        <Form.Group controlId="emp-dob">
                            <Form.Label>Employee DOB*</Form.Label>
                            <Form.Control type="date" placeholder="Enter Employee's DOB" name="dob" required />
                        </Form.Group>
                        <Form.Group controlId="emp-doj">
                            <Form.Label>Employee DOJ*</Form.Label>
                            <Form.Control type="date" placeholder="Enter Employee's DOJ" name="doj" required />
                        </Form.Group>

                        <Form.Group controlId="emp-salary">
                            <Form.Label>Employee Salary*</Form.Label>
                            <Form.Control type="text" placeholder="Enter Employee's Salary" name="salary" required />
                        </Form.Group>
                        <Form.Group controlId="signup-role">
                            <Form.Label>Role*</Form.Label>
                            <Form.Control as="select" name="role" required>
                                {role && role.map((v, i) => (
                                    <option key={i} value={v.role}>{v.role}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label className="flex">Employee Gender*</Form.Label>
                            <Form.Check inline label="Male" type="radio" id="emp-male" value="male" name="gender" required />
                            <Form.Check inline label="Female" type="radio" id="emp-female" value="female" name="gender" required />
                        </Form.Group>

                        {showErrorMsg && <div className="err-msg"><p>{errorMsg}</p></div>}
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>Cancel</Button>
                        <Button variant="primary" type="submit">Create</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
    else if (empModalType === 'view') {
        let { name, idtableEmployeeId, tableEmployeeEmailAddress, tableEmployeeDOB, tableEmployeeDOJ, tableEmployeeSalary, tableEmployeeGender, tableEmployeeRole } = viewData;
        return (
            <Modal show={showEmpModal} centered className="view-mode">
            <Modal.Header>
                <Modal.Title>View Employee Data</Modal.Title>
            </Modal.Header>
            <Form onSubmit={submitEmpModal}>
                <Modal.Body>
                    <Form.Group controlId="emp-name">
                        <Form.Label>Employee Name*</Form.Label>
                        <Form.Control type="text" defaultValue={name} placeholder="Enter Employee Name" name="name" required />
                    </Form.Group>

                    <Form.Group controlId="emp-code">
                        <Form.Label>Employee Code*</Form.Label>
                        <Form.Control type="text" defaultValue={idtableEmployeeId} placeholder="Enter Employee Code" name="code" required />
                    </Form.Group>

                    <Form.Group controlId="emp-email">
                        <Form.Label>Employee Email*</Form.Label>
                        <Form.Control type="email" defaultValue={tableEmployeeEmailAddress} placeholder="Enter Employee Email Id" name="email" required />
                    </Form.Group>
                    <Form.Group controlId="emp-dob">
                        <Form.Label>Employee DOB*</Form.Label>
                        <Form.Control type="date" defaultValue={tableEmployeeDOB} placeholder="Enter Employee's DOB" name="dob" required />
                    </Form.Group>
                    <Form.Group controlId="emp-doj">
                        <Form.Label>Employee DOJ*</Form.Label>
                        <Form.Control type="date" defaultValue={tableEmployeeDOJ} placeholder="Enter Employee's DOJ" name="doj" required />
                    </Form.Group>

                    <Form.Group controlId="emp-salary">
                        <Form.Label>Employee Salary*</Form.Label>
                        <Form.Control type="text" defaultValue={tableEmployeeSalary} placeholder="Enter Employee's Salary" name="salary" required />
                    </Form.Group>
                    <Form.Group controlId="signup-role">
                        <Form.Label>Role*</Form.Label>
                        <Form.Control as="select" defaultValue={tableEmployeeRole} name="role" required>
                            {role && role.map((v, i) => (
                                <option key={i} value={v.role}>{v.role}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label className="flex">Employee Gender*</Form.Label>
                        <Form.Check inline label="Male" defaultChecked = {tableEmployeeGender === 'male' || tableEmployeeGender === 'Male' ? true : false} type="radio" id="emp-male" value="male" name="gender" required />
                        <Form.Check inline label="Female" type="radio" id="emp-female" value="female" name="gender" required defaultChecked = {tableEmployeeGender === 'female' || tableEmployeeGender === 'Female' ? true : false}/>
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
    else if (empModalType === 'edit') {
        let { name, idtableEmployeeId, tableEmployeeEmailAddress, tableEmployeeDOB, tableEmployeeDOJ, tableEmployeeSalary, tableEmployeeGender, tableEmployeeRole } = viewData;
        return (
            <Modal show={showEmpModal} centered>
            <Modal.Header>
                <Modal.Title>Edit Employee Data</Modal.Title>
            </Modal.Header>
            <Form onSubmit={submitEmpModal}>
                <Modal.Body>
                    <Form.Group controlId="emp-name">
                        <Form.Label>Employee Name*</Form.Label>
                        <Form.Control type="text" defaultValue={name} placeholder="Enter Employee Name" name="name" required />
                    </Form.Group>

                    <Form.Group controlId="emp-code">
                        <Form.Label>Employee Code*</Form.Label>
                        <Form.Control type="text" disabled defaultValue={idtableEmployeeId} placeholder="Enter Employee Code" name="code" required />
                    </Form.Group>

                    <Form.Group controlId="emp-email">
                        <Form.Label>Employee Email*</Form.Label>
                        <Form.Control type="email" defaultValue={tableEmployeeEmailAddress} placeholder="Enter Employee Email Id" name="email" required />
                    </Form.Group>
                    <Form.Group controlId="emp-dob">
                        <Form.Label>Employee DOB*</Form.Label>
                        <Form.Control type="date" defaultValue={tableEmployeeDOB} placeholder="Enter Employee's DOB" name="dob" required />
                    </Form.Group>
                    <Form.Group controlId="emp-doj">
                        <Form.Label>Employee DOJ*</Form.Label>
                        <Form.Control type="date" defaultValue={tableEmployeeDOJ} placeholder="Enter Employee's DOJ" name="doj" required />
                    </Form.Group>

                    <Form.Group controlId="emp-salary">
                        <Form.Label>Employee Salary*</Form.Label>
                        <Form.Control type="text" defaultValue={tableEmployeeSalary} placeholder="Enter Employee's Salary" name="salary" required />
                    </Form.Group>
                    <Form.Group controlId="signup-role">
                        <Form.Label>Role*</Form.Label>
                        <Form.Control as="select" defaultValue={tableEmployeeRole} name="role" required>
                            {role && role.map((v, i) => (
                                <option key={i} value={v.role}>{v.role}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label className="flex">Employee Gender*</Form.Label>
                        <Form.Check inline label="Male" defaultChecked = {tableEmployeeGender === 'male' || tableEmployeeGender === 'Male' ? true : false} type="radio" id="emp-male" value="male" name="gender" required />
                        <Form.Check inline label="Female" type="radio" id="emp-female" value="female" name="gender" required defaultChecked = {tableEmployeeGender === 'female' || tableEmployeeGender === 'Female' ? true : false}/>
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
export default EmpModal;