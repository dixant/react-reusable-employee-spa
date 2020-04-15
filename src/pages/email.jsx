import React from 'react';
import { Row, Jumbotron, Button, CardColumns, Card, Table } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import EmailModal from '../components/EmailModal';
import { hideLoader, showLoader } from '../components/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

class Email extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            role: [],
            showEmailModal: false,
            emailModalType: 'create',
            showErrorMsg: false,
            errorMsg: '',
            viewData: {},
            emailList: []
        };
    }
    closeModal(e) {
        this.setState({ showEmailModal: false })

    }
    showModal() {
        this.setState({ showEmailModal: true, empModalType: 'create' })
    }
    submitEmailModal(emailModalType, e) {
        e.preventDefault();
        e.stopPropagation();
        let formData = e.currentTarget.elements;
        
        this.setState({ errorMsg: '', showErrorMsg: false }, () => {

            let data = JSON.stringify({
                tableEmailEmailAddress: formData.email.value,
                tableEmailValidate: true
            });
            console.log(data);
            let loginId = sessionStorage.getItem("loginId");
            let header = new Headers({ clientId: 175, userid: loginId });
            header.append("content-type", 'application/json');
            let request = {};
            let url = '';
            if (emailModalType === 'create') {
                request = {
                    method: 'POST',
                    body: data,
                    headers: header

                }

                url = `https://devfrontend.gscmaven.com/wmsweb/webapi/email/`;
            }
            else if (emailModalType === 'edit') {
                request = {
                    method: 'PUT',
                    body: data,
                    headers: header

                }
                let code = formData.emailNo.value;
                url = `https://devfrontend.gscmaven.com/wmsweb/webapi/email/${code}`;
            }
            showLoader();
            fetch(url, request)
                .then(res => res.json())
                .then(res => {
                    hideLoader();
                    console.log("res: ", res)
                    if (res !== undefined) {
                        let emailListOld = this.state.emailList;
                        if (emailModalType === 'create') {
                            this.setState({
                                showEmailModal: false,
                                emailList: [res, ...emailListOld]
                            })
                        } else {
                            let findIndex = emailListOld.findIndex(x => x.idtableEmail == res.idtableEmail);
                            emailListOld[findIndex] = res;
                            this.setState({
                                showEmailModal: false,
                                emailList: [...emailListOld]
                            })
                        }

                    }
                })
                .catch(err => hideLoader() && console.log("error: ", err))
        });
    }
    editEmail(email, event) {
        console.log(email)
        console.log(event.currentTarget)
        console.log(this)
        this.setState({ showEmailModal: true, emailModalType: 'edit', viewData: email })
    }
    removeEmail(email, event) {
        let { idtableEmail: emailId, tableEmailEmailAddress: mail } = email;
        if (window.confirm(`Confirm remove ${mail} having Email ID: ${emailId}`)) {
            let loginId = sessionStorage.getItem("loginId");
            let header = new Headers({ clientId: 175, userid: loginId });
            header.append("content-type", 'application/json');
            let request = {
                method: 'DELETE',
                headers: header

            }
            let url = `https://devfrontend.gscmaven.com/wmsweb/webapi/email/${emailId}`;

            showLoader();
            fetch(url, request)
                .then(res => res.json())
                .then(res => {
                    hideLoader();
                    if (res !== undefined && res === true) {
                        let emailListOld = this.state.emailList;
                        let newList = emailListOld.filter(x => x.idtableEmail !== emailId)
                        this.setState({
                            showEmailModal: false,
                            emailList: [...newList]
                        })
                    }
                })
                .catch(err => hideLoader() && console.log("error: ", err))

        }

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
        let url = `https://devfrontend.gscmaven.com/wmsweb/webapi/email/`;
        fetch(url, request)
            .then(res => res.json())
            .then(res => {
                hideLoader();
                if (res !== undefined && res !== null && res !== '') {
                    this.setState({ emailList: res })
                }
            })
            .catch(err => { hideLoader(); console.log(err) })
    }
    render() { console.log(this.state)
        let { role, showEmailModal, emailModalType, showErrorMsg, errorMsg, emailList, viewData } = this.state;
        return (
            <Jumbotron>
                <Row>
                    <Col>
                        <Button className="mlr-10" variant="outline-primary" onClick={this.showModal.bind(this)} >New Email</Button>
                    </Col>

                </Row>
                <Table responsive="sm">
                        <thead>
                            <tr>
                                <th>S.no</th>
                                <th>Email Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {emailList && emailList.map((v, i) => (
                            <tr key={i}>
                                <td>{v.idtableEmail}</td>
                                <td>{v.tableEmailEmailAddress}</td>
                                <td>
                                    {/* <Button variant="info" className="mlr-10" title="view" onClick={this.viewEmployee.bind(this, v)}>
                                        <FontAwesomeIcon icon={faEye} ></FontAwesomeIcon>
                                    </Button> */}
                                    <Button variant="success" className="mlr-10" title="edit" onClick={this.editEmail.bind(this, v)}>
                                        <FontAwesomeIcon icon={faPen} ></FontAwesomeIcon>
                                    </Button>
                                    <Button variant="danger" className="mlr-10" title="remove" onClick={this.removeEmail.bind(this, v)}>
                                        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                                    </Button>

                                </td>

                            </tr>
                        ))}
                        <tbody>
                        </tbody>
                    </Table>
                <EmailModal
                        role={role}
                        showEmailModal={showEmailModal}
                        emailModalType={emailModalType}
                        showErrorMsg={showErrorMsg}
                        errorMsg={errorMsg}
                        viewData={viewData}
                        submitEmailModal={this.submitEmailModal.bind(this, emailModalType)}
                        closeModal={this.closeModal.bind(this)}
                    ></EmailModal>
            </Jumbotron>
        )
    }
}
export default Email;