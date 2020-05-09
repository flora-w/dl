import Home from '../pages/home/loadable';
import Login from '../pages/login/loadable';
 
// //基本資料
import AuthorityMaintain from '../pages/adminMaintain/authorityMaintain/loadable';
import BudgeMaintain from '../pages/adminMaintain/budgeMaintain/loadable';
//名冊
import Publish from '../pages/publishsearch/publishing/components/loadable';
// // import SpecialApply from "../pages/fillForm/specialApply/loadable";
import AllTheApplyForm from '../pages/orders/allTheApplyForm/loadable';
import ClosedForm from '../pages/orders/ClosedForm/loadable'
import Detail from '../pages/orders/detail/loadable';
import Summary from '../pages/orders/summary/loadable';
import Surplus from '../pages/orders/surplus/loadable';
// //
import Admin from '../pages/adminMaintain';
import Publishsearch from '../pages/publishsearch';
import Orders from "../pages/orders";
//評核
export const navConfigCommon = [
    {
        title: '首頁',
        path: '/home',
     }
]
export const navConfig = [
  {
      title: '首頁',
      path: '/home',
      component: Home,
   },
  {
      title: '基本資料',
      path: '/basic-setting',
      icon: 'setting',
      component: Admin,
      childrenShow: false,
      children: [
          { title: '系統權限', path: '/basic-setting/system-admin', component: AuthorityMaintain, active: true },
          { title: '職務津貼預算', path: '/basic-setting/budget-allowance', component: BudgeMaintain, active: false},
      ]
  },
  {
    title: '津貼名冊',
    path: '/allowance-maintain',
    icon: 'edit',
    component: Publishsearch,
    childrenShow: false,
    children: [
        { title: 'DL津貼名冊生成', path: '/allowance-maintain/publishing', component: Publish, active: true },
        { title: '津貼名冊查詢', path: '/allowance-maintain/search', component: BudgeMaintain, active: false},
    ]
},
{
    title: '津貼評核',
    path: '/allowance-assess',
    icon: 'profile',
    component: Orders,
    childrenShow: false,
    children: [
        { title: '待確認評核', path: '/allowance-assess/sign',
         component: AllTheApplyForm, 
         active: false},
        { title: '已確認評核', path: '/allowance-assess/closed', 
        component:  ClosedForm,
         active: false},
        { title: '本月待抵扣明細', path: '/allowance-assess/deducted-report',
         component: Detail,
          active: false},
        { title: '津貼匯總', path: '/allowance-assess/summary-report',
         component:  Summary, 
         active: false},
        { title: '剩餘待抵扣明細', path: '/allowance-assess/remained-report', 
        component: Surplus,
         active: false},
    ]
},
];

//表頭路由
export const breadcrumbNameMap = {
    '/home': 'Home',
    '/basic-setting': '基本資料',
    '/basic-setting/system-admin': '系統權限',
    '/basic-setting/budget-allowance': '職務津貼預算',
    '/allowance-maintain': '津貼名冊',
    '/allowance-maintain/publishing': 'DL津貼名冊生成',
    '/allowance-maintain/search': '津貼名冊查詢',
    '/allowance-assess': '津貼評核',
    '/allowance-assess/sign': '待確認評核',
    '/allowance-assess/closed': '已確認評核',
    '/allowance-assess/deducted-report': '本月待抵扣明細',
    '/allowance-assess/summary-report': '津貼匯總',
    '/allowance-assess/remained-report': '剩餘待抵扣明細',
  };

