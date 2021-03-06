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

class SecCustomer_Create extends React.Component {

    constructor(props) {
        super(props);
        const firestore = firebase.firestore;
        this.ref = firestore.collection('CUSTOMER');
        this.state = {          
          CustomerNo:'',
          CustomerName:'',
          CustomerAddr: '',
          open: false          
        };
      }

    handleOnSubmit = (e) => {
        e.preventDefault();
        this.handleDbCreate();
        this.setState ({          
          CustomerNo:'',
          CustomerName:'',
          CustomerAddr: '',
          open: false
          })
    }
   


    handleOnChange=(e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
    
   
    
    handleDbCreate=()=>{      
          const {CustomerNo,CustomerName,CustomerAddr} = this.state;    
          this.ref.doc(CustomerNo).set({            
            CustomerNo : CustomerNo,
            CustomerName : CustomerName,
            CustomerAddr : CustomerAddr
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
          CustomerNo:'',
          CustomerName:'',
          CustomerAddr: '',
          open: true
    });
    }

    handleClose=()=> {
        this.setState({          
          CustomerNo:'',
          CustomerName:'',
          CustomerAddr: '',
          open: false
        })
    }    
  

    render() {
    const { classes } = this.props;
    const {CustomerNo,CustomerName,CustomerAddr} = this.state;
    
    return (

    <div>
        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
            ?????? ????????? ??????
        </Button>

        <Dialog open={this.state.open} onClose={this.handleClose}>
        <DialogTitle>?????? ??????</DialogTitle>
        <DialogContent>   
        <TextField label="????????????" type="text" name="CustomerNo" value={CustomerNo} 
        error ={CustomerNo ===""?true:false} helperText="??????????????? ???????????????????????????" 
        defaultValue={CustomerNo}
        onChange={this.handleOnChange} /><br/>
        <TextField label="?????????" type="text" name="CustomerName" value={CustomerName} 
        error ={CustomerName ===""?true:false} helperText="???????????? ???????????????????????????" 
        defaultValue={CustomerName}
        onChange={this.handleOnChange} /><br/>
        <TextField label="????????????" multiline rows={4} name="CustomerAddr" value={CustomerAddr} onChange={this.handleOnChange} /><br/>
     
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

export default withStyles(styles)(SecCustomer_Create)