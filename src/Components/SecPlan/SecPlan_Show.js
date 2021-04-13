import React, { Component } from 'react';
import firebase from '../../Firebase';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SecPlan_Print from './SecPlan_Print';
// import { Link } from 'react-router-dom';

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
    
class SecPlan_Show extends Component {
  
    constructor(props) {
        super(props);
        const firestore = firebase.firestore;
        // console.log(this.props.match.params.ManagementId);
        this.ref = firestore.collection('TLMS').doc(this.props.match.params.docid)
        this.state = {
          secplan: []
        };   
      }
    
      componentDidMount() {
        
        this.ref.get().then((doc) => {
            if (doc.exists) {
              this.setState({
                secplan: doc.data(),
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
              <Link to="/secplan_tot">관리번호 : {this.state.secplan.ManagementId} </Link>
              </Typography>
              <></><></>&nbsp;
              {/* <Grid container>
                  <Grid item xs={12}>
                    <Typography color="textSecondary" gutterBottom>
                      관리번호: {this.state.secplan.ManagementId}
                      </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      고객명: {this.state.secplan.CustomerName}
                      </Typography>
                      <Typography color="textSecondary" gutterBottom>
                      고객번호: {this.state.secplan.CustomerNo}
                      </Typography>
                      <Typography color="textSecondary" gutterBottom>
                      고객주소: {this.state.secplan.CustomerAddr}
                      </Typography>
                      <Typography color="textSecondary" gutterBottom>
                      제품코드: {this.state.secplan.ProductCode}
                      </Typography>
                      <Typography color="textSecondary" gutterBottom>                
                      제품명: {this.state.secplan.ProductName}
                      </Typography>
                      <Typography color="textSecondary" gutterBottom>
                      인증코드: {this.state.secplan.AuthCode}
                      </Typography>
                      <Typography color="textSecondary" gutterBottom>
                      주문형태: {this.state.secplan.NewRenew}
                      </Typography>
                      <Typography color="textSecondary" gutterBottom>
                      수량: {this.state.secplan.Quantity}
                      </Typography>
                      <Typography color="textSecondary" gutterBottom>
                      유지관리유효일: {this.state.secplan.Start}
                      </Typography>
                      <Typography color="textSecondary" gutterBottom>                
                      유지관리만기일: {this.state.secplan.End}
                      </Typography>              
                  </Grid>                 
                  
                  <Grid item xs={4}>
                  <Button variant="contained" color="secondary" onClick={this.handleClose}>QR Code 프린트</Button> 
                  </Grid>
              </Grid> */}

              <Grid item xs={12}>
                  {/* <Button variant="contained" color="primary" onClick={this.goToMain}>TruGuard 라이센스출력</Button>   */}
                  <SecPlan_Print ManagementId={this.state.secplan.ManagementId}
                                 CustomerName ={this.state.secplan.CustomerName} 
                                 CustomerAddr ={this.state.secplan.CustomerAddr}
                                 CustomerNo ={this.state.secplan.CustomerNo}
                                 ProductCode ={this.state.secplan.ProductCode}
                                 ProductName = {this.state.secplan.ProductName}
                                 AuthCode = {this.state.secplan.AuthCode}
                                 NewRenew = {this.state.secplan.NewRenew}
                                 Quantity = {this.state.secplan.Quantity}
                                 Start = {this.state.secplan.Start}
                                 End = {this.state.secplan.End}                 
                  
                  />
                  </Grid>
          </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(SecPlan_Show)