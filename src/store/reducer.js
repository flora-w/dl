import { combineReducers } from 'redux';
import { reducer as loginReducer } from "../pages/login/store";
import { reducer as commonPageReducer } from "../commonPages/store";
// import fillFormReducer from "../pages/purchaseTicket/store";
// import personInfoReducer from "../pages/personInfo/store";
// 
// 
// import signReducer from '../pages/sign/store'
import ordersReducer from '../pages/orders/store'
import { reducer as adminMaintainReducer } from "../pages/adminMaintain/store";
// import { reducer as personInfoReducer } from "../pages/adminMaintain/store";
// // 
import {reducer as allTheApplyFormReducer }
from '../pages/orders/allTheApplyForm/store'
// 
import { reducer as publishingReducer }  from  "../pages/publishsearch/publishing/store"
import { reducer as publishingSearchReducer} from "../pages/publishsearch/search/store";
//
import {reducer as summaryReducer} from '../pages/orders/summary/store';
 
import {reducer as surplusReducer} from 
'../pages/orders/surplus/store'
// '../pages/orders/surplusReducer/store';

//使用combine使小的reducer组成一个总的reducer
const reducer = combineReducers({
    loginReducer,
    commonPageReducer,
    // fillFormReducer,
    summaryReducer,
    // 
    allTheApplyFormReducer,
    // 
    
    surplusReducer,
    // signReducer,
    // personInfoReducer,
    ordersReducer,
    adminMaintainReducer,  
    publishingSearchReducer,
    publishingReducer

});
export default reducer;