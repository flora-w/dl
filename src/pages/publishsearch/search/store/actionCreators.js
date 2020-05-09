import axios from "../../../../axios";
import * as actionTypes from './actionTypes';
import { message } from "antd";
import NoAuthority from '../../../../commonPages/noAuthority';
import {PUBLISHING_Info_Page,PUBLISHING_SEARCH,PUBLISHING_SEARCH_PAGE, PUBLISHING_SEARCH_PAGE_INFO } from "../../../../config/api";
import { isUndefined } from "util";


// * 封裝請求
//  */
const ajax = (url, method, data) => {
  return new Promise((resolve, reject) => {
    axios[method]({ url, data, })
      .then((res, dispatch) => {
        if (res.code === 1) {
          resolve(res.data);
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





// 錯誤類型   
const errorMessage = (err) => {
  if(err.message){
    message.error(err.message);
    console.log(err)
  }else{
    message.error(err);
  }
}

// 權限
  // export const getPageDataChange = data => {
  //   return {
  //     type:actionTypes.GET_PAGE_DATA,
  //     data
  //   }
  // }

  const getPageDatab = (data) =>{
  return ({
    type:actionTypes.GET_PAGE_DATAB,
    data
  })
 } 
export const getPageData =() => {
  return dispatch =>{
  const User_ID =sessionStorage.getItem('userId');
    // console.log(User_ID)
      axios.get({url:PUBLISHING_SEARCH_PAGE,data:{User_ID}})
      .then(data =>{
        if(data.code === 1){
          // console.log(data.code);
          dispatch(isAuthority(true));
          dispatch(getPageDatab(data.Data));
        }else{
          message.warning(data.message);
          dispatch(isAuthority(false))
        }
      })
      .catch(err => {
        message.warn('獲取頁面數據出錯');
        console.log(err)
      })
  }
}
// ------------
 export const isAuthority = (bool) =>{
   return {
     type:actionTypes.IS_AUTH,
      bool
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
//  publishSearchCun
// 工号获取
export const empNoPersonChange = data =>{
  return {
    type:actionTypes.EMPNOPERSON_CHANGE,
    data
  }
}
  export const empNoPerson =(data)=>{
    return {
      type:actionTypes.EMPNOPERSON,
      data
    }
  }
  export const onInput =(data)=>{
    return {
      type:actionTypes.EMPNOPERSON,
      data
    }
  }
  
// 
export const moneyDateChange = data =>{
  return{
    type:actionTypes.MONEYDATE_CHANGE,
    data
  }
}
export const moneyDate =(data) =>{
  // console.log(data)
  return{
    type:actionTypes.MONEYDATE,
    data
  }
}

export const hireDateChange =(data) =>{
  return{
    type:actionTypes.HIREDATA_CHANGE,
    data
  }
}
export const  hireDate=(data) =>{
  return{
    type:actionTypes.HIREDATA,
    data
  }
}
// personHobbySave

export const personHobbySaveChange = data =>{
  return {
    type:actionTypes.PERSONHOBBY_SAVE_CHANGE,
    data
  }
}
export  const personHobbySave = (data) =>{
  // console.log(data)
  return {
    type:actionTypes.PERSONHOBBY_SAVE,
   data
  }
}
// ------------personHobbySave

export const publishSearchChange =(data) =>{
  return {
    type:actionTypes.PUBLISHING_SEARCH_CHANGE,
    data
  }
}
// export const publishSearch =(data) =>{
//   return{
//     type:actionTypes.PUBLISHING_SEARCH
//   }
// }
export const publishSearchCun = (data) =>{
  return{
    type:actionTypes.PUBLISHING_SEARCH_CUN,
    data
  }
}
//
export const publishSearch = () => {
  return (dispatch, getState) => {
    // console.log(getState());
    const {
      personHobby:Dept,
      empNoPersonValue: EmpNo,
      moneyDateValue: MoneyDate,
      hireDate: HireDate
    } = getState().publishingSearchReducer;
      // console.log( Dept, EmpNo, MoneyDate, HireDate )
    axios
      .post({
        url: PUBLISHING_SEARCH_PAGE_INFO,
        // url: 'http://localhost:3333/api/table/table.json',
        data: { Dept, EmpNo, MoneyDate, HireDate }
      })
      .then(data => {
        if (data.code === 1) {
          dispatch(isAuthority(true));
          dispatch(publishSearchCun(data.data));
        } else {
          message.warning(data.message);
          dispatch(isAuthority(false));
        }
      })
      .catch(err =>{
        message.warn("獲取頁面數據出錯");
        console.log(err);
      });
  };
};







