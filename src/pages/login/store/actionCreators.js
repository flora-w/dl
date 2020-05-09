import axios from "../../../axios";
import { LOGIN } from "../../../config/api";
import { message } from "antd";
import { actionTypes } from "./index";
export const login = (history, values, category) => {
  const formData = new FormData();
  formData.append('Account', new Buffer(values.userName).toString('base64'));
  formData.append('Password', new Buffer(values.passWord).toString('base64'));
  return dispatch => {
    const url = LOGIN;
    dispatch({type: actionTypes.LOADING});//启用loading效果
    axios.post({url,data:formData})
    .then(res =>{
      if (res.code === 1){
        sessionStorage.setItem('user', res.data.Name);   //保存登陆者姓名
        sessionStorage.setItem('userId', res.data.User_id);   //保存登陆者工号    
        sessionStorage.setItem('category', 'staff');   //保存登陆者類型
        dispatch({type: actionTypes.LOGIN_SUCCESS});
        history.replace('/home'); //成功之后跳转到首页
        console.log(res);
      }
   else{
        dispatch({type: actionTypes.LOGIN_FAIL}); //去掉loading
        message.warning(res.message);
      }
    })
    .catch(err => {
      dispatch({type: actionTypes.LOGIN_FAIL}); //去掉loading
      // message.warning('请求出错');
      console.log(err);
    })
  }
}