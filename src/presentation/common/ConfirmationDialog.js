import {Alert, Button, Modal} from "react-bootstrap";
import React from "react";

export default function ConfirmationDialog(props) {
    return (
        <Modal
            show={true}
            centered="true">
            <Modal.Header className={"justify-content-center"}>
                <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert variant="danger">
                    {props.body}
                </Alert>
            </Modal.Body>
            <Modal.Footer className={"justify-content-center"}>
                <Button variant="primary" onClick={() => props.onConfirm()}>
                    Confirm
                </Button>
                <Button variant="secondary" onClick={() => props.onCancel()}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )
}