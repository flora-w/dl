import axios from "../../../axios";
import * as actionTypes from './actionTypes';
import { message } from "antd";
//  import qs from 'qs';
import { formatDate } from '../../../utils/';
import {
  MAINTAIN_AUTH, MAINTAIN_AUTH_EDIT, MAINTAIN_OUT_NAME, MAINTAIN_AUTH_ADD,
  BUDGET_ALLOWANCE_SEARCH, BUDGET_ALLOWANCE_AUTH_MONEY, SYSTEM_ADMIN_AUTHADD, SYSTEM_ADMIN_AUTHEDIT, BUDGET_ALLOWANCE_AUTH, BUDGET_ALLOWANCE_ALLOWANCE_ADD,
  BUDGET_ALLOWANCE_ADD,
  BUDGET_ALLOWANCE_ADDONCE, MAINTAIN_ALLOWANCE_EDIT,BUDGET_ALLOWANCE_ADDBATCH
} from "../../../config/api";
import { EADDRINUSE } from "constants";
// import { Tapable } from "tapable";
// import { Session } from "inspector";

let empno = sessionStorage.getItem('userId');
let typeArr = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];


// ---

/**
 * 封裝請求
 */

const ajax = (url, method, data) => {
  return new Promise((resolve, reject) => {
    axios[method]({ url, data, })
      .then((res, dispatch) => {
        if (res.code === 1) {
          resolve(res.data);
          dispatch(isAuthority(true));
        } else {
          reject(res.message)
          if (res.message === '您沒有權限查看!')
            dispatch(isAuthority(false));
        }
      })
      .catch(err => {
        reject('出現錯誤');
      })
  })
}
// 
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
  if (err.message) {
    message.error(err.message);
    console.log(err)
  } else {
    message.error(err);
  }
}
/**
 * 獲取頁面數據   权限
 */

export const getPageDataTd=(data)=>{
  return({
    type: actionTypes.GET_PAGE_DATATD,
    data
  })
}
export const getPageData=()=>{
  return dispatch=>{
    const User_ID=sessionStorage.userId;
    // console.log(User_ID);
    axios.get({url:MAINTAIN_AUTH,data:{User_ID}
    })
    .then(data=>{
      if(data.code===1){
      dispatch(isAuthority(true));
      dispatch(getPageDataTd(data.data));
      }else if(data.code===0){
        dispatch(isAuthority(false));
        message.info('您無權限訪問')
      }
    })
    .catch(err=>{
      message.warn('獲取頁面數據出錯');
      console.log(err)
    })
  }
}

// -------------
// export const getPageDataSecondChange = data => {
//   return {
//     type: actionTypes.GET_PAGE_DATA_SECOND_CHANGE,
//     data
//   }
// }
const getPageDataSceondb = (data) => {
  return ({
    type: actionTypes.GET_PAGE_DATA_SECOND,
    data
  })
}
export const getPageDataSecond = () => {
  return dispatch => {
    const User_id = sessionStorage.getItem('userId');
    // console.log(User_id)
    axios.get({ url: BUDGET_ALLOWANCE_AUTH_MONEY, data: { User_id } })
      .then(data => {
        if (data.code === 1) {
          dispatch(isAuthority(true));
          dispatch(getPageDataSceondb(data.data));
          
        } else {
          message.warning(data.message);
          dispatch(isAuthority(false));
        }
      })
      .catch(err => {
        message.warn('獲取頁面數據出錯');
        console.log(err)
      })
  }
}



// ----------------

