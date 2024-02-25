import React from "react";
import {Alert, Button, Modal} from "react-bootstrap";


export default class ErrorDialog extends React.Component {

    state = {
        show: true
    }

    render() {
        return (
            <Modal
                show={this.state.show}
                centered="true"
                onHide={() => this.props.onClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>The unexpected happened! 😨</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert variant="danger">
                        {
                            (this.props.errorMessage !== null && this.props.errorMessage !== undefined) ?
                                this.props.errorMessage : "Something went wrong with your request"
                        }
                    </Alert>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => this.props.onClose()}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}