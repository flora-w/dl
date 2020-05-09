import axios from "../../../../axios";
import * as actionTypes from './actionTypes';
import { message } from "antd";
import {ALL_ORDERS_LIST,SING_ORDERS_LIST,ALLOWANCE_ASSESS_DEDUCTED_REPORT,DEDUCTED_REPORT_SYNCH } from "../../../../config/api"



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
export const isAuthority =(bool) =>{
  return {
    type:actionTypes.IS_AUTH,
    bool
  }
}

export const getPageDatab =(data) =>{
  return {
    type:actionTypes.GETPAGE_DATAB,
    data
  }
}

export const getPageData= ()=>{
  return dispatch=>{
    const User_ID= sessionStorage.userId;
    // console.log(User_ID);
    axios.get({url:ALLOWANCE_ASSESS_DEDUCTED_REPORT,data:{User_ID}})
    .then (data=>{
      if(data.code===1){
        dispatch(isAuthority(true));
        dispatch(getPageDatab(data.data));
      }else {
        message.warning(data.message);
        dispatch(isAuthority(false))
      }
    })
    .catch(err=>{
      message.warn("獲取頁面數據出錯");
      console.log(err)
    })
  }
}

// 同步本月獎懲
export const synchronousTd =(data) =>{
  return({
    type:actionTypes.SYNCHRONOUSTD,
    data
  })
}

export const synchronous =()=>{
  return dispatch=>{
    const User_ID= sessionStorage.userId;
    // console.log(User_ID);
    axios.get({url:DEDUCTED_REPORT_SYNCH,data:{User_ID}})
    .then (data=>{
      if(data.code===1){
        dispatch(synchronousTd(data.data));
        // console.log(synchronousTd(data.data))
      }else {
        message.warn('當月沒有已公告的懲處數據，請確認！');
        // message.warn("當月的懲處數據已同步過，不可重複同步，請確認！");
      }
    })
    .catch(err=>{
      message.warn("獲取頁面數據出錯");
      console.log(err)
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