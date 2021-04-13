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
            고객 데이타 생성
        </Button>

        <Dialog open={this.state.open} onClose={this.handleClose}>
        <DialogTitle>고객 추가</DialogTitle>
        <DialogContent>   
        <TextField label="고객번호" type="text" name="CustomerNo" value={CustomerNo} 
        error ={CustomerNo ===""?true:false} helperText="고객번호는 필수입력항목입니다" 
        defaultValue={CustomerNo}
        onChange={this.handleOnChange} /><br/>
        <TextField label="고객명" type="text" name="CustomerName" value={CustomerName} 
        error ={CustomerName ===""?true:false} helperText="고객명은 필수입력항목입니다" 
        defaultValue={CustomerName}
        onChange={this.handleOnChange} /><br/>
        <TextField label="고객주소" multiline rows={4} name="CustomerAddr" value={CustomerAddr} onChange={this.handleOnChange} /><br/>
     
      <br/>
      
        </DialogContent>
        <DialogActions>
            <Button variant="contained" color="primary" onClick={this.handleOnSubmit}>추가</Button>
            <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
        </DialogActions>
        </Dialog>
    </div>
    )}
}

export default withStyles(styles)(SecCustomer_Create)