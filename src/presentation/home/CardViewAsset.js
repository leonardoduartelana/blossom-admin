import {gsap} from 'gsap';
import {MotionPathPlugin} from "gsap/MotionPathPlugin.js";
import "./CardViewAsset.css"
import {Button, Spinner} from "react-bootstrap";
import VisibilityIcon from '@mui/icons-material/Visibility';
import {Icon} from "@mui/material";

export default function CardViewAsset(props) {

    return (
        <div className="card-view">
            {/*<div className="card-view-ring"/>*/}
            <div className="card-view-logo"><img
                src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Visa"/></div>
            <div className="card-view-chip"><img src="https://i.ibb.co/G9pDnYJ/chip.png" alt="chip"/></div>
            <div className="card-view-number">{props.number}</div>
            <div className="card-view-name">{props.name.toUpperCase()}</div>
            <div className="card-view-expiry">{props.expiry}</div>
            <div className="card-view-cvv">{props.cvv ? props.cvv : ''}</div>
            <VisibilityIcon className={"card-view-button"} onClick={() => {
                props.onRevealClick(props.id)
            }} sx={{color: "white"}}/>
            {props.loading ?
                <Spinner className="card-view-loading" variant={"primary"} animation={"border"}/> : null}
        </div>

    )
}