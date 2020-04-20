// Login Page
// a. Email
// b. Password
// (With Proper Validation Messages)
// c. Login :API:- 3
// After login Goto Employee page
import React from 'react';
import LoginForm from '../components/LoginForm';
import { showLoader, hideLoader } from '../components/Loader';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMsg: '',
            showErrorMsg: false
        }
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
    onLogin(e) {
        e.preventDefault();
        e.stopPropagation();

        let formData = e.currentTarget.elements;
        
        let header = new Headers({ clientId: 175 });
        header.append("content-type", 'application/json');
        let userPass = formData.password.value;
        let userEmail = formData.email.value;
        let request = {
            method: 'POST',
            headers: header

        }
        showLoader();
        fetch(`https://devfrontend.gscmaven.com/wmsweb/webapi/user/login?email=${userEmail
            }&password=${userPass} `, request)
            .then(res => {
                if (res.status === 400) {
                    this.setState({ errorMsg: 'UserRecord not found', showErrorMsg: true })
                }
                else {
                   return res.json()
                }
            })
            .then(res => {
                hideLoader();
                if (res !== undefined && res !== null && res !== '') {
                    sessionStorage.setItem('loginId', res);
                    window.location.pathname = "/employee";
                }
            })
            .catch(err => {
                hideLoader(); console.log("err", err);
                this.setState({ errorMsg: 'something went wrong, try again..', showErrorMsg: true })
            })
    }
    render() {
        let { errorMsg, showErrorMsg } = this.state;
        return (
            <LoginForm
                onLogin={this.onLogin.bind(this)}
                showErrorMsg={showErrorMsg}
                errorMsg={errorMsg}
            ></LoginForm>
        )
    }
}
export default Login;