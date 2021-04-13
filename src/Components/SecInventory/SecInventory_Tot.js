import React, { Component } from "react";
import firebase from '../../Firebase';
import SecInventory_Data from './SecInventory_Data';
import SecInventory_Create from './SecInventory_Create';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import withLogin from '../LoginHOC';

const styles = theme => ({
  root: {
    width: "100%",
    minWidth: 1080
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'Right'
  },
  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  grow: {
    flexGrow: 1,
  },
  tableHead: {
   fontSize: '1.0rem'
  },
    menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
    display: 'block',
  },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
    backgroundColor: fade(theme.palette.common.white, 0.25),
  },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing.unit,
    width: 'auto',
  },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'blue',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
    width: 120,
    '&:focus': {
    width: 200,
  },
  },
  }
  });

class SecInventory_Tot extends Component {
  constructor(props) {
    super(props);
    const firestore = firebase.firestore;
    this.ref = firestore.collection('INVENTORY');
    // this.unsubscribe = null;
    this.state = {
      SecInventory: [],
      completed: 0,
      searchKeyword: ''
    };   
  }

  stateRefresh=()=> {
    this.setState({
      SecInventory: [],
      completed: 0,
      searchKeyword: ''    
    });
    
    const SecInventory=[];
    this.ref.get()
    .then(querySnapshot =>{
        querySnapshot.forEach((doc)=>{
            // console.log(doc.data());
            SecInventory.push(doc.data());
        });
        this.setState({SecInventory})
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    
    }

  componentDidMount() {
    
    const SecInventory=[];
    this.ref.get()
    .then(querySnapshot =>{
        querySnapshot.forEach((doc)=>{
            // console.log(doc.data());
            SecInventory.push(doc.data());
        });
        this.setState({SecInventory})
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

    // this.ref.onSnapshot(this.onCollectionUpdate);
  }

  handleValueChange=(e)=> {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
    }

  render() {

    const filteredComponents = (data) => {
      data = data.filter((s) => {
      return s.InventoryNo.indexOf(this.state.searchKeyword) > -1;
      });
      return data.map((s) => {
        return <SecInventory_Data stateRefresh={this.stateRefresh} InventoryNo={s.InventoryNo} InventoryDesc={s.InventoryDesc} />
    });
      }

    const { classes } = this.props;
    return (
      
      <div className={classes.root}>                
        <div className={classes.menu}>        
          <div className={classes.search}>
              <div className={classes.searchIcon}>
              <SearchIcon />
              </div>
              <InputBase
                placeholder="검색하기"
                classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
                }}
                name="searchKeyword"
                value={this.state.searchKeyword}
                onChange={this.handleValueChange}
              />
          </div>      
        </div>
     
        <Paper className={classes.root}>
          <Table className={classes.table}>        
            <TableHead>
              <TableRow>
                <TableCell>제품코드</TableCell>
                <TableCell>제품명</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>     
              </TableRow>
            </TableHead>
            <TableBody>
                {this.state.SecInventory ? filteredComponents(this.state.SecInventory)  :  
                <TableRow>
                  <TableCell colSpan="6" align="center">
                  </TableCell>
                </TableRow>
                }
            </TableBody>
          </Table>
        </Paper>
        <SecInventory_Create stateRefresh={this.stateRefresh} />
      </div>
    );
  }
}

export default withLogin(withStyles(styles)(SecInventory_Tot));