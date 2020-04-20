import React from 'react';
import { Jumbotron, Row, Button, Col, Table } from 'react-bootstrap';
import { showLoader, hideLoader } from '../components/Loader';
import EmpModal from '../components/EmpModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

class Employee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            role: [],
            showEmpModal: false,
            empModalType: 'create',
            showErrorMsg: false,
            errorMsg: '',
            viewData: {},
            empList: []
        };
    }

    nameValidate(name) {
        let regex = /^[A-Z a-z]+$/;
        if (name === "" || name === undefined) {
            return {
                result: false,
                msg: 'Name is required'
            };
        }
        else if (!regex.test(name)) {
            return {
                result: false,
                msg: "Name can have alphabate only"
            }
        }
        return {
            result: true,
            msg: ''
        };
    }
    codeValidate(code) {
        //let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        let regex = /^[a-z0-9]+$/i;
        if (code === "" || code === undefined) {
            return {
                result: false,
                msg: 'Employee code is required'
            }
        }
        else if (!regex.test(code)) {
            return {
                result: false,
                msg: "Employee Code must be alphanumeric"
            }
        }
        return {
            result: true,
            msg: ''
        }
    }
    // emailValidate(name) {
    //     if (name === "" || name === undefined) {
    //         return false;
    //     }
    //     return true;
    // }
    dobValidate(dob) {
        console.log(dob)
    }
    dojValidate(doj) {
        console.log(doj)
    }
    salaryValidate(salary) {
        let regex = /^[0-9.]+$/;
        if (salary === "" || salary === undefined) {
            return {
                result: false,
                msg: 'Employee\'s Salary is required'
            }
        }
        if (!regex.test(salary)) {
            return {
                result: false,
                msg: "Employee Salary must be number"
            }
        }
        if (salary.includes(".")) {
            let count = salary.split('.').length - 1;
            if (count > 1) {
                return {
                    result: false,
                    msg: 'remove extra (.) from Employee\'s Salary'
                }
            }
            else {
                let index = salary.indexOf('.');
                var len = salary.length - 1;
                if (len > index + 3) {
                    return {
                        result: false,
                        msg: 'Only 3 digits allowed after decimal in Employee\'s Salary'
                    }
                }
            }
        }
        return {
            result: true,
            msg: ''
        }
    }
    submitEmpModal(empModalType, e) {
        e.preventDefault();
        e.stopPropagation();
        let formData = e.currentTarget.elements;
        let nameCheck = this.nameValidate(formData.name.value);
        if (!nameCheck.result) {
            this.setState({ errorMsg: nameCheck.msg, showErrorMsg: true });
            return false;
        }

        let codeCheck = this.codeValidate(formData.code.value);
        if (!codeCheck.result) {
            this.setState({ errorMsg: codeCheck.msg, showErrorMsg: true });
            return false;
        }

        let salaryCheck = this.salaryValidate(formData.salary.value);
        if (!salaryCheck.result) {
            this.setState({ errorMsg: salaryCheck.msg, showErrorMsg: true });
            return false;
        }
        this.setState({ errorMsg: '', showErrorMsg: false }, () => {

            let data = JSON.stringify({
                name: formData.name.value,
                tableEmployeeEmailAddress: formData.email.value,
                tableEmployeeDOB: formData.dob.value,
                tableEmployeeDOJ: formData.doj.value,
                tableEmployeeSalary: formData.salary.value,
                tableEmployeeGender: formData.gender.value,
                tableEmployeeRole: formData.role.value
            });
            console.log(data);
            let loginId = sessionStorage.getItem("loginId");
            let header = new Headers({ clientId: 175, userid: loginId });
            header.append("content-type", 'application/json');
            let request = {};
            let url = '';
            if (empModalType === 'create') {
                request = {
                    method: 'POST',
                    body: data,
                    headers: header

                }

                url = `https://devfrontend.gscmaven.com/wmsweb/webapi/employee/`;
            }
            else if (empModalType === 'edit') {
                request = {
                    method: 'PUT',
                    body: data,
                    headers: header

                }
                let code = formData.code.value;
                url = `https://devfrontend.gscmaven.com/wmsweb/webapi/employee/${code}`;
            }
            showLoader();
            fetch(url, request)
                .then(res => res.json())
                .then(res => {
                    hideLoader();
                    console.log("res: ", res)
                    if (res !== undefined) {
                        let empListOld = this.state.empList;
                        if (empModalType === 'create') {
                            this.setState({
                                showEmpModal: false,
                                empList: [res, ...empListOld]
                            })
                        } else {
                            let findIndex = empListOld.findIndex(x => x.idtableEmployeeId === res.idtableEmployeeId);
                            empListOld[findIndex] = res;
                            this.setState({
                                showEmpModal: false,
                                empList: [...empListOld]
                            })
                        }

                    }
                })
                .catch(err => hideLoader() && console.log("error: ", err))
        });
    }
    closeModal(e) {
        this.setState({ showEmpModal: false })

    }
    showModal() {
        this.setState({ showEmpModal: true, empModalType: 'create' })
    }
    editEmployee(emp, event) {
        console.log(emp)
        console.log(event.currentTarget)
        console.log(this)
        this.setState({ showEmpModal: true, empModalType: 'edit', viewData: emp })
    }
    removeEmployee(emp, event) {
        let { idtableEmployeeId: empId, name } = emp;
        if (window.confirm(`Confirm remove ${name} having Emp ID: ${empId}`)) {
            let loginId = sessionStorage.getItem("loginId");
            let header = new Headers({ clientId: 175, userid: loginId });
            header.append("content-type", 'application/json');
            let request = {
                method: 'DELETE',
                headers: header

            }
            let url = `https://devfrontend.gscmaven.com/wmsweb/webapi/employee/${empId}`;

            showLoader();
            fetch(url, request)
                .then(res => res.json())
                .then(res => {
                    hideLoader();
                    if (res !== undefined && res === true) {
                        let empListOld = this.state.empList;
                        let newList = empListOld.filter(x => x.idtableEmployeeId !== empId)
                        this.setState({
                            showEmpModal: false,
                            empList: [...newList]
                        })
                    }
                })
                .catch(err => hideLoader() && console.log("error: ", err))

        }

    }
    viewEmployee(emp) {
        this.setState({ showEmpModal: true, empModalType: 'view', viewData: emp })
    }
    componentDidMount() {
        let roleData = sessionStorage.getItem('role');
        if (roleData === null || roleData === "" || roleData === "null" || roleData === undefined) {
            let request = {
                method: 'GET',
                headers: new Headers({
                    clientId: 175
                })
            }
            showLoader();
            fetch("https://devfrontend.gscmaven.com/wmsweb/webapi/user/role", request)
                .then(res => res.json())
                .then(res => {
                    hideLoader();
                    if (res !== undefined && res !== null && res !== '') {
                        sessionStorage.setItem('role', JSON.stringify(res));
                        this.setState({ role: res })
                    }
                })
                .catch(err => { hideLoader(); console.log(err) })
        }
        else {
            this.setState({ role: JSON.parse(roleData) })
        }
        let loginId = sessionStorage.getItem("loginId");
        let request = {
            method: 'GET',
            headers: new Headers({
                clientId: 175,
                userid: loginId
            })
        }
        showLoader();
        fetch("https://devfrontend.gscmaven.com/wmsweb/webapi/employee/", request)
            .then(res => res.json())
            .then(res => {
                hideLoader();
                if (res !== undefined && res !== null && res !== '') {
                    this.setState({ empList: res })
                }
            })
            .catch(err => { hideLoader(); console.log(err) })
    }
    render() {
        console.log(this.state)
        let { role, showEmpModal, empModalType, showErrorMsg, errorMsg, empList, viewData } = this.state;
        return (
            <div>
                <Jumbotron>
                    <Row>
                        <Col>
                            <Button className="mlr-10" variant="outline-primary" onClick={this.showModal.bind(this)} >New Employee</Button>
                        </Col>
                        <Col>
                            <Button className="pull-right w-auto mlr-10 pdf-btn" variant="outline-primary" onClick={this.showModal.bind(this)} ><Link to="/employee-list" className="pdf-link">Print PDF</Link></Button>

                        </Col>
                    </Row>
                    <Table responsive="sm">
                        <thead>
                            <tr>
                                <th>EId</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>DOB</th>
                                <th>DOJ</th>
                                <th>Salary</th>
                                <th>Gender</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {empList && empList.map((v, i) => (
                            <tr key={i}>
                                <td>{v.idtableEmployeeId}</td>
                                <td>{v.name}</td>
                                <td>{v.tableEmployeeEmailAddress}</td>
                                <td>{v.tableEmployeeDOB}</td>
                                <td>{v.tableEmployeeDOJ}</td>
                                <td>{v.tableEmployeeSalary}</td>
                                <td>{v.tableEmployeeGender}</td>
                                <td>{v.tableEmployeeRole}</td>
                                <td>
                                    <Button variant="info" className="mlr-10" title="view" onClick={this.viewEmployee.bind(this, v)}>
                                        <FontAwesomeIcon icon={faEye} ></FontAwesomeIcon>
                                    </Button>
                                    <Button variant="success" className="mlr-10" title="edit" onClick={this.editEmployee.bind(this, v)}>
                                        <FontAwesomeIcon icon={faPen} ></FontAwesomeIcon>
                                    </Button>
                                    <Button variant="danger" className="mlr-10" title="remove" onClick={this.removeEmployee.bind(this, v)}>
                                        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                                    </Button>

                                </td>

                            </tr>
                        ))}
                        <tbody>
                        </tbody>
                    </Table>
                    <EmpModal
                        role={role}
                        showEmpModal={showEmpModal}
                        empModalType={empModalType}
                        showErrorMsg={showErrorMsg}
                        errorMsg={errorMsg}
                        viewData={viewData}
                        submitEmpModal={this.submitEmpModal.bind(this, empModalType)}
                        closeModal={this.closeModal.bind(this)}
                    ></EmpModal>

                </Jumbotron>

            </div>
        )
    }
}
export default Employee;