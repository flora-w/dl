import axios from "../../../../axios";
import * as actionTypes from './actionTypes';
import { message } from "antd";
import {ALL_ORDERS_LIST,SING_ORDERS_LIST,ALLOWANCE_ASSESS_CLOSED,ALLOWANCE_ASSESS_DEPT,ALLOWANCE_ASSESS_UPDATEDAY } from "../../../../config/api"
// import {ALLOWANCE_ASSESS_UPDATEDAY} from "../../../../config/api"


/**
 * 獲取頁面數據
 */
const asyncGetPageData = (data, id) => {
  return {
    type: actionTypes.SIGN_PAGE_DATA,
    data,
    id
  }
}

export const isAuthority = (bool)=>{
  return {
    type:actionTypes.IS_AUTH,
    bool
  }
}
// showbtn
export const isShowBtn = (bool)=>{
  return {
    type:actionTypes.SHOW_BTN,
    bool
  }
}


export const getPageDatab= (data)=>{
  return({
    type:actionTypes.GET_PAGE_DATA_B,
    data
  })
}
//STATESTBLE
export const getPageData= () =>{
  return dispatch =>{
    const User_ID= sessionStorage.userId;
    axios.get({url:ALLOWANCE_ASSESS_CLOSED,data:{User_ID}})
      .then(data =>{
        if(data.code===1){
          dispatch(isAuthority(true));
          dispatch(getPageDatab(data.data));
          // console.log(getPageDatab(data.data))
          if(data.Auth==='Admin'){
            dispatch(isShowBtn(true))
          }else{
            dispatch(isShowBtn(false))
          }
        }else{
            message.warning(data.message);
            dispatch(isAuthority(false))
        }
      })
      .catch(err=>{
        message.warn("獲取頁面數據出錯");
        console.log(err);
      })
  }
}




/**
 * 頁面的IDduo
 */
export const currPage = id => ({
  type: actionTypes.CURR_PAGE,
  id
})

/**
 * 返回form列表
 */
export const goBackClick = data => ({
  type: actionTypes.GO_BACK
})



/**
 * 提交數據
 */
const asyncSubmitData = () => ({
  type: actionTypes.SUBMIT_SUCCESS
})
export const submitData = values => {
  let data = {
    sFormSerialID: values.formId,
    sSignerID: '',
    ResultID: values.result,
    ResultName: values.result === 1? '同意' : '駁回',
    sComment: values.suggestion
  }
  return dispatch => {
    axios.post({url: '/Sign/F001_Approve', data,})
    .then(data => {
      if(data.code === 1){
        dispatch(asyncSubmitData())
      }else{
        message.info("獲取數據失敗")
      }
    })
    .catch(err => {
      message.warning('請求數據時錯誤')
      console.log(err)
    })
  }
}

// isHideTable點擊顯示table
export const isHideTable =(bool) =>{
  return{
    type:actionTypes.IS_HIDE,
    bool
  }
}




// 点击状态栏 隐藏原组件显示table
// statesTable
// url:HRControl/SignedPage_Dept
// 參數：dept moneydate User_ID

export const statesTableTd =(data)=>{
  // console.log(data)
  return{
  type:actionTypes.STATESTBLE_TD,
    data
  }
}

export const statesTable =(record)=>{
  // console.log(record)
  return (dispatch,getState)=>{
    const {
      Supervisor:User_ID,
      Dept:dept,
      MoneyDate : moneydate
    } = record ;
    // console.log(User_ID,dept,moneydate);
    axios.get({
      url:ALLOWANCE_ASSESS_DEPT,
      data:{User_ID,dept,moneydate}
    })
    .then(data=>{
       if(data.code===1){
        dispatch(statesTableTd(data.data));
        // console.log(statesTableTd(data.data));
        dispatch(isHideTable(false))
        //自己設定顯示權限
       }
    })
  }
} 


// Hr確認
// 參數; User_ID

 export const hrSure=()=>{
   return dispatch =>{
     const User_ID = sessionStorage.userId;
    //  console.log(User_ID);
    axios.get({
      url: ALLOWANCE_ASSESS_UPDATEDAY,
      data:{User_ID}
    })
   .then(data=>{
     if(data.code===1){
      //  dispatch()
      message.info('HR確認步驟已全部完成，可至匯總明細板塊查看')
     }
     if(data.code===0){
       message.info('已點擊過HR確認按鈕，不可重複操作，請確認')
     }
   })
   }
 }



























