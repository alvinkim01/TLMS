import React, { useState } from 'react';
import firebase from '../../Firebase';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import SecPlan_CusData from './SecPlan_CusData';
import SecPlan_InventData from './SecPlan_InventData';

const styles = theme => ({
    hidden: {
    display: 'none'
    }
});

// const [value, onChange] = useState(new Date());


class SecPlan_Create extends React.Component {

    constructor(props) {
        super(props);
        const firestore = firebase.firestore;
        this.ref = firestore.collection('TLMS');
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
          // file:null,
          // filename:'',
          // fileurl :'',
          
        };
      }

    handleOnSubmit = (e) => {
        e.preventDefault();
        // this.fileUpload(this.state.file);
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
          Start: '',
          End:'',
          open: false
          })
    }
   


    handleOnChange=(e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
    
   
    // handleOnSubmit = (e) => {
    //     e.preventDefault();
    //     // this.fileUpload(this.state.file)     
    //     this.handleDbCreate();
     
    // }  
    
    handleDbCreate=()=>{      
          const {ManagementId, CustomerName,CustomerNo,CustomerAddr,ProductCode,ProductName,AuthCode,NewRenew,Quantity,Start,End} = this.state;    
          this.ref.doc(ManagementId).set({
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

   
  //   handleFileChange=(e)=> {
        
  //     this.setState({
  //       file: e.target.files[0],
  //       filename : e.target.value
  //     })
  // }
  
    
  //   fileUpload=(file)=>{
  //       const {docid,filename,fileurl} = this.state;
    
  //       const uploadTask = firebase.storage.ref(`/images/${file.name}`).put(file);
  //       uploadTask.on("state_changed", console.log, console.error, () => {
  //         firebase.storage
  //           .ref("images")
  //           .child(file.name)
  //           .getDownloadURL()
  //           .then((url) => {          
  //             this.ref.doc(docid).set({
  //               filename : file.name,
  //               fileurl : url
  //             }, { merge: true });
  //           });
  //       });  
  //       this.props.stateRefresh();    
  //   } 
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
    const inputProps ={
      Quantity:1,
    };

    return (

    <div>
        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
            라이센스 생성하기
        </Button>

        <Dialog open={this.state.open} onClose={this.handleClose}>
        <DialogTitle>라이센스 추가</DialogTitle>
        <DialogContent>
        {/* <input className={classes.hidden} id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} />

        <label htmlFor="raised-button-file">

        <Button variant="contained" color="primary" component="span" name="file">
        {this.state.filename === ''? "파일선택" : this.state.filename}
        </Button>

        </label><br/> */}
        <TextField label="관리번호" type="text" name="ManagementId" value={ManagementId} 
        error ={ManagementId ===""?true:false} helperText="관리번호는 필수입력항목입니다" 
        defaultValue={ManagementId}
        onChange={this.handleOnChange} /><br/>
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
            <Button variant="contained" color="primary" onClick={this.handleOnSubmit}>추가</Button>
            <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
        </DialogActions>
        </Dialog>
    </div>
    )}
}

export default withStyles(styles)(SecPlan_Create)