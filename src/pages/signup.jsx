// Create a Signup page with following fields
// a. Name
// b. Email
// c. Password (One Character / One Numeric / One special Character / Min Length 8)
// d. Role: (use API:- 1 for role listing ): Dropdown
// e. Save : API:- 2
// f. Close :
// On success redirect to Login Page


import React from 'react';
import SignupForm from '../components/SignupForm';
import { showLoader, hideLoader } from '../components/Loader';
import RouteChange from '..//components/RouteChange';

class Signup extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            role: [],
            errorMsg: '',
            showErrorMsg: false
        }
    }
    nameValidate(name) {
        if (name === "" || name === undefined) {
            return false;
        }
        return true;
    }
    passwordValidate(password) {
        // @$!%*#?&
        let passRex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (password === "" || password === undefined) {
            return {
                result: false,
                msg: "Password is Required"
            }
        }
        else if (password.length < 8) {
            return {
                result: false,
                msg: "Password must be at least 8 length"
            }
        }
        else if (!passRex.test(password)) {
            return {
                result: false,
                msg: "Password must contain one number, one alphabet and one special character(!@#$%^&*)"
            }
        }
        return {
            result: true,
            msg: ""
        }
    }
    onSignup(e) {
        e.preventDefault();
        e.stopPropagation();
        let formData = e.currentTarget.elements;
        if (!this.nameValidate(formData.name.value)) {
            this.setState({ errorMsg: "Name is required", showErrorMsg: true });
            return false;
        }
        let pcheck = this.passwordValidate(formData.password.value);
        console.log(pcheck)
        if (!pcheck.result) {
            this.setState({ errorMsg: pcheck.msg, showErrorMsg: true });
            return false;
        }
        let data = JSON.stringify({
            userName: formData.name.value,
            userPass: formData.password.value,
            userEmail: formData.email.value,
            userRole: formData.role.value,
        })
        let header = new Headers({ clientId: 175 });
        header.append("content-type", 'application/json');
        let request = {
            method: 'POST',
            body: data,
            headers: header

        }
        showLoader();
        fetch("https://devfrontend.gscmaven.com/wmsweb/webapi/user/signup", request)
            .then(res => {
                if (res.status == 200) { return res.json() }
            })
            .then(res => {
                hideLoader();
                console.log(res)
                if (res !== undefined) {
                    RouteChange.call(this, '/login');
                }
                else {
                    this.setState({ errorMsg: 'something went wrong, try again..', showErrorMsg: true });
                }
            })
            .catch(err => { hideLoader(); console.log(err); this.setState({ errorMsg: 'something went wrong, try again..', showErrorMsg: true }); })
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
    }
    render() {
        let { role, errorMsg, showErrorMsg } = this.state
        return (
            <SignupForm
                role={role}
                onSignup={this.onSignup.bind(this)}
                passwordValidate={this.passwordValidate.bind(this)}
                showErrorMsg={showErrorMsg}
                errorMsg={errorMsg}
            ></SignupForm>
        )
    }
}
export default Signup;