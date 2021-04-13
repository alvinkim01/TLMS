import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import firebase from '../../Firebase';
// import { withRouter } from "react-router-dom";

class SecPlan_Delete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        open: false
    }  
    }

    handleClickOpen=()=>{
        this.setState({
        open: true
    });
    }

    handleClose=()=> {
        this.setState({
        open: false
    })
    }

    deleteSecPlan(docid){
        const firestore = firebase.firestore;
        this.ref = firestore.collection('INVENTORY');
        this.ref.doc(docid).delete()
        .then(() => {                         
            this.setState({
                open: false
            });
            this.props.stateRefresh();
                   
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
      }



    render() {
    return (
    <div>
        <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>
            삭제
        </Button>
        <Dialog onClose={this.handleClose} open={this.state.open}>
        <DialogTitle onClose={this.handleClose}>
            삭제 경고
        </DialogTitle>
        <DialogContent>
        <Typography gutterBottom>
            선택한 정보가 삭제됩니다.
        </Typography>
        </DialogContent>
        <DialogActions>
        <Button variant="contained" color="primary" onClick={(e) => {this.deleteSecPlan(this.props.docid) }}>삭제</Button>
        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
        </DialogActions>
        </Dialog>
    </div>
    )
    }
    }

export default SecPlan_Delete;

