import React, { useState } from 'react';
import firebase from '../../Firebase';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { ContactSupportOutlined } from '@material-ui/icons';

class SecPlan_CusData extends React.Component {

  constructor(props) {

    super(props);
    const firestore = firebase.firestore;
    this.ref = firestore.collection('CUSTOMER');

    this.state = {
      seccustomers: []
    };
    
    const seccustomers=[];
    this.ref.get()
    .then(querySnapshot =>{
        querySnapshot.forEach((doc)=>{
            seccustomers.push(doc.data());
            
        });
        
        this.setState({seccustomers});
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });   
  }

  
  handleOnChange=(e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
}

sendCustomerNo = (e) => {
    e.preventDefault();
    this.props.setCustomer(e.target.value);
}

render() {
    const { classes } = this.props;
        return (
            <div>
                <FormControl>
                    <InputLabel htmlFor="uncontrolled-native"></InputLabel>
                    <NativeSelect
                    value={this.state.CustomerNo}
                    onChange={this.sendCustomerNo}
                    // defaultValue={'001'}
                    inputProps={{
                        name: '고객명',
                        id: 'uncontrolled-native',
                    }}
                    >
                      {this.state.seccustomers.map((cust) => (
                        <option key={cust.CustomerNo} value={cust.CustomerNo}>
                            {cust.CustomerName}
                        </option>
                    ))}
                    </NativeSelect>
                                   
                </FormControl>
            </div>
        )
    }
}

export default SecPlan_CusData;