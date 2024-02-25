import {
    Button,
    Card,
    Col, Collapse,
    Container,
    FormControl,
    Image,
    InputGroup,
    ListGroup,
    ListGroupItem,
    Row, Spinner
} from "react-bootstrap";

import useViewModel from "./viewmodels/CustomersViewModel"
import CustomersGridView from "./CustomersGridView";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {logout} from "../login/Firebase";

export default function CustomersView() {
    const {error, customers, searchCustomers} = useViewModel()
    const [loading, setLoading] = useState(false)
    const [searchFirstName, setSearchFirstName] = useState(null)
    const [searchLastName, setSearchLastName] = useState(null)
    const [searchEmail, setSearchEmail] = useState(null)
    const [searchPhone, setSearchPhone] = useState(null)


    const navigate = useNavigate();

    useEffect(() => {
        console.log('Error: ' + JSON.stringify(error))
        if(error !== null && error.code === 401) {
            // Back to login
            logout()
            navigate('/')
        }
    },[error])

    useEffect(() => {
        if(customers) {
            setLoading(false)
        }
    }, [customers])

    return (
        <Container>
            <main className="mx-auto ml-sm-auto px-md-4 py-4 w-100 h-100">
                <Row className="w-100 h-100">
                    <Col className="col-3">
                        <div className="card w-100 h-auto p-3 mx-auto">
                            <h5 className="mx-auto">Search for a customer</h5>
                            <InputGroup className="my-2">
                                <InputGroup.Text className={'input-group-text-prepend-45'}>First name</InputGroup.Text>
                                <FormControl
                                    value={searchFirstName}
                                    onChange={(e) => setSearchFirstName(e.target.value)}
                                    onKeyPress={checkForKeyEnter}
                                />
                            </InputGroup>
                            <InputGroup className="my-1">
                                <InputGroup.Text className={'input-group-text-prepend-45'}>Last name</InputGroup.Text>
                                <FormControl
                                    value={searchLastName}
                                    onChange={(e) => setSearchLastName(e.target.value)}
                                    onKeyPress={checkForKeyEnter}
                                />
                            </InputGroup>
                            <InputGroup className="my-1">
                                <InputGroup.Text className={'input-group-text-prepend-45'}>Phone</InputGroup.Text>
                                <FormControl
                                    value={searchPhone}
                                    placeholder={'0212112312'}
                                    onChange={(e) => setSearchPhone(e.target.value)}
                                    onKeyPress={checkForKeyEnter}
                                />
                            </InputGroup>
                            <InputGroup className="my-1">
                                <InputGroup.Text className={'input-group-text-prepend-45'}>Email</InputGroup.Text>
                                <FormControl
                                    value={searchEmail}
                                    placeholder={'hello@hello.com'}
                                    onChange={(e) => setSearchEmail(e.target.value)}
                                    onKeyPress={checkForKeyEnter}
                                />
                            </InputGroup>
                            <Row className="my-2">
                                <Button className={"w-50 mx-auto"} onClick={() => {
                                    executeSearch();
                                }}>Search</Button>
                            </Row>
                        </div>
                    </Col>
                    <Col className="col-9 h-100">
                        <Row className="mx-auto overflow-hidden" style={{minHeight: '100%', maxHeight: '100%'}}>
                            { loading ? <Spinner className="mx-auto my-auto" variant={"primary"} animation={"border"}/>
                                : customers.length === 0 ? <h6 className="text-center my-5">No results, please change the search parameters</h6> : null }
                            <CustomersGridView customers={customers} onCustomerClick={onCustomerClick}/>
                        </Row>
                    </Col>
                </Row>
            </main>
        </Container>
    )

    function checkForKeyEnter(event) {
        if(event.key === "Enter") {
            executeSearch()
        }
    }

    function executeSearch() {
        searchCustomers(searchFirstName, searchLastName, searchPhone, searchEmail)
        setLoading(true)
    }

    function onCustomerClick(customer) {
    }
}