// const getDatab = data => {
//   return {
//     type: actionTypes.ALLOWANCE_DATA,
//     data
//   }
// }
// export const getData = (dispatch, cb) => {
//   const User_id = sessionStorage.getItem('userId');
//   axios.get({ url: BUDGET_ALLOWANCE_AUTH_MONEY, data: { User_id } })
//     .then(data => {
//       console.log(data)
//       if (data.code === 1) {
//         dispatch(isAuthority(true));
//         dispatch(cb(data.data));
//         dispatch(getDatab(data.data));
//         console.log(data.data);
//       } else {
//         message.warning(data.message);
//         dispatch(isAuthority(false));
//       }
//     })
//     .catch(err => {
//       message.warn('獲取頁面數據出錯');
//       console.log(err)
//     })
// }
const GetPageData = data => {
  return {
    type: actionTypes.GET_DATAB,
    data
  }
}
// export const getPageDatab = () => {
//   return (dispatch) => {
//     getDatab(dispatch, GetPageData)
//   }
// }
//信息查詢  
const serachDataa = (data) => {
  return {
    type: actionTypes.BUDGET_ALLOWANCE_SEARCH,
    data
  }
}
// getPagesDataagetPagesDataa
export const searchData = (card) => {
  return (dispatch, getState) => {
    // console.log(getState())
    const jobname = getState().adminMaintainReducer.jobname;
    //  console.log(jobname)
    axios.get({ url: BUDGET_ALLOWANCE_SEARCH, data: { jobname } })
      .then(data => {
        // console.log(data)
        if (data.code === 1) {
          dispatch(serachDataa(data.data || []));
        } else {
          message.warning('失败')
        }
      })
      .catch(err => {
        console.log('失败', err)
      })

  }
}



/**
 *  first編輯保存權限
 */
const asyncSaveAuth = (data) => {
  return ({
    type: actionTypes.SAVE_AUTH,
    data
  })
}
export const saveAuth = (row, table) => {
  return async (dispatch) => {
    try {
      await ajax(MAINTAIN_AUTH_EDIT, 'post', row);
      dispatch(asyncSaveAuth(row))
      // console.log(asyncSaveAuth(row))
    } catch (error) {
      errorMessage(error);
    }
  }
}
// Second編輯保存權限
// Maintain/AlloWance_Edit ~~~路由
//  export   const asyncsaveAuthSecond = (data) => {
//   return ({
//     type: actionTypes.SAVE_AUTH_SECOND,
//     data
//   })
// }


// 
// 參數
// Uniqueid’:’22’，’JobName’:’K16031356’,’JobCode’:’’,’BudgetBound’:’150’,’UpperBouns’:’300’,’Type’:’按工號’,’IsValid’:’Y’,’ModifyBy’:’K16031356’
// 
export const saveAuthSecondTd = (data) => {
  return ({
    type: actionTypes.SAVE_AUTH_SECOND,
    data
  })
}




export const saveAuthSecond = (row, table) => {
  return (dispatch, getState) => {
    row.ModifyBy = sessionStorage.getItem('userId');
    // console.log(row);
    axios.post({
      url: MAINTAIN_ALLOWANCE_EDIT,
      data:row
    })
      .then(res => {
        if (res.code === 1) {
          dispatch(saveAuthSecondTd(row))
          dispatch(getPageDataSecond());
          message.info('更新成功');
      
        }
      })
      .catch(err => {
        message.res('獲取數據出錯')
      })
  }
}







/**
 * 显示模态框
 */
export const showModal = () => {
  return {
    type: actionTypes.SHOW_MODAL
  }
}
export const showModal2 = () => {
  return {
    type: actionTypes.SHOW_MODAL2,
  }
}
export const addTypeTd = (data) =>{
  return {
    type: actionTypes.ADDTYPE_TD,
    data
  }
}

//顯示模態框的同時，類別顯示在模態框中
// Maintain/AlloWance_ADD
export const addType = () => {
  return dispatch => {
    axios.get({
      url: BUDGET_ALLOWANCE_ALLOWANCE_ADD
    })
      .then(data => {
        if (data.code === 1) {
          dispatch(addTypeTd(data.data))
        }
      })

  }
}





/**
 * 显示模态框
 */
export const hideModal = () => {
  return {
    type: actionTypes.HIDE_MODAL
  }
}

/**
 * 輸入工號帶出姓名
 */
