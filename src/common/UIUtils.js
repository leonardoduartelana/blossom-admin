import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {isTextNullOrEmpty} from "./TextUtils";
import logo from "./../logo.svg";

export const wrapAroundToolTip = (element, tooltip) => {
    return (
        <OverlayTrigger overlay={
            <Tooltip id="tooltip-disabled">
                {tooltip}
            </Tooltip>
        }
                        placement="top"
                        delay={{show: 250, hide: 400}} defaultShow={false} >
            {element}
        </OverlayTrigger>
    )
}

export const iconUrlOrDefault = (iconUrl, iconDefault) => {
    return isTextNullOrEmpty(iconUrl) ? iconDefault ? iconDefault : logo : iconUrl
}