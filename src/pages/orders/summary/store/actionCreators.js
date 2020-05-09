import axios from "../../../../axios";
import * as actionTypes from './actionTypes';
import { message } from "antd";
import {ALL_ORDERS_LIST,SING_ORDERS_LIST,ALLOWANCE_ASSESS_SUMMARY_REPORT,SUMMARY_REPORT,SUMMARY_REPORT_DOWNLOAD} from "../../../../config/api";
import { moneyDate } from "../../../publishsearch/search/store/actionCreators";


/**
 * 獲取頁面數據
 */
const asyncGetPageData = (data, id) =>{
  return {
    type: actionTypes.SIGN_PAGE_DATA,
    data,
    id
  }
} 
export const getPageDataTd =(data)=>{
  return{
    type:actionTypes.GETPAGE_DATATD,
    data
  }
}

export const getPageData=()=>{
  return dispatch=>{
    const User_ID=sessionStorage.userId;
    axios.get({url:ALLOWANCE_ASSESS_SUMMARY_REPORT,data:{User_ID}}) 
    .then(data=>{
      if(data.code===1){
        dispatch(isAuthority(true));
        dispatch(getPageDataTd(data.Data));
      }else{
        message.warning(data.message);
        dispatch(isAuthority(false))
      }
    })
    .catch(err=>{
      message.warn('獲取頁面數據出錯');
      console.log(err)
    })
  }
}
export const isAuthority =(bool) =>{
  return{
    type:actionTypes.IS_AUTH,
    bool
  }
}

// 下拉框
export const selectSearchChange = data =>{
  return {
    type:actionTypes.SELECTSEARCH_CHANGE,
    data
  }
}
 export const selectSearch =(data)=>{
   return{
     type:actionTypes.SELECTSEARCH,
     data
   }
 }

 export const onInput =(data)=>{
  return {
    type:actionTypes.EMPNOPERSON,
    data
  }
}
// 點擊查詢
// 
export const summarySearchChange =(data)=>{
return{
  type:actionTypes.SUMMARYSEARCH_CHANGE,
  data
}
}

export const summarySearchCun=(data)=>{
  return{
    type:actionTypes.SUMMARYSEARCHCUN,
    data
  }
}

  export const summarySearch=() =>{
    return (dispatch,getState) =>{
      // console.log(getState());
      const {
            selectSearch:Dept,
            empNoValue :EmpNo,
            moneyDateValue:MoneyDate
      } =getState().summaryReducer;
    //  console.log(Dept,EmpNo,MoneyDate);
     const href ={Dept,EmpNo,MoneyDate};
    //  console.log(href)
     dispatch(hrefTd(href));

     axios.post({
       url:SUMMARY_REPORT,
       data:{Dept,EmpNo,MoneyDate}
     })
     .then(data=>{
       if(data.code===1){
        //  dispatch(isAuthority(true));
         dispatch(summarySearchCun(data.data))
       }else{
         message.warning('匯總信息失敗');
       }
     })
     .catch(err=>{
       message.warn("獲取數據出錯");
       console.log(err);
     })
    }
  }

  export const hrefTd =(data)=>{
    return {
      type:actionTypes.HREF,
      data
    }
  }

// 點擊下載  summarydownload


export const summarydownload=()=>{
  return(dispatch,getState)=>{
    // console.log(getState());
    const {
      selectSearch:Dept,
      empNoValue :EmpNo,
      moneyDateValue:MoneyDate
  } =getState().summaryReducer;
console.log(Dept,EmpNo,MoneyDate);
axios.get({
  url:SUMMARY_REPORT_DOWNLOAD,
  data:{Dept,EmpNo,MoneyDate}
})
// .then(err=>{
//   message.info('')
// })
  }
}


// 
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
    // ResultName: values.result === 1? '同意' : '駁回',
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

























