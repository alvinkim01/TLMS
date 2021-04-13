import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Link } from 'react-router-dom';
import SecPlan_Delete from './SecPlan_Delete';
import SecPlan_Edit from './SecPlan_Edit';

class SecPlan_Data extends React.Component {
render() {
        return (
            <TableRow>
                <TableCell><Link to={`/secplan_show/${this.props.ManagementId}`}>{this.props.ManagementId}</Link></TableCell>
                <TableCell>{this.props.CustomerName}</TableCell>                
                <TableCell>{this.props.ProductName}</TableCell>
                <TableCell>{this.props.AuthCode}</TableCell>
                {/* <TableCell>{this.props.NewRenew}</TableCell>
                <TableCell>{this.props.Start}</TableCell> */}
                <TableCell>{this.props.End}</TableCell>
                <TableCell><SecPlan_Edit stateRefresh={this.props.stateRefresh} docid={this.props.ManagementId} /></TableCell>
                <TableCell><SecPlan_Delete stateRefresh={this.props.stateRefresh} docid={this.props.ManagementId}/></TableCell>
            </TableRow>
        )
    }
}

export default SecPlan_Data;