export const asyncGetName = (name, setName) => ({
  type: actionTypes.GET_NAME,
  name,
  setName
})
export const getName = (value) => {
  return async (dispatch) => {
    try {
      const data = await ajax(MAINTAIN_OUT_NAME, 'get', { Auth_id: value });
      dispatch(asyncGetName(data[0].Value))
    } catch (error) {
      errorMessage(error);
    }
  }
}
/**
 * 新增確定
 */
//&&&&&&&&&&&&&&---------

export const addAuthOk1 = (values) => {
  return dispatch => {
    const ModifyBy = sessionStorage.userId;
    values.ModifyBy = sessionStorage.userId;
    // console.log(values);
    // let Data = values;
    axios.post({
      url: BUDGET_ALLOWANCE_ADD, data: values
    })
      .then(data => {
        if (data.code === 1) {
          message.warn('新增成功')
          // dispatch(getPageDataTd([values]));
          dispatch(getPageData());
          // getPageData();
          // console.log(AddData([values]));
          //  showModal: false;
        } else {
          message.warn('新增失敗')
        }
      })
    //  .catch(err=>{
    //    console.log('新增失敗',err)
    //  })
  }
}

export const AddData = (data) => {
  return {
    type: actionTypes.ADD_DATA,
    data
  }
}

// budgeMaintain
// 參數:{‘JobName’:’K16031356’,’JobCode’:’’,’BudgetBound’:’150’,’UpperBouns’:’300’,’Type’:’按工號’,’ModifyBy’:’K16031356’}
// {‘JobName’:’XXX’,’JobCode’:’XXX’,’BudgetBound’:’150’,’UpperBouns’:’300’,’Type’:’按職務’,’ModifyBy’:’K16031356’}
// Maintain/AlloWance_ADD_Once

export const addAuthOk2 = (values) => {
  return (dispatch, getState) => {
    const ModifyBy = sessionStorage.userId;
    values.ModifyBy = sessionStorage.userId;
    // console.log(values);
    // console.log(getState())
    axios.post({
      url: BUDGET_ALLOWANCE_ADDONCE, data: values
    })
      .then(data => {
        if (data.code === 1) {
          message.warn('新增成功')
          
          // dispatch(addAuthOk2Td([values]))
          dispatch(getPageDataSecond());
          // console.log(addAuthOk2Td(values))
        } else {
          message.warn(data.message)
        }
      })
  }
}
export const addAuthOk2Td = (data) => {
  return {
    type: actionTypes.ADDAUTHOK2_TD,
    data
  }
}
// 獲取input里的值
export const onInput = (data) => {
  return {
    type: actionTypes.ONINPUT,
    data
  }
}
// 上傳
// Maintain/AlloWance_ADD_Batch
 export const upLoad=(file)=>{
   return (dispatch,getState)=>{
    // console.log(file);
    let formDate = new FormData();
    //  const User_ID= sessionStorage.userId;
     formDate.append('User_ID',sessionStorage.getItem('userId'));
    //  console.log(getState());
    //  console.log(formatDate());
    formDate.append('file',getState().adminMaintainReducer.upLoad);
     axios.post({
       url:BUDGET_ALLOWANCE_ADDBATCH,
       data:formDate
     })
     .then(data=>{
       if(data.code===1){
        //  dispatch(getPageDataSceondb(data.file))
        dispatch(showBtn(false))
         message.warn('上傳成功')
         dispatch(getPageDataSecond());
       }else{
         message.warn(data.message)
       }
     })
   }
 }






export const saveUpLoadFile = (data)=>{
  let file =fileType(data);
  return{
    type:actionTypes.SAVEUPLOAD_FILE,
    file
  }
}

const fileType=(file)=>{
  let type=file.type;
  let temp = null;
  let index = 0;
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
// 上傳確定按鈕
export const showBtn =(bool)=>{
  return{
    type:actionTypes.SHOW_BTN,
    bool
  }
}












