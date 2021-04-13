import React, { Component } from 'react';
// import { GoogleLogin } from 'react-google-login';
// import KakaoLogin from 'react-kakao-login';
import styled from 'styled-components';
import { withRouter } from "react-router-dom";
import firebase from '../Firebase';

class Login extends Component {

    constructor(props) {
        super(props); 
        this.state = {
            username :'',
            password :''
        }
    }


    onChangeHandler =  (e) => {
        const {name,value} = e.target;
        this.setState({
            [name] : value
        })
    }
    onClickHandler =  (e) => {
       e.preventDefault(); 
       firebase.doSignInWithEmailAndPassword(this.state.username,this.state.password)
       .then(r=>{
        //    this.props.login();
        this.doSignUp();
        })
    }
 
    // Kakao Login
    // responseKakao = (res) => {
    //     this.setState({
    //         id: res.profile.id,
    //         name: res.profile.properties.nickname,
    //         provider: 'kakao'
    //     });
    //     this.doSignUp();
    // }

    // Login Fail
    // responseFail = (err) => {
    //     console.error(err);
    // }
    
    doSignUp = () => {
            const { username, password } = this.state;

            window.sessionStorage.setItem('username', username);
            window.sessionStorage.setItem('password', password);
            this.props.onLogin();
            this.props.history.push('/');
    }

    render() {
        const {username,password} =  this.state;
        return (
            <Container>    
               <div>
                <form>
                    <StyledInput name="username" value={username} onChange={this.onChangeHandler} />
                    <StyledInput name="password" value={password} onChange={this.onChangeHandler} />
                    <StyledButton onClick={this.onClickHandler}>로그인</StyledButton>
                </form>
                </div>
            </Container>
        );
    }
}

const Container = styled.div`
    display: flex;
    flex-flow: column wrap;
`
const StyledButton = styled.button`
    // padding: 0em;
    // width: 190px;
    // height: 44px;
    // line-height: 44px;
    // color: #783c00;
    // background-color: #FFEB00;
    // border: 1px solid transparent;
    // border-radius: 3px;
    // font-size: 16px;
    // font-weight: bold;
    // text-align: center;
    // font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    color: #783c00;
    background-color: #FFEB00;
    border: 1px solid transparent;
    border-radius: 3px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
`
const StyledInput1 = styled.input.attrs(props => ({
    // 고정적인 Props를 전달할 수 있다.
    type: "password",
  
    // 혹은 다이나믹한 Props도 전달할 수 있다.
    size: props.size || "100px",
  }));

const StyledInput = styled.input`
   display: block;
//   margin: 20px 0px;
//   border: 1px solid lightblue;
  color: palevioletred;
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  padding: 0.7em;
  margin: 0.7em;
  background: papayawhip;
  border: none;
  border-radius: 7px;
`;
// const KakaoButton = styled(KakaoLogin)`
//     padding: 0;
//     width: 190px;
//     height: 44px;
//     line-height: 44px;
//     color: #783c00;
//     background-color: #FFEB00;
//     border: 1px solid transparent;
//     border-radius: 3px;
//     font-size: 16px;
//     font-weight: bold;
//     text-align: center;
// `

export default withRouter(Login);
