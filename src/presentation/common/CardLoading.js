import React, {PureComponent} from "react";
import './CardLoading.css'

export default class CardLoading extends React.PureComponent {

    render() {
        return (
            <div className="card-loading-overlay">
                <div className="lds-ripple">
                    <div/>
                    <div/>
                </div>
                {/*<div className="card-loading-overlay-animation">*/}
                {/*    <span className="circle circle-1"/>*/}
                {/*    <span className="circle circle-2"/>*/}
                {/*    <span className="circle circle-3"/>*/}
                {/*    <span className="circle circle-4"/>*/}
                {/*    <span className="circle circle-5"/>*/}
                {/*    <span className="circle circle-6"/>*/}
                {/*    <span className="circle circle-7"/>*/}
                {/*    <span className="circle circle-8"/>*/}
                {/*</div>*/}
            </div>
        )
    }

}