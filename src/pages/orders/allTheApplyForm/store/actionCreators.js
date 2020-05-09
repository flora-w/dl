import axios from "../../../../axios";
import * as actionTypes from './actionTypes';
import Table, { message } from "antd";
import { formatDate } from '../../../../utils/';
import { ALL_ORDERS_LIST, SING_ORDERS_LIST, ALLOWANCE_ASSESS_SIGN, ALLOWANCE_SIGN_DOWNLOAD, ALLOWANCE_SIGN_DEPT, ALLOWANCE_SIGN_SUBMIT,  WAITSIGNPAGE_WITHWB ,WAITSIGNPAGE_UPLOAD } from "../../../../config/api";
import { compose } from "redux";
let typeArr = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];

// 错误类型
const errorMessage = (err) => {
  if (err.message) {
    message.error(err.message);
    console.log(err)
  } else {
    message.error(err);
  }
}
/**
 * 獲取頁面數據
 */
export const getPageDataChange = data => {
  return {
    type: actionTypes.SIGN_PAGE_DATA_CHANGE,
    data
  }
}
export const getPageDatab = (data) => {
  return {
    type: actionTypes.SIGN_PAGE_DATA_B,
    data,
  }
}
// const id= sessionStorage.userId;
// console.log(id);
export const getPageData = (id) => {
  return dispatch => {
    const User_ID = sessionStorage.userId;
    axios.get({ url: ALLOWANCE_ASSESS_SIGN, data: { User_ID } })
      .then(data => {
          if(data.data.length===0){
            dispatch(getPageDatab(data.data));
            message.info('沒有待審核的或已審核完畢')
            dispatch(isAuthority(true));
            if (data.Auth === 'Admin'){
              dispatch(isShowOr(false));//false
              // console.log(isShowOr());
            }else
            if (data.Auth === 'Super') {
              dispatch(isShowOr(true))//true
              // console.log(isShowOr());
            }
          }else {
        if (data.code === 0) {
          dispatch(isAuthority(false));
          message.warning(data.message);
        } else if(data.code === 1) {
          dispatch(isAuthority(true));
          dispatch(getPageDatab(data.data));
          // console.log(getPageDatab(data.data))
          // console.log(getPageDatab(data.data.Auth))
          // console.log(data.data[0].Auth);
          if (data.data[0].Auth === 'Admin'){
            dispatch(isShowOr(false));//false
            // console.log(isShowOr());
        
            // dispatch(href(data.data))
          }else
          if (data.data[0].Auth === 'Super') {
            // console.log(data.data[0].Auth)
            dispatch(isShowOr(true))//true
            // console.log(isShowOr());
            const  MoneyDate = data.data[0].MoneyDate;
            // console.log(MoneyDate)
            const  User_ID = sessionStorage.userId;
            // console.log(User_ID)
            const a ={MoneyDate,User_ID} 
            // console.log(a)
             dispatch(hrefDataTd(a));
          }
        }
            }
      })
      .catch(err => {
        message.warn('获取页面数据出错');
        console.log(err)
      })
  }
}
// href 数据
export  const hrefDataTd= (data)=>{
  // console.log(data)
  return{
    type:actionTypes.HREFDATA_TD,
    data
  }
}



// 頁面總權限
export const isAuthority = (bool) => {
  return {
    type: actionTypes.IS_AUTH,
    bool
  }
}


// -----------&&&&&
// 根據主管和管理員的不同權限，對應顯示不同的內容 /  Admin 表示管理員；若為Super 表示主管
export const isShowOr = (data) => {
  return {
    type: actionTypes.IS_SHOW,
    data
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
    ResultName: values.result === 1 ? '同意' : '駁回',
    sComment: values.suggestion
  }
  return dispatch => {
    axios.post({ url: '/Sign/F001_Approve', data})
      .then(data => {
        if (data.code === 1) {
          dispatch(asyncSubmitData())
        } else {
          message.info("獲取數據失敗")
        }
      })
      .catch(err => {
        message.warning('請求數據時錯誤')
        console.log(err)
      })
  }
}


// 点击下载Excel

export const downLoadCun = (data) => {
  return {
    type: actionTypes.DOWNLOAD_CUN,
    data
  }
}
export const downLoad = () => {
  return (dispatch, getState) => {
    // console.log(getState());
    // const MoneyDate = getState().allTheApplyFormReducer.signTableData[0].MoneyDate;
    const User_ID = sessionStorage.userId;
    // console.log(User_ID, MoneyDate);
    if(getState().allTheApplyFormReducer.signTableData===undefined){
      message.info('沒有待審核的或已審核完畢');
    }else {
    const MoneyDate = getState().allTheApplyFormReducer.signTableData[0].MoneyDate;
    const User_ID = sessionStorage.userId;
    // http://10.42.21.13:108/Audit/WaitSignPage_DownLoad
    // ?User_ID=10310001&MoneyDate=201910
   
    // console.log(downLoadHref)

    
    axios.get({
      url: ALLOWANCE_SIGN_DOWNLOAD,
      data:{ User_ID, MoneyDate }
    })
    
      .then(data => {
        // const hrefDate={MoneyDate,User_ID,ALLOWANCE_SIGN_DOWNLOAD }
        dispatch(downLoadCun(data))
        // console.log(hrefDate)
        // dispatch(href(hrefDate))
      })
  }
}
}



// export const href =(data)=>{
//   return{
//       type:actionTypes.HREF,
//       data
//   }
// }

