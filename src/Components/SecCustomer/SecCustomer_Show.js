import React, { Component } from 'react';
import firebase from '../../Firebase';
import { Link } from 'react-router-dom';
import SecCustomer_Delete from './SecCustomer_Delete';
import SecCustomer_Edit from './SecCustomer_Edit';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { QRCode } from "react-qr-svg";
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
    width: "100%",
    marginTop: theme.spacing.unit* 2,
    overflowX: "auto"
    },
    table: {
    minWidth: 1080
    },
    progress: {
    margin: theme.spacing.unit* 2
    }
    });
    
class SecCustomer_Show extends Component {
  
    constructor(props) {
        super(props);
        const firestore = firebase.firestore;
        // console.log(this.props.match.params.ManagementId);
        this.ref = firestore.collection('CUSTOMER').doc(this.props.match.params.docid)
        this.state = {
          SecCustomer: []
        };   
      }
    
      componentDidMount() {
        
        this.ref.get().then((doc) => {
            if (doc.exists) {
              this.setState({
                SecCustomer: doc.data(),
                key: doc.id
              });
            } else {
              console.log("No such document!");
            }
          }); 
      }

 render() {
    const { classes } = this.props;
    return (    
<Card >
    <CardContent>
        <Typography variant="h5" component="h5">
        <Link to="/SecCustomer_tot">고객번호 : {this.state.SecCustomer.CustomerNo} </Link>
        </Typography>
        <></><></>&nbsp;
        <Grid container>
            <Grid item xs={12}>
               <Typography color="textSecondary" gutterBottom>
                고객명: {this.state.SecCustomer.CustomerName}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                고객번호: {this.state.SecCustomer.CustomerNo}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                고객주소: {this.state.SecCustomer.CustomerAddr}
                </Typography>   
            </Grid>    
        </Grid>
    </CardContent>
</Card>
    );
  }
}

export default withStyles(styles)(SecCustomer_Show);