import React from 'react'
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



class SecCustomer_Edit extends React.Component {

    constructor(props) {
        super(props);
        const firestore = firebase.firestore;
        this.ref = firestore.collection('CUSTOMER').doc(this.props.docid);
        this.state = {      
          open: false          
        };
      }
    
      componentDidMount() {

        this.ref.get().then((doc) => {
          if (doc.exists) {
            const SecCustomer = doc.data();
            this.setState({
              key: SecCustomer.id,
              CustomerName : SecCustomer.CustomerName,
              CustomerNo : SecCustomer.CustomerNo,
              CustomerAddr : SecCustomer.CustomerAddr
            });
          } else {
            console.log("No such document!");
          }
        });
      }

    handleOnSubmit = (e) => {
        e.preventDefault();
        this.handleDbCreate();      
        this.setState ({
            CustomerName:'',
            CustomerNo:'',
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

          const {CustomerName,CustomerNo,CustomerAddr} = this.state; 

          this.ref.update({
            CustomerName : CustomerName,
            CustomerNo : CustomerNo,
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
        open: true
    });
    }

    handleClose=()=> {
        this.setState({           
            CustomerName:'',
            CustomerNo:'',
            CustomerAddr: '',
            open: false
        })
    }

    render() {
    const { classes } = this.props;
    const {CustomerName,CustomerNo,CustomerAddr} = this.state;

    return (

    <div>
        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
            수정
        </Button>

        <Dialog open={this.state.open} onClose={this.handleClose}>
        <DialogTitle>수정</DialogTitle>
        <DialogContent>
          <TextField label="고객번호" type="text" inputProps={{ readOnly: true, }} name="CustomerNo" value={CustomerNo} onChange={this.handleOnChange} /><br/>
          <TextField label="고객명" type="text" name="CustomerName" value={CustomerName} onChange={this.handleOnChange} /><br/>
          <TextField label="고객주소" type="text" name="CustomerAddr" value={CustomerAddr} onChange={this.handleOnChange} /><br/>
        </DialogContent>
        <DialogActions>
            <Button variant="contained" color="primary" onClick={this.handleOnSubmit}>수정</Button>
            <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
        </DialogActions>
        </Dialog>
    </div>
    )}
}

export default withStyles(styles)(SecCustomer_Edit)