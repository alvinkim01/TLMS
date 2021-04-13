import React from 'react'
import firebase from '../../Firebase';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import SecPlan_CusData from './SecPlan_CusData';
import SecPlan_InventData from './SecPlan_InventData';



const styles = theme => ({
    hidden: {
    display: 'none'
    }
});



class SecPlan_Edit extends React.Component {

    constructor(props) {
        super(props);
        const firestore = firebase.firestore;
        this.ref = firestore.collection('TLMS').doc(this.props.docid);
        this.state = {
          ManagementId:'',
          CustomerName:'',
          CustomerNo:'',
          CustomerAddr: '',
          ProductCode:'',
          ProductName:'',
          AuthCode:'',
          NewRenew:'',
          Quantity:'',
          Start:'',
          End:'',
          open: false          
        };
      }
    
      componentDidMount() {

        this.ref.get().then((doc) => {
          if (doc.exists) {
            const secplan = doc.data();
            this.setState({
              key: secplan.id,
              ManagementId : secplan.ManagementId,
              CustomerName : secplan.CustomerName,
              CustomerNo : secplan.CustomerNo,
              CustomerAddr : secplan.CustomerAddr,
              ProductCode : secplan.ProductCode,
              ProductName : secplan.ProductName,
              AuthCode : secplan.AuthCode,
              NewRenew : secplan.NewRenew,
              Quantity : secplan.Quantity,
              Start : secplan.Start,
              End : secplan.End
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
            ManagementId:'',
            CustomerName:'',
            CustomerNo:'',
            CustomerAddr: '',
            ProductCode:'',
            ProductName:'',
            AuthCode:'',
            NewRenew:'',
            Quantity:'',
            Start:'',
            End:'',
            open: false
          })
    }
    
    handleOnChange=(e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
  
 
    handleDbCreate=()=>{

          const {ManagementId, CustomerName,CustomerNo,CustomerAddr,ProductCode,ProductName,AuthCode,NewRenew,Quantity,Start,End} = this.state; 

          this.ref.update({
            ManagementId : ManagementId,
            CustomerName : CustomerName,
            CustomerNo : CustomerNo,
            CustomerAddr : CustomerAddr,
            ProductCode : ProductCode,
            ProductName : ProductName,
            AuthCode : AuthCode,
            NewRenew : NewRenew,
            Quantity : Quantity,
            Start : Start,
            End : End
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
            ManagementId:'',
            CustomerName:'',
            CustomerNo:'',
            CustomerAddr: '',
            ProductCode:'',
            ProductName:'',
            AuthCode:'',
            NewRenew:'',
            Quantity:'',
            Start:'',
            End:'',  
            open: false
        })
    }
    setCustomer=(sendNo) =>{
      var docRef =firebase.firestore.collection('CUSTOMER').doc(sendNo);
      docRef.get().then((doc) => {
        if (doc.exists) {
          this.setState({
            CustomerNo : doc.data().CustomerNo,
            CustomerName : doc.data().CustomerName,
            CustomerAddr : doc.data().CustomerAddr
          });  
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });   
    }
  
    setInventory=(inventNo) =>{
      var docRef =firebase.firestore.collection('INVENTORY').doc(inventNo);
      docRef.get().then((doc) => {
        if (doc.exists) {
          this.setState({
            ProductCode : doc.data().InventoryNo,
            ProductName : doc.data().InventoryDesc
          });  
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });   
    }

    render() {
    const { classes } = this.props;
    const {ManagementId,CustomerName,CustomerNo,CustomerAddr,ProductCode,ProductName,AuthCode,NewRenew,Quantity,Start,End} = this.state;

    return (

    <div>
        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
            수정
        </Button>

        <Dialog open={this.state.open} onClose={this.handleClose}>
        <DialogTitle>수정</DialogTitle>
        <DialogContent>
          <SecPlan_CusData setCustomer = {this.setCustomer}/>
          {/* <TextField disabled label="고객명" type="text" name="CustomerName" value={CustomerName} onChange={this.handleOnChange} /><br/> */}
          <TextField disabled label="고객번호" type="text" name="CustomerNo" value={CustomerNo} onChange={this.handleOnChange} /><br/>
          <TextField disabled label="고객주소" multiline rows={4} name="CustomerAddr" value={CustomerAddr} onChange={this.handleOnChange} /><br/>
          <SecPlan_InventData setInventory = {this.setInventory}/>
          {/* <TextField disabled label="제품명" type="text" name="ProductName" value={ProductName} onChange={this.handleOnChange} /><br/> */}
          <TextField disabled label="제품코드" type="text" name="ProductCode" value={ProductCode} onChange={this.handleOnChange} /><br/><br/>
          <TextField required variant ="filled" label="정품인증코드" type="text" name="AuthCode" value={AuthCode} onChange={this.handleOnChange} /><br/><br/>
          {/* <TextField label="주문형태" type="text" name="NewRenew" value={NewRenew} onChange={this.handleOnChange} /><br/> */}
    
          <TextField required variant ="filled"  label="수량" type="number"
          InputLabelProps={{
              shrink: true,
            }}
            variant="outlined" name="Quantity" value={Quantity} onChange={this.handleOnChange} /><br/>

          <TextField
            id="date"
            label="유지관리가입유효일"
            type="date"
            name="Start"
            value={Start}
            defaultValue="2021-01-01"
            className={classes.textField}
            onChange={this.handleOnChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        <br/>
        <TextField
            id="date"
            label="유지관리가입만기일"
            type="date"
            name="End"
            value={End}
            defaultValue="2021-01-01"
            className={classes.textField}
            onChange={this.handleOnChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        <br/><br/><br/>
        </DialogContent>
        <DialogActions>
            <Button variant="contained" color="primary" onClick={this.handleOnSubmit}>수정</Button>
            <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
        </DialogActions>
        </Dialog>
    </div>
    )}
}

export default withStyles(styles)(SecPlan_Edit)