import React from 'react';
import { Navbar, NavLink, Button, Nav, Form } from 'react-bootstrap';
import RouteChange from './RouteChange';

function signoutFunction() {
    console.log("Sign out");
    sessionStorage.removeItem("loginId");
    window.location.pathname = "/";
}
const Header = () => {
    let { pathname } = window.location;
    let loginId = sessionStorage.getItem('loginId');
    let isLoggedin = false;
    if (loginId !== null && loginId !== "") {
        isLoggedin = true;
    }
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/employee">Employee SPA</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" >
                <Nav className="mr-auto">
                    {isLoggedin ?
                        <>
                            <NavLink href="/employee">Employee</NavLink>
                            <NavLink href="/email">Email</NavLink>
                        </>
                        :
                        null}
                </Nav>
                {isLoggedin ? <Button className="mlr-10" variant="outline-dark" onClick={signoutFunction.bind()}>Sign Out</Button> :
                    <>{pathname !== '/login' ? <Button className="mlr-10" variant="outline-info" onClick={RouteChange.bind(this, "/login")}>Login</Button> : null}
                        {pathname !== '/signup' ? <Button className="mlr-10" variant="outline-info" onClick={RouteChange.bind(this, "/signup")}>Create an Account</Button> : null}</>
                }

            </Navbar.Collapse>
        </Navbar>
    );
}
export default Header;