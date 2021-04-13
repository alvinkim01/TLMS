import React, { Component } from 'react';
import styled from 'styled-components';
import { HashRouter as Router, Route } from 'react-router-dom';
import AppShell from './Components/AppShell';
import Header from './Layout/Header';
// import Router from './Routes/Router';
import { Home, About, Login, Board, MyBoard, MyPage,SecPlan_Tot,SecPlan_Create,SecPlan_Show,SecPlan_Delete,SecPlan_Edit,
  SecCustomer_Tot,SecCustomer_Create,SecCustomer_Show,SecCustomer_Delete,SecCustomer_Edit,
  SecInventory_Tot,SecInventory_Create,SecInventory_Show,SecInventory_Delete,SecInventory_Edit} 
from './Routes/index';
import Store from './Store/store';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
        logged: false,
        onLogin: this.onLogin,
        onLogout: this.onLogout
    }
  }

  // Login Func
  onLogin = () => {
    this.setState({
        logged: true
    });
  }

  // Logout Func
  onLogout = () => {
    this.setState({
        logged: false
    });

    const provider = window.sessionStorage.getItem('provider');    
    //Google AccessToken Remove
    if(provider === 'google') {
      const auth2 = window.gapi.auth2.getAuthInstance();
      auth2.signOut().then(function() {
        console.log('Goolge Logout.');
      });
    }
    // Kakao AccessToken Remove
    else if(provider === 'kakao'){
      window.Kakao.Auth.logout(function() {
        console.log("Kakao logout");
      });
    }
    //SessionStorage Clear
    window.sessionStorage.clear();
  }

  componentDidMount() {
    const id = window.sessionStorage.getItem('id');
    if(id) {
      this.onLogin();
    }
    else {
      this.onLogout();
    }
  }

  render() {
    const { logged, onLogout } = this.state;

    return (
      <Store.Provider value={this.state}>
        <Layout>
          <Header logged={logged} onLogout={onLogout}/>
          {/* <Navigation /> */}
          <Content>
          <Router>
            <AppShell>
              <div>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/secplan_tot" component={SecPlan_Tot} />
              <Route path="/secplan_create" component={SecPlan_Create} />
              <Route path="/secplan_show/:docid" component={SecPlan_Show} />
              <Route path="/secplan_delete/:docid" component={SecPlan_Delete} />
              <Route path="/secplan_edit/:docid" component={SecPlan_Edit} /> 
              <Route path="/seccustomer_tot" component={SecCustomer_Tot} />
              <Route path="/seccustomer_create" component={SecCustomer_Create} />
              <Route path="/seccustomer_show/:docid" component={SecCustomer_Show} />
              <Route path="/seccustomer_delete/:docid" component={SecCustomer_Delete} />
              <Route path="/seccustomer_edit/:docid" component={SecCustomer_Edit} /> 
              <Route path="/secinventory_tot" component={SecInventory_Tot} />
              <Route path="/secinventory_create" component={SecInventory_Create} />
              <Route path="/secinventory_show/:docid" component={SecInventory_Show} />
              <Route path="/secinventory_delete/:docid" component={SecInventory_Delete} />
              <Route path="/secinventory_edit/:docid" component={SecInventory_Edit} /> 
              <Route path="/login" component={Login} />
              <Route path="/board" component={Board} />
              <Route path="/myboard" component={MyBoard} />
              <Route path="/mypage" component={MyPage} />
              </div>
            </AppShell>
          </Router>
          </Content>
        </Layout>
      </Store.Provider>
    );
  }
}

const Layout = styled.div`
  margin: 0 auto;
  display: flex;
  width: 100%;
  flex-flow: row wrap;
`
const Content = styled.div`
  margin: 0 auto;
`

export default App;