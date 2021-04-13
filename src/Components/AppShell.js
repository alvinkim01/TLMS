import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

const styles = theme => ({
    root: {
    width: "100%",
    minWidth: 1080
    },
    menu: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center'
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
    color: 'inherit',
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

class AppShell extends React.Component {
constructor(props) {
super(props);
this.state = {
toggle: false
};
}
handleDrawerToggle = () => this.setState({toggle: !this.state.toggle})
render() {
const { classes } = this.props;
return (
<div>
    <div className={classes.root}>
         <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit"  onClick={this.handleDrawerToggle}>
            <MenuIcon />
            </IconButton>
            
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
            TruGuard License Management System
            </Typography>

            <div className={classes.grow} />
        
          </Toolbar>
        </AppBar>
        <Drawer open={this.state.toggle}>
            <MenuItem onClick={this.handleDrawerToggle}>
                <Link component={RouterLink} to="/">
                메인 홈
                </Link>
            </MenuItem>
            <MenuItem onClick={this.handleDrawerToggle}>
                <Link component={RouterLink} to="/secplan_tot">
                TruGuard 라이선스 관리시스템
                </Link>
            </MenuItem>
            <MenuItem onClick={this.handleDrawerToggle}>
                <Link component={RouterLink} to="/seccustomer_tot">
                TruGuard 고객관리
                </Link>
            </MenuItem>
            <MenuItem onClick={this.handleDrawerToggle}>
                <Link component={RouterLink} to="/secinventory_tot">
                TruGuard 제품코드관리
                </Link>
            </MenuItem>               
        </Drawer>
        </div>
    <div id="content" style={{margin: 'auto', marginTop: '20px'}}>
    {React.cloneElement(this.props.children)}
    </div>
</div>
);
}
}

export default withStyles(styles)(AppShell);