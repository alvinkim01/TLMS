import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Typography } from "@material-ui/core"

class Navigation extends Component {
    render() {
      return (
        <Nav>
            <NavList>
                <NavItem><Link to='/secplan_tot'><Typography variant="body1">라이센스관리프로그램</Typography></Link></NavItem>
                <NavItem><Link to='/seccustomer_tot'><Typography variant="body1">고객관리</Typography></Link></NavItem>
                <NavItem><Link to='/secinventory_tot'><Typography variant="body1">제품코드관리</Typography></Link></NavItem>
            </NavList>
        </Nav>
      );
    }
  }
  
export default Navigation;

const Nav = styled.div`
    width: 100%;
    height: 30px;
    border-bottom: 1px solid #d1d8e4;
`

const NavList = styled.ul`
    width: 50%;
    display: flex;
    margin: 0 auto;
`

const NavItem = styled.li`
    width: 70%;
    margin-left: 15px;
    margin-top: 5px;
    display: flex;
`