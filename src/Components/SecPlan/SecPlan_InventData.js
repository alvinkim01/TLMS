import React, { useState } from 'react';
import firebase from '../../Firebase';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

class SecPlan_InventData extends React.Component {

  constructor(props) {

    super(props);
    const firestore = firebase.firestore;
    this.ref = firestore.collection('INVENTORY');

    this.state = {
      secinventorys: []
    };
    
    const secinventorys=[];
    this.ref.get()
    .then(querySnapshot =>{
        querySnapshot.forEach((doc)=>{
            secinventorys.push(doc.data());
            
        });
        
        this.setState({secinventorys});
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

sendInventoryNo = (e) => {
    e.preventDefault();
    this.props.setInventory(e.target.value)
}

render() {
    const { classes } = this.props;
        return (
            <div>
                <FormControl>
                    <InputLabel htmlFor="uncontrolled-native"></InputLabel>
                    <NativeSelect
                    value={this.state.inventoryNo}
                    onChange={this.sendInventoryNo}
                    defaultValue={'TRU1000'}
                    inputProps={{
                        name: '제품명',
                        id: 'uncontrolled-native',
                    }}
                    >
                      {this.state.secinventorys.map((invent) => (
                        <option key={invent.InventoryNo} value={invent.InventoryNo}>
                            {invent.InventoryDesc}
                        </option>
                    ))}
                    </NativeSelect>
                                   
                </FormControl>
            </div>
        )
    }
}

export default SecPlan_InventData;