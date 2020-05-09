import * as actionTypes from "./actionTypes";
import { message } from "antd";
import { formatDate } from '../../../../utils/';
import { getPageData } from "./actionCreators";
const defaultState = {
    baseInfo: {
        uniqueid: '',
        moneyDate: '',
        deptCode: '',
        dept: '',
        empNo: '',
        ChName: '',
        jobCode: '',
        budgetBound: '',
        UpperBouns: '',

        // ---
        enName: '',
        ziDeng: '',
        hireDate: '',
        // birthDate: '',
        // sex: '',
        // phone: '',
        // eMail: '',
        areaData: [],
        seat: [],
        eat: [],
        areaSelectData: '',
        seatSelectData: '',
        hobbySelectData: '',
        remark: '',
        hobby: {}
    },
    vipAndHobby: {
        company: [],
        companyAndCard: [],       
    },
    cardInfo: {
        cardCategory: [],
        data: []
    },
    tableData: [],
    jxzq: '',
    deptCode:'ALL',
    tableDataPersonHobby:[],
    personHobby:'ALL'
};
//頁面數據
const pageData = (newState, {data:{BaseInfo, Country, Hobby, Seat, Diet, CertType, Company, VIPCard, CertInfo}}) => {
    newState.baseInfo.empno = BaseInfo[0].Empno;
    newState.baseInfo.name = BaseInfo[0].ChName;
    newState.baseInfo.dept = BaseInfo[0].Deptcode;
    newState.baseInfo.enName = BaseInfo[0].EnName;
    newState.baseInfo.ziDeng = BaseInfo[0].JobName;
    newState.baseInfo.hireDate = BaseInfo[0].HireDate;
    // newState.baseInfo.birthDate = BaseInfo[0].BirthDate;
    // newState.baseInfo.sex = BaseInfo[0].Sex === 'M'? '男' : '女';
    // newState.baseInfo.phone = BaseInfo[0].Phone;
    // newState.baseInfo.eMail = BaseInfo[0].Mail;
    newState.baseInfo.areaData = Country;
    newState.baseInfo.seat = Seat;
    newState.baseInfo.eat = Diet;
    newState.baseInfo.hobby = Hobby[0];
    // if(Hobby.length > 0){
    //     newState.baseInfo.areaSelectData = Hobby[0].Country;
    //     newState.baseInfo.seatSelectData = Hobby[0].SeatType;
    //     newState.baseInfo.hobbySelectData = Hobby[0].FoodType;
    //     newState.baseInfo.remark = Hobby[0].Remark;
    // }else{
    //     newState.baseInfo.areaSelectData = '';
    //     newState.baseInfo.seatSelectData = '';
    //     newState.baseInfo.hobbySelectData = '';
    //     newState.baseInfo.remark = '';
    // }
    newState.vipAndHobby.company = Company;
    newState.vipAndHobby.companyAndCard = VIPCard;
    newState.cardInfo.cardCategory = CertType;
    for(let i = 0 ,len = CertInfo.length;i<len;i++){
        if(CertInfo[i].CertValidTime) CertInfo[i].CertValidTime = formatDate(CertInfo[i].CertValidTime);
        if(CertInfo[i].SignValidTime) CertInfo[i].SignValidTime = formatDate(CertInfo[i].SignValidTime);
        if(CertInfo[i].TaiwanValidTime) CertInfo[i].TaiwanValidTime = formatDate(CertInfo[i].TaiwanValidTime)
    }
    newState.cardInfo.data = CertInfo;
    return newState;
}
 
const getPageDatab = (newState,action) =>{
    // console.log(action);
    action.data.Dual.unshift({Value: 'ALL'})
    newState.tableData = action.data.Dual.map((v,k) => ({...v,key: k}));
    newState.jxzq = action.data.KEY;
    return newState;
}

const bottomTablesDatab= (newState,action)=>{
        // console.log(action.data)
        // newState.tablesdata = action.data.map((v,k)=>({...v,key:v}));
        return newState;
}
// tableDataPersonHobby


const getIsAuth = (newState,action) =>{
    newState.isAuthority =action.bool;
    return newState;
}
// registerDeptb
const registerDeptb =(newState,action) =>{
    newState.tableData = action.data.map((v,k) => ({...v,key:k}));
    newState.showModal = false;
    return newState;
}

// 
const personHobbySavebst=(newState,action)=>{
    // console.log(action.data)
    newState.tableDataPersonHobby = action.data.map((v,k) => ({...v,key:k})); 
    return newState;
}

// const sendMailToBossb =(newState,action) =>{
//     newState.sendMailTo = action.data.map((v,k) =>({...v,key:k}));
//     return newState;
// }


// registerDeptb


// personHobbySaveb  
const personHobbySave =(newState,action) =>{
        // console.log(action.data)
         newState.personHobby = action.data;
        //  console.log(action.data);

    // newState.tableData = action.data.map((v,k) => ({...v,key:k}));
    // newState.showModal = false;
    return newState;
  
}



//card信息增加     sendMailToBossb
// const cardNewAdd =(newState, {data}) => {   
   
//     return newState;
// }
export default (state = defaultState, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        //頁面數據 bottomTablesDatab
        case actionTypes.PAGE_DATA:
            return pageData(newState, action);

        case actionTypes.GET_PAGE_DATAB:
        return getPageDatab(newState,action);

        case actionTypes.IS_AUTH:
        return getIsAuth(newState,action);

        case actionTypes.REGISTERDEPTB:
        return registerDeptb(newState,action);
        
         case actionTypes.PERSONHOBBYSAVE:
         return personHobbySave(newState,action);  
            
         case actionTypes.PERSONHOBBYSAVEBST:
         return personHobbySavebst(newState,action);  


         case actionTypes.BOTTOMTABLESDATAB:
         return  bottomTablesDatab(newState,action);


        // case actionTypes.SENDMAILTOBOSSB:   
        // return sendMailToBossb(newState,action);


        //card信息增加
        // case actionTypes.CARD_NEW_ADD:
        //     return cardNewAdd(newState, action);
        default:
        break;
    }
    return newState;
}