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



class SecInventory_Edit extends React.Component {

    constructor(props) {
        super(props);
        const firestore = firebase.firestore;
        this.ref = firestore.collection('INVENTORY').doc(this.props.docid);
        this.state = {      
          open: false          
        };
      }
    
      componentDidMount() {

        this.ref.get().then((doc) => {
          if (doc.exists) {
            const SecInventory = doc.data();
            this.setState({
              key: SecInventory.id,
              InventoryDesc : SecInventory.InventoryDesc,
              InventoryNo : SecInventory.InventoryNo
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
            InventoryDesc:'',
            InventoryNo:'',
            open: false
          })
    }
    
    handleOnChange=(e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
  
 
    handleDbCreate=()=>{

          const {InventoryDesc,InventoryNo} = this.state; 

          this.ref.update({
            InventoryDesc : InventoryDesc,
            InventoryNo : InventoryNo
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
            InventoryDesc:'',
            InventoryNo:'',
            open: false
        })
    }

    render() {
    const { classes } = this.props;
    const {InventoryDesc,InventoryNo} = this.state;

    return (

    <div>
        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
            수정
        </Button>

        <Dialog open={this.state.open} onClose={this.handleClose}>
        <DialogTitle>수정</DialogTitle>
        <DialogContent>
          <TextField label="제품코드" type="text" inputProps={{ readOnly: true, }} name="InventoryNo" value={InventoryNo} onChange={this.handleOnChange} /><br/>
          <TextField label="제품명" type="text" name="InventoryDesc" value={InventoryDesc} onChange={this.handleOnChange} /><br/>
        </DialogContent>
        <DialogActions>
            <Button variant="contained" color="primary" onClick={this.handleOnSubmit}>수정</Button>
            <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
        </DialogActions>
        </Dialog>
    </div>
    )}
}

export default withStyles(styles)(SecInventory_Edit)