import { Typography } from "@material-ui/core";
import React, { Component } from "react";
import firebase from '../Firebase';

class About extends Component {

  constructor() {
    super();
    const firestore = firebase.firestore;
    this.ref = firestore.collection('isms-p');
    this.state = {
      renewno: '',
      renewdate:'',
      renewwhy:'',    
      file:null,
      filename:'',
      fileurl :''
    };
  }

  handleFileChange=(e)=> {
    this.setState({
      file: e.target.files[0]
    })
  }

  handleOnChange=(e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    this.fileUpload(this.state.file);
    this.handleDbCreate();
  }    

  fileUpload=(file)=>{
    const {filename,fileurl} = this.state;

    const uploadTask = firebase.storage.ref(`/images/${file.name}`).put(file);
    uploadTask.on("state_changed", console.log, console.error, () => {
      firebase.storage
        .ref("images")
        .child(file.name)
        .getDownloadURL()
        .then((url) => {          
          this.ref.doc('I-33-01').set({
            filename : file.name,
            fileurl : fileurl
          }, { merge: true });
        });
    });
  
  }

  handleDbCreate=()=>{
      const {renewno,renewdate,renewwhy} = this.state;

      this.ref.doc('I-33-01').set({
        renewno : renewno,
        renewdate : renewdate,
        renewwhy : renewwhy 
      })
      .then(() => {
        // console.log("성공적으로 저장되었습니다",this.state.fileurl);
        this.props.history.push("/")
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    } 

 
  
  render() {
    const {renewno,renewdate,renewwhy,filename,fileurl} = this.state;

  return (
    <div>
      <Typography variant="body1">1.1 정보보안 규정 및 계획(1)</Typography>
      <Typography variant="body2">1.1.1  정보보안 업무를 총괄하는 내규(규정, 지침 등)을 제ㆍ개정</Typography>
                  
      <form onSubmit={this.handleOnSubmit}>
        
        {/* 문서번호:<input type="text" name="docid" value={docid} onChange={this.handleOnChange} /><br/> */}
        개정번호:<input type="text" name="renewno" value={renewno} onChange={this.handleOnChange} /><br/>
        제/개정일자:<input type="text" name="renewdate" value={renewdate} onChange={this.handleOnChange} /><br/>
        개정이유:<input type="text" name="renewwhy" value={renewwhy} onChange={this.handleOnChange} /><br/>
        <input type="file" file={this.state.file} onChange={this.handleFileChange} />
        <button type ="submit" >확인</button>
      </form>
      <p>url:{this.state.fileurl}</p>
    </div>
  );
}
}


export default About;