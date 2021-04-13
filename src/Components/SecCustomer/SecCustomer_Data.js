import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Link } from 'react-router-dom';
import SecCustomer_Delete from './SecCustomer_Delete';
import SecCustomer_Edit from './SecCustomer_Edit';

class SecCustomer_Data extends React.Component {
render() {
        return (
            <TableRow>
                <TableCell><Link to={`/SecCustomer_show/${this.props.CustomerNo}`}>{this.props.CustomerNo}</Link></TableCell>
                <TableCell>{this.props.CustomerName}</TableCell>
                <TableCell>{this.props.CustomerAddr}</TableCell>
                <TableCell><SecCustomer_Edit stateRefresh={this.props.stateRefresh} docid={this.props.CustomerNo} /></TableCell>
                <TableCell><SecCustomer_Delete stateRefresh={this.props.stateRefresh} docid={this.props.CustomerNo}/></TableCell>
            </TableRow>
        )
    }
}

export default SecCustomer_Data;