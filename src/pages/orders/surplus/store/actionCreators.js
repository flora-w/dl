import axios from "../../../../axios";
import * as actionTypes from './actionTypes';
import { message } from "antd";
import {ALL_ORDERS_LIST,SING_ORDERS_LIST,ALLOWANCE_ASSESS_REMAINED_REPORT,REMAINED_REPORT_QUERY,REMAINED_REPORT_DELETE } from "../../../../config/api"


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

export const isAuthority=(bool)=>{
  return{
    type:actionTypes.IS_AUTH,
    bool
  }
}

export const getPageDataTd =(data) =>{
  return {
      type:actionTypes.GETPAGEDATA_TD,
      data
  }
}

export const getPageData=()=>{
  return dispatch=>{
    const User_ID= sessionStorage.userId;
    console.log(User_ID);
    axios.get({
    url:ALLOWANCE_ASSESS_REMAINED_REPORT,
      data:{User_ID} })
      .then(data=>{
        if(data.code===1){
          dispatch(isAuthority(true));
          dispatch(getPageDataTd(data.data));
        }else {
          message.warning(data.message);
          dispatch(isAuthority(false));
        }
      })
      .catch(err=>{
        message.warn('獲取頁面數據出錯');
        console.log(err)
      })
  }
}

export const onInput =(data)=>{
  return {
    type:actionTypes.ONINPUT,
    data
  }
}


// 點擊查詢   surplusSearch
export const surplusSearchTd=(data)=>{
  return{
    type:actionTypes.SURPLUSSEARCH_TD,
    data
  }
}

export const surplusSearch=()=>{
  return (dispatch,getState)=>{
    console.log(getState())
  const {
    empNoValue:Emp
        } =getState().surplusReducer;
console.log(Emp);
axios.get({
   url:REMAINED_REPORT_QUERY,data:{Emp}
})
.then(data=>{
  if(data.code===1){
    dispatch(surplusSearchTd(data.data))
  }else{
    message.warning('獲取數據出錯')
  }
})
  }
}

// residueDelete 點擊處理----刪除更新
export const residueDeleteFn =(data)=>{
  return{
    type:actionTypes.RESIDUEDELETE_FN,
    data
  }
}



export const residueDelete=(index)=>{
  return (dispatch,getState)=>{
    const {
            Uniqueid:ID    
    }= getState().surplusReducer.signFormData[0];
    const User_ID= sessionStorage.userId;
    console.log(ID);
    console.log(User_ID);
    console.log(index)
    axios.get({
      url:REMAINED_REPORT_DELETE,
      data:{
        ID,
        User_ID
      }
    })
        .then(data=>{
          if(data.code===1){
            dispatch(deleteOk(index))
            console.log(deleteOk(index));
            dispatch(residueDeleteFn(data.code));
            message.warning('更新成功')
          }else {
            dispatch(residueDeleteFn(data.code));
            message.warning('更新失敗，請聯繫管理員')
          }
        })
  }
}

const deleteOk = (index) => ({
  type: actionTypes.DELETE_OK,
  index
});




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