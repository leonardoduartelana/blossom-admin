import { DateRangePicker } from 'react-date-range';
import {Component} from "react";

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

export default class DatePicker extends Component {
    render(){
        const selectionRange = {
            startDate: this.props.selectionRange.startDate,
            endDate: this.props.selectionRange.endDate,
            key: 'selection',
        }
        return (
            <DateRangePicker
                ranges={[selectionRange]}
                onChange={this.props.onChange}
            />
        )
    }
}