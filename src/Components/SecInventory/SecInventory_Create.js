import React, { useState } from 'react';
import firebase from '../../Firebase';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    hidden: {
    display: 'none'
    }
});

class SecInventory_Create extends React.Component {

    constructor(props) {
        super(props);
        const firestore = firebase.firestore;
        this.ref = firestore.collection('INVENTORY');
        this.state = {          
          InventoryNo:'',
          InventoryDesc:'',
          open: false          
        };
      }

    handleOnSubmit = (e) => {
        e.preventDefault();
        this.handleDbCreate();
        this.setState ({          
          InventoryNo:'',
          InventoryDesc:'',
          open: false
          })
    }
   


    handleOnChange=(e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
    
   
    
    handleDbCreate=()=>{      
          const {InventoryNo,InventoryDesc} = this.state;    
          this.ref.doc(InventoryNo).set({            
            InventoryNo : InventoryNo,
            InventoryDesc : InventoryDesc
          })
          .then(() => {
            this.setState({
                open: false
            });
            this.props.stateRefresh()
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
    } 

    handleClickOpen=()=> {
        this.setState({          
          InventoryNo:'',
          InventoryDesc:'',
          open: true
    });
    }

    handleClose=()=> {
        this.setState({          
          InventoryNo:'',
          InventoryDesc:'',
          open: false
        })
    }    
  

    render() {
    // const { classes } = this.props;
    const {InventoryNo,InventoryDesc} = this.state;
    
    return (

    <div>
        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
            ???????????? ??????
        </Button>

        <Dialog open={this.state.open} onClose={this.handleClose}>
        <DialogTitle>??????????????????</DialogTitle>
        <DialogContent>   
        <TextField label="????????????" type="text" name="InventoryNo" value={InventoryNo} 
        error ={InventoryNo ===""?true:false} helperText="??????????????? ???????????????????????????" 
        defaultValue={InventoryNo}
        onChange={this.handleOnChange} /><br/>
        <TextField label="?????????" type="text" name="InventoryDesc" value={InventoryDesc} 
        error ={InventoryDesc ===""?true:false} helperText="???????????? ???????????????????????????" 
        defaultValue={InventoryDesc}
        onChange={this.handleOnChange} /><br/>     
      <br/>
      
        </DialogContent>
        <DialogActions>
            <Button variant="contained" color="primary" onClick={this.handleOnSubmit}>??????</Button>
            <Button variant="outlined" color="primary" onClick={this.handleClose}>??????</Button>
        </DialogActions>
        </Dialog>
    </div>
    )}
}

export default withStyles(styles)(SecInventory_Create)