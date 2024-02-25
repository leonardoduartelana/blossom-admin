import {Button, Card, Col, Container, Image, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import "./CustomersGridView.css"
import {fromUpperCaseToDisplay, isTextNullOrEmpty} from "../../common/TextUtils";
import logo from "./../../logo.svg";
import {iconUrlOrDefault} from "../../common/UIUtils";

export default function CustomersGridView(props) {
    let gridColumns = props.gridColumns ? props.gridColumns : 3
    let onCustomerClick = props.onCustomerClick
    let customers = props.customers ? props.customers : []

    let rows = []

    for (let i = 0; i < customers.length; i += gridColumns) {
        let columns = []
        for (let j = i; j < i + gridColumns; j++) {
            if (customers[j] !== undefined) {
                columns.push(
                    <Col>
                        {getCustomerCard(customers[j], onCustomerClick)}
                    </Col>
                )
            } else {
                columns.push(
                    <Col/>
                )
            }
        }

        if (columns.length > 0) {
            rows.push(
                <Row>
                    {columns.map((element) => element)}
                </Row>
            )
        }
    }

    return (
        <Container className="">
            {rows.map((element) => element)}
        </Container>
    )
}

function getCustomerCard(customer, onCustomerClick) {
    return (
        <Card className="theme-dark-background-light pt-4 mb-2 mt-2">
            <Row>
                <Col>
                    <h5 className="theme-dark-text">{customer.lastName}</h5>
                    <h6 className="theme-dark-text-secondary">{customer.firstName}</h6>
                    <h6 className="theme-dark-text-secondary">{isTextNullOrEmpty(customer.phoneNumber) ? 'No phone number' : customer.phoneNumber}</h6>
                    <h6 className="theme-dark-text-secondary">{customer.email}</h6>
                    <Col className="my-3">
                        <Button className="my-3 w-75" variant="outline-primary" onClick={() => onCustomerClick(customer)}>Expand</Button>
                    </Col>
                </Col>
            </Row>
        </Card>
    )
}