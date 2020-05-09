import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthRoute from './components/authRouter';

import CommonPage from './commonPages';
import Home from './pages/home/loadable';
import Login from './pages/login/loadable';
import Super from './pages/super';
import NoAuthority from './commonPages/noAuthority/loadable';
import NoMatch from "./commonPages/noMatch/loadable";

// //管理員維護
import Admin from './pages/adminMaintain';
import AuthorityMaintain from './pages/adminMaintain/authorityMaintain/loadable';
import BudgeMaintain from './pages/adminMaintain/budgeMaintain/loadable';

// 名冊生成
import Publishsearch from './pages/publishsearch';
import Publish from './pages/publishsearch/publishing/components/loadable';
import Search from './pages/publishsearch/search/components/loadable';

// 津貼評核
import Orders from "./pages/orders";
import AllTheApplyForm from "./pages/orders/allTheApplyForm/loadable";
import Detail from "./pages/orders/detail/loadable";
import ClosedForm from "./pages/orders/ClosedForm/loadable";
import Summary from "./pages/orders/summary/loadable";
import Surplus from "./pages/orders/surplus/loadable";

const RouteConfig = () => {
  return <HashRouter>
    <Switch>
      <Route exact path='/login' component={Login} />
      <Route exact path='/super' component={Super} />
      <Redirect exact from='/' to='/home' />
      <Route path='/' render={() => (
        <CommonPage>
          <Switch>
            {/* 首頁 */}
            <Route exact path='/home' component={Home} />
            {/* 基本資料維護 */}
            <Redirect exact from='/basic-setting' to= '/basic-setting/system-admin' />
             <AuthRoute path='/basic-setting' render={() => (
              <Admin>
                <AuthRoute path='/basic-setting/system-admin' component={AuthorityMaintain} />
                 <AuthRoute path='/basic-setting/budget-allowance' component={BudgeMaintain} /> 
                <AuthRoute path='/basic-setting/no-authority' component={NoAuthority} />
              </Admin>
            )} />

            {/* 津貼名冊維護 */}
             <Redirect exact from='/allowance-maintain' to = '/allowance-maintain/publishing' />
            <AuthRoute path='/allowance-maintain' render={() => (
              <Publishsearch>
                <AuthRoute exact path='/allowance-maintain/publishing' component={Publish} />
                <AuthRoute exact path='/allowance-maintain/search' component={Search} /> 
              </Publishsearch>
            )} /> 

            {/* 津貼評核維護 */}
              <Redirect exact from='/allowance-assess' to='/allowance-assess/sign' /> 
            <AuthRoute path='/allowance-assess' render={() => (
              <Orders>
                <AuthRoute path='/allowance-assess/sign' component={AllTheApplyForm} />
                <AuthRoute path='/allowance-assess/closed' component={ClosedForm} />
                <AuthRoute path='/allowance-assess/deducted-report' component={Detail} />
                <AuthRoute path='/allowance-assess/summary-report' component={Summary}/>
                <AuthRoute path='/allowance-assess/remained-report' component={Surplus}/>
              </Orders>
            )} /> 
            {/* 無權限 */}
            <Route exact path='/no-authority' component={NoAuthority} />
            {/* 無頁面 */}
            <Route component={NoMatch}/>
          </Switch>
        </CommonPage>
      )} />
    </Switch>
  </HashRouter>
}


export default RouteConfig;