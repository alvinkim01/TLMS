import React, { Component } from 'react';
import Pdf from "react-to-pdf";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
// import ButtonBase from '@material-ui/core/ButtonBase';
import Truguard from '../images/guardiannet_logo.jpg';

const ref = React.createRef();


  const styles = theme => ({
    root: {
  
    },
    paper: {
      // padding: theme.spacing.unit * 3,
      textAlign: 'center',
      // color: theme.palette.text.primary,
    },
    table: {
      minWidth: 100
    },
       
    });

class SecPlan_Print extends Component {
  
    // constructor(props) {
    //     super(props);   
    //   }
      
     
      render() {
        const classes = styles();
        return(            
            
            <> 
                {/* <Button variant="contained" onClick={this.handleClickOpen}>
                라이센스 생성하기
                </Button>   */}

    
        <div ref={ref}>
        {/* <Card >
          <CardContent>
               */}
                <Grid container width="100">
                  <Grid item xs={8}>  
                    <Typography align="center" variant="h4" component="h4">
                    &nbsp;&nbsp;Corporate Product License Agreement
                    </Typography>
                      <br/><br/><br/>
                  </Grid>
                </Grid>

              <Grid container margin={20}>
                  <Grid item xs={8}>                  
                    <Typography variant="subtitle1" gutterBottom>
                      고객명: {this.props.CustomerName}
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom>
                      고객번호: {this.props.CustomerNo}
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom>
                      고객주소: {this.props.CustomerAddr}
                      </Typography>
                      <></><></>&nbsp;
                      <p>
                    
                      </p>
                      <Typography variant="subtitle1" gutterBottom>
                        사용 허가된 가디언넷 제품/서비스
                      </Typography>
                      <></><></>&nbsp;
                      <Typography variant="subtitle1" gutterBottom>
                      제품코드: {this.props.ProductCode}
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom>                
                      제품명: {this.props.ProductName}
                      </Typography>
                      <></><></>&nbsp;
                      <p>
                    
                      </p>
                      {/* <Paper className={classes.root}> */}
                        <Table >        
                          <TableHead>
                            <TableRow>
                              <TableCell align="center">인증코드</TableCell>
                              <TableCell  align="center">수량</TableCell>
                              <TableCell   align="center">라이센스 가입 유효일</TableCell>            
                              <TableCell align="center">라이센스 가입 만기일</TableCell>          
                            </TableRow>
                          </TableHead>
                          <TableBody>
                          <TableRow>
                              <TableCell  align="center">{this.props.AuthCode}</TableCell>
                              <TableCell  align="center">{this.props.Quantity}</TableCell> 
                              <TableCell  align="center">{this.props.Start}</TableCell>           
                              <TableCell  align="center">{this.props.End}</TableCell>     
                          </TableRow>
                          </TableBody>
                        </Table>
                     {/* </Paper>        */}
                </Grid>
              </Grid>
              <></><></>&nbsp;
                      <p>
                    
                      </p>
              <Grid container>
                  <Grid item xs={8}>  
                    <Typography align="left" variant="h7" component="h7">
                     이 제품에 포함된 장비,프로그램,문서 자료 및 기록 매체 등 모든 내용은 
                    </Typography><br/>
                    <Typography align="left" variant="h7" component="h7">
                    국내 저작권법과 국제 저작권 조약에 의하여 보호 받고 있습니다.  
                    </Typography><br/>
                    <Typography align="left" variant="h7" component="h7">
                     이 사용권 증서는 제품을 구입한 증거이며 유상 및 무상유지보수를 받을 수 있습니다.
                    </Typography>
                  </Grid>
                </Grid>
           
                <br/><br/>
      
                <Grid container width="100">
                  <Grid item xs={8}>  
                    <Typography align="center" variant="h5" component="h5">
                    &nbsp;&nbsp;<img src={Truguard} width="300" height="80"  ></img>
                    </Typography>                  
                  </Grid>
                </Grid>
          {/* </CardContent>
        </Card>   */}
        </div>

                <Pdf targetRef={ref} filename="TruGuard License">
                    {({toPdf}) => (
                        <Button variant="contained" color="primary" onClick={toPdf}>라이센스 PDF변환</Button>
                    )}
                </Pdf>
            </>
        );
  }
}

export default withStyles(styles)(SecPlan_Print)