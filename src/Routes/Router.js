import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SecPlan_Print from '../Components/SecPlan/SecPlan_Print';
import { Home, About, Login, Board, MyBoard, MyPage,SecPlan_Tot,SecPlan_Create,SecPlan_Show,SecPlan_Delete,SecPlan_Edit,SecPlan_Print} from './index';
import { SecInventory_Tot,SecInventory_Create,SecInventory_Show,SecInventory_Delete,SecInventory_Edit} from './index';
// import { SecAction_Tot,SecAction_Create,SecAction_Show,SecAction_Delete,SecAction_Edit} from './index'
const Router = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/secplan_tot" component={SecPlan_Tot} />
        <Route path="/secplan_print" component={SecPlan_Print} />
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
    </Switch>
);


export default Router;