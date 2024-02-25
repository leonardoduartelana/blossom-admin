import {Button, Card, Col, Container, Row, Spinner} from "react-bootstrap";
import useViewModel from "../home/HomeViewModel";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../App";
import {mergeChanges} from "../../common/StateUtils";
import {useNavigate} from "react-router-dom";

export default function HomeView() {
    const navigate = useNavigate()
    const [userConfig, setUserConfig] = useContext(UserContext);
    const {
        error,
    } = useViewModel()
    const [loading, setLoading] = useState(true)

    return (
        <Container className="theme-dark-background" style={{width: '100vw', height: '95vh'}}>
            <main className="mx-auto ml-sm-auto px-md-4 py-4 w-100 h-100">
                <h3 className="text-center my-3">Wallets</h3>
                <Col className="h-100">
                    <Row className="overflow-y-scroll" style={{minHeight: '80%', maxHeight: '80%'}}>
                        {loading ?
                            <Spinner className="mx-auto my-auto" variant={"primary"} animation={"border"}/> : null
                        }
                    </Row>
                </Col>
            </main>
        </Container>
    )

}