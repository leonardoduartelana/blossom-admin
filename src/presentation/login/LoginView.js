import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {auth, signInWithGooglePopup} from "./Firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import CardLoading from "../common/CardLoading";
import {Button, Col, Container, FormControl, InputGroup, Modal, Row, Spinner} from "react-bootstrap";
import "./LoginView.css"
import CustomersGridView from "../home/CustomersGridView";
import {UserContext} from "../../App";

export default function LoginView() {
    const navigate = useNavigate()

    const [userConfig] = useContext(UserContext);
    const [showLogin, setShowLogin] = useState(false)
    const [loading, setLoading] = useState(false)
    const [firebaseUser, firebaseLoading, firebaseError] = useAuthState(auth);

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
        setShowLogin(true)
        setLoading(false)
    }

    useEffect(() => {
        if (firebaseLoading) {
            // maybe trigger a loading screen
            return;
        }
        if (firebaseError) {
            console.log('Error login: ' + firebaseError)
        }
    }, [firebaseLoading, firebaseError]);

    useEffect(() => {
        if (firebaseUser) {
            // logout()
            setTimeout(() => {
                userConfig.loggedIn = true
                navigate("/home");
            }, 100)
        }
    }, [firebaseUser])

    return (
        <Container style={{width: '100vw', height: '95vh'}}>
            <main className="mx-auto ml-sm-auto px-md-4 py-4 w-100 h-100">
                <Row className="w-100 h-100">
                    <Container className="p-4 w-50">
                        <h4 className="mx-auto text-center">Welcome!</h4>
                        <Row className="my-4">
                            {
                                loading || firebaseLoading ?
                                <Spinner className="mx-auto my-auto" variant={"primary"} animation={"border"}/> :
                                    showLogin ? <Button
                                        className="w-50 mx-auto"
                                        variant='primary'
                                        onClick={() => {
                                            setShowLogin(false)
                                            setLoading(true)
                                            signInWithGoogle()
                                        }}>
                                        Sign In
                                    </Button> : null

                            }
                        </Row>
                    </Container>
                </Row>
            </main>
        </Container>
    );

}