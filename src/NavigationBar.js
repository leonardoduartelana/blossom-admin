import React, {useContext, useEffect} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "./presentation/login/Firebase";
import {useNavigate} from "react-router";
import {Container, Image, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";

import logo from "./logo.svg";
import {UserContext} from "./App";
import {mergeChanges, replaceValues} from "./common/StateUtils";
import {RsAccount} from "./data/RsAccount";

function NavigationBar() {

    const [userConfig] = useContext(UserContext);
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
    }, [user, loading, navigate]);

    if (user == null || !userConfig.loggedIn)
        return null


    return (
        <Navbar expand="lg">
            <Container className={""}>
                <Navbar.Brand to="/home">
                    <Image roundedCircle={true} src={"https://icons-for-free.com/iconfiles/png/512/fire+flame+icon-1320087271764554318.png"}
                    style={{width:'32px', height:'32px'}}/>
                     <span className={"ms-2"}>
                         Blossom Body Works
                     </span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse>
                    <Nav className="">
                        <Nav.Link as={Link} to="/home">Home</Nav.Link>
                    </Nav>
                    <Nav className="">
                        <Nav.Link as={Link} to="/customers">Customers</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );

}

export default NavigationBar