// 点击上传  upLoad
//  URL  ：   Audit/WaitSignPage_UpLoad
// Supervisor主管工号
// file  (form-date 上傳附件)

// export const upLoad=()=>{
//   return  (dispatch,getState)=>{
//    const  Supervisor =sessionStorage.userId;
//   //  const file=
//   }
// }  signTableData




// isHideTable  点击显示table
// 参数User_ID dept  moneydate
export const isHideTable = (bool) => {
  return {
    type: actionTypes.IS_HIDE,
    bool
  }
}

// 點擊部門代碼, deptCenter()

//  export  const deptCenterChange= (data)=>{
//   console.log(data);
//   return {
//     type:actionTypes.DEPTCENTER_CHANGE,
//     data
//   }
// }

export const deptCentertTd = (data) => {
  // console.log(data);
  return {
    type: actionTypes.DEPTCENTERTd,
    data
  }
}
// 點擊部門鏈接，顯示出該部門的數據
//  參數：User_ID,   dept , moneydate,
// url：Audit/WaitSignPage_WithWB_Dept
export const deptCenter = (record) => {
  // console.log(record)
  return (dispatch, getState) => {
    // const Supervisor =sessionStorage.userId
    const {
      Supervisor: User_ID,
      Dept: dept,
      MoneyDate: moneydate
    } = record;
  
    // console.log(youUser_ID);
    console.log(User_ID, dept, moneydate);
    axios.get({
      url: ALLOWANCE_SIGN_DEPT,
      data: { User_ID, dept, moneydate }
    })
      .then(data => {
        if (data.code === 1){
          dispatch(deptCentertTd(data.data));
          // console.log(deptCentertTd(data.data));
          // console.log(deptCentertTd(record.Supervisor));
          dispatch(isHideTable(false));
          // dispatch(recordTd(record));
          // console.log(recordTd(record));
        }
      })
  }
}
// const recordTd = (data)=>{
//    return{
//      data
//    }
// }

//  點擊提交
// 接口WaitSignPage_WithWB_Submit
// 參數User_ID Dept
export const submitButton = () => {
  return (dispatch, getState) => {
    const User_ID = sessionStorage.userId;
    // console.log(getState());
    const Dept_ID = getState().ordersReducer.allTheApplyFormReducer.signTableData[0].Dept;
    const DateNum = getState().ordersReducer.allTheApplyFormReducer.deptCenterTdData[0].MoneyDate;
    // console.log(DateNum);
    // 只有主管有權限修改增加減少金額
    // console.log(Dept_ID);
    axios.get({
      url: ALLOWANCE_SIGN_SUBMIT,
      data: { User_ID, Dept_ID,DateNum}
    })
      .then(data => {
        // console.log(data.code);
        if (data.code === 1) {
          message.info(data.message)
          // dispatch(getPageData());
          // dispatch(deptCenter());
        } else {
          message.warn(data.message)
        }
      })
      .catch(err => {
        // message.warn("獲取數據出錯");
        console.log(err);
      })
  }
}
// // saveAuth
// // 編輯保存確定
// // 路由 Audit/WaitSignPage_WithWB
// WAITSIGNPAGE_WITHWB

export const saveAuth =(row)=>{//
  return dispatch=>{
    const username =sessionStorage.userId;
    console.log(username);
    // row= {}//
    // const data = {username,row};
    const data = row;
    console.log(row)
  axios.post({url:WAITSIGNPAGE_WITHWB,data,username})
  .then(res=>{
        if(res.code===1){
          message.info('更新成功');
          dispatch(saveAuthTd(res.data));
        }else {
          message.info(res.message);
        }
  })
  }
}

export const saveAuthTd = (data) => {
  // console.log(data);
  return {
    type: actionTypes.SAVEAUTH_TD,
    data
  }
}


// 批量上傳
// upLoad
// Audit/WaitSignPage_UpLoad
export const upLoad=()=>{
  return (dispatch,getState)=>{
  let formData =new FormData();
  // file.action=WAITSIGNPAGE_UPLOAD;
  // formData.action ='WAITSIGNPAGE_UPLOAD';
  formData.append('Supervisor', sessionStorage.getItem('userId'));
  formData.append('file', getState().ordersReducer.allTheApplyFormReducer.loadFile);
      // const Supervisor= sessionStorage.userId;
      // console.log(Supervisor);
      // console.log(file);
    axios.post({
      url:WAITSIGNPAGE_UPLOAD,
      data:formData
    })
    .then(data=>{
      if(data.code===1){
        message.info('上傳成功')
        // dispatch(getPageDatab(data.test));
        dispatch(showBtn(false))
      }else  if(data.code===0){
        message.warn(data.message)
       
      }
    })
  }
}

// 

export const saveUpLoadFile=(data)=>{
    let file =fileType(data);
    return{
      type:actionTypes.SAVEUPLOAD_FILE,
      file
    }
}
const  fileType =(file)=>{
  let type= file.type;
  let temp =null;
  let index =0 ;
  for (let i of typeArr){
    if(i !==type){
      index++;
    }
  }
  if(index !==typeArr.length){
    temp =file;
  }
  else{
    message.warn(`请使用 .xls 或者 .xlsx 格式的文档`)
  }
  return temp;
}



// 點擊上傳按鈕顯示隱藏
export const showBtn =(bool)=>{
  // console.log(bool)
  return{
    type:actionTypes.SHOW_BTN,
    bool
  }
}


