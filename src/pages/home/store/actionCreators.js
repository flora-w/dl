import axios from "../../../axios/";
import * as actionTypes from './actionTypes';
import { MAINTAIN_OUT_NAME } from '../../../config/api';

let index = null;
if(!sessionStorage.getItem('Index')){
    sessionStorage.setItem('Index','0');
    window.location.reload(true)
}
else{
    index = sessionStorage.getItem('Index');
}
export const canAutoLogin = () =>{
    return {
        type:actionTypes.AUTO_LOGIN,
    }
}

export const autoLogin = (props) =>{
    let id = props.location.search.slice(7);
    if(index === '0'){
        getUserName(id,props);       
        if(!sessionStorage.getItem('userId')){
            sessionStorage.setItem('userId', id);
        }
    }   
    return dispatch =>{
        dispatch(canAutoLogin())
    }
}
const getUserName = (id,props) =>{
    axios.get({url:MAINTAIN_OUT_NAME,data:{Personid:id}}).then(res=>{
        if(res.code == 1){
            sessionStorage.setItem('user',res.Data.PersonInfo[0].ChName);
            sessionStorage.setItem('category', 'staff');
            window.location.reload(true)    
            // props.history.push(`/home${props.location.search}`)
            sessionStorage.setItem('Index','1')
        }
    })
}