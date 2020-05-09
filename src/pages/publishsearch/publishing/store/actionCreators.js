import axios from "../../../../axios";
import * as actionTypes from './actionTypes';
import { message } from "antd";
import {PUBLISHING_Info_Page,PUBLISHING_INfO_REGISTER,PUBLISHING_SENDEMAIL } from "../../../../config/api";
import NoAuthority from '../../../../commonPages/noAuthority';


// 是否有權限
const ajax = (url, method, data) => {
  return new Promise((resolve, reject) => {
    axios[method]({url, data, })
    .then((res,dispatch) => {
      if(res.code === 1){
        // console.log(res.code);  
        resolve(res.data);
        dispatch(isAuthority(true));        
      }else{
        reject(res.message)
        if(res.message === '您沒有權限查看!')
        dispatch(isAuthority(false));
      }
    })
    .catch(err => {
      reject('出現錯誤');
    })
  })
}
export const isAuthority = (bool) => {
  return {
    type: actionTypes.IS_AUTH,
    bool
  }
}
/**
 * 錯誤類型
 */
const errorMessage = (err) => {
  if(err.message){
    message.error(err.message);
    console.log(err);
  }else{
    message.error(err);
  }
}
// ------------
export const getPageDataChange  = data => {
  return {
    type: actionTypes.GET_PAGE_DATA,
    data
  }
}
 const getPageDatab =(data) =>{
  return ({
    type:actionTypes.GET_PAGE_DATAB,
    data
  })
}
export const  getPageData = ()=>{
  return  dispatch =>{
  const User_id =sessionStorage.getItem('userId');
  axios.get({url:PUBLISHING_Info_Page,data:{User_id}})
  .then(data =>{
    if(data.code === 1){
      dispatch(isAuthority(true));
      dispatch(getPageDatab(data.Data));
    }else{
      message.warning(data.message);
      dispatch(isAuthority(false))
    }
  })
  .catch(err=>{
    message.warn('獲取頁面數據出錯');
    console.log(err);
  })
}
}

// ---------
// 部門  registerDept
export const registerDeptChange  = data => {
  return {
    type: actionTypes.REGISTERDEPT,
    data
  }
}
const registerDeptb = (data) =>{
  return {
    type:actionTypes.REGISTERDEPTB,
   data
  }
}
export const  registerDept = ()=>{
  return  dispatch =>{
  const User_id =sessionStorage.getItem('userId');
  axios.get({url:PUBLISHING_INfO_REGISTER,data:{User_id}})
  .then(data =>{
    if(data.code === 1){
      dispatch(isAuthority(true));
      dispatch(registerDeptb(data.data));
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
// ---
// 生成表单
export const bottomTablesDataChange = data =>{
  return {
    type:actionTypes.BOTTOMTABLESDATA,
    data
  }
}
  export  const bottomTablesDatab = (data) =>{
  return{
    type:actionTypes.BOTTOMTABLESDATAB,
    data
  }
}
// userId,deptCode
export const bottomTablesData =(data) =>{
return dispatch =>{
  const User_id =sessionStorage.getItem('userId');
  const deptCode = sessionStorage.getItem("deptCode");
  axios.get({url:PUBLISHING_INfO_REGISTER,data:{User_id,deptCode}})
  .then(data =>{
    if(data.code === 1){
      // console.log(data)
      dispatch(bottomTablesDatab(data.data));
    }else{
      message.warning(data.message);
    }
  })
  .catch(err => {
    console.log('生成失败',err)
  })
}
}

















// personHobbySave
// export personHobbySave  $$$$
export const personHobbySaveChange = data =>{
    return {
      type: actionTypes.PERSONHOBBYSAVECHANGE,
      data
    }
}
 export  const personHobbySave = (data) =>{
  return {
    type:actionTypes.PERSONHOBBYSAVE,
   data
  }
}
// function handleChange(value) {
//   console.log(value); 
// }
// 點擊生成
export const personHobbySavebsChange = data =>{
  return {
    type: actionTypes.PERSONHOBBYSAVEBS,
    data
  }
}
export const personHobbySavebst=(data) =>{
  return{
    type:actionTypes.PERSONHOBBYSAVEBST,
    data
  }
}
// console.log(defaultState.personHobbySave.data);  
export const personHobbySavebs= (data) =>{
  return (dispatch,getState)=>{
  const User_ID =sessionStorage.getItem('userId');
  // console.log(getState().publishingReducer.personHobbySave)
  const deptcode = getState().publishingReducer.personHobby;
  console.log(getState().publishingReducer.personHobby)
  const date = getState().publishingReducer.jxzq;
  axios.get({url:PUBLISHING_INfO_REGISTER,data:{User_ID,deptcode,date}})
    .then(data=>{
      if(data.code === 1){
        message.success(data.message)
        dispatch(personHobbySavebst(data.data))
        // console.log(personHobbySavebst(data.data))
      }else{
        message.warning(data.message)
      }
    })
      .catch(err=>{
        console.log('生成失败',err)
      })
}
}

// export personHobbySave  
// -------------
// sendMailToBoss 發佈

export const sendMailToBossChange = data =>{
  return {
    type: actionTypes.SENDMAILTOBOSSCHANGE,
    data
  }
}
const sendMailToBossb = (data) =>{
  return {
    type:actionTypes.SENDMAILTOBOSSB,
   data
  }
}
export const  sendMailToBoss = ()=>{
  return  (dispatch,getState) =>{
    // console.log(getState())
   const MoneyDate = getState().publishingReducer.jxzq;
    axios.get({url:PUBLISHING_SENDEMAIL,data:{MoneyDate}})
    .then(data => {
      // console.log(data)
    if(data.code === 1){
      dispatch(sendMailToBossb(data))
      message.success(data.message)
    }else{
      message.warning(data.message)
    }
  })
  .catch(err => {
    console.log('郵件發送失敗，聯繫系統管理員',err)
  })
}
}
























export const seatChange = data => {
  return {
    type: actionTypes.SITE_CHANGE,
    data
  }
}
export const hobbyChange = data => {
  return {
    type: actionTypes.HOBBY_CHANGE,
    data
  }
}
export const remarkChange = data => {
  return {
    type: actionTypes.REMARK_CHANGE,
    data
  }
}

