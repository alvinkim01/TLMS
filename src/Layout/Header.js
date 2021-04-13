import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Typography } from "@material-ui/core"

class Header extends Component {

    render() {
        const { logged, onLogout } = this.props;

        return (
            <Container>
                {/* <Element> */}
                    {logged ? 
                    <Link to="/" onClick={onLogout}><Typography variant="body1">로그아웃</Typography></Link>: 
                    <Link to="/login"><Typography variant="body1">로그인</Typography></Link>}
            </Container>
        );
    }
}
  
export default Header;

const Container = styled.div`
    width: 84%;
    // border-bottom: 1px solid #d1d8e4;
    text-align: right;
`

const Element = styled.div`
    margin: 0 auto;
    width: 1080px;
    height: 100px;
    display: flex;
    flex-flow: row wrap;
`

const ShortCut = styled.div`
    order: 1;
    width: 100%;
    height: 20px;
    text-align: right;
    background-color: #a8ff78;
`

// const Logo = styled.div`
//     order: 2;
//     width: 200px;
//     height: 80px;
// `

const Search = styled.div`
    order: 3;
    width: 880px;
    background-color: #78ffd6;
    text-align: center;
`