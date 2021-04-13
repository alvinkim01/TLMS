import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Link } from 'react-router-dom';
import SecInventory_Delete from './SecInventory_Delete';
import SecInventory_Edit from './SecInventory_Edit';

class SecCustomer_Data extends React.Component {
render() {
        return (
            <TableRow>
                <TableCell><Link to={`/SecInventory_Show/${this.props.InventoryNo}`}>{this.props.InventoryNo}</Link></TableCell>
                <TableCell>{this.props.InventoryDesc}</TableCell>
                <TableCell><SecInventory_Edit stateRefresh={this.props.stateRefresh} docid={this.props.InventoryNo} /></TableCell>
                <TableCell><SecInventory_Delete stateRefresh={this.props.stateRefresh} docid={this.props.InventoryNo}/></TableCell>
            </TableRow>
        )
    }
}

export default SecCustomer_Data;