import * as actionTypes from "./actionTypes";

const signTableData ={
    MoneyDate:'',
    Dept:'',
    DeptName:'',
    Supervisor:'',
    Status:''
}

// 點擊之後，需要顯示的table  deptCenterTdData

const defaultState = {
    page: 1,
    title: '',
    category: 1,
    signFormListData: [],
    formData: [],
    flightData: [],
    newFlightData: [],
    originFlightData: [],
    signHistory: [],
    isAuthority:false,
    isShowOr:false,
    // 
    deptCenterData:{},
    isHideTable:true,
    loadFile:[],
    showBtn:false,
    deptCenterTdData :{
        MoneyDate:'',
        EmpNo:'',
        ChName:'',
        DeptCode:'',
        Dept:'',
        JobName:'',
        HireDate:'',
        WorkDays:'',
        ResignDate:'',
        BudgetBound:'',
        AddMoney:'',
        ReduceMoney:'',
        UpperBouns:'',
    },
    downLoadCunData: {},
    hrefData:{}
};
/**
 * 頁面初始化數據
 */      ///

//   getPageDatab
const pageData = (newState, { data, id }) => {
    let formList = [];
    if(id === '1'){
        formList = data.AllFormList;
    }
    if(id === '2'){
        formList = data.OngoingFormList;
    }
    // console.log(data, id)
    newState.signFormListData = formList.map(v => ({
        formId: v.SequenceID,
        formName: v.FormName,
        serialId: v.SerialID,
        fillDate: v.ApplyDateTime,
        applyName: v.ApplyName,
        status: v.StepName,
        formNumber:v.FormNumber,
        fillName:v.FillName,
        applyDirector:v.ApplyDirector,
        applyPay:v.applyPay,
        applyDate:v.ApplyDate,
        status:v.Status

    })
    )
    return newState;
}
// ---deptCenter

const getPageDatab =(newState,action)=>{
//    console.log(action.data);
   newState.signTableData =action.data.map((v,k)=>({...v,key:k}));
        return newState;
}

const getIsAuth=(newState,action) =>{
    // console.log(action.bool)
    newState.isAuthority = action.bool;
    return newState;
}

const  isShowOr =(newState,action)=>{
    // console.log(action.data);
    newState.isShowOr =action.data;
    return newState;
}

const isHideTable=(newState,action)=>{
    // console.log(action.bool)
    newState.isHideTable =action.bool;
    return newState;
}


const downLoadCun =(newState,action)=>{
    // console.log(action.data);
    newState.downLoadCunData = action.data;
    return newState;
}

const hrefDataTd = (newState,action)=>{
    // console.log(action.data)
    newState.hrefData = action.data;
    // console.log(newState.hrefData)
    return  newState;
}
// 
// const statesTable  =(newState,ation)=>{
//     newState.statesTable=action.data;
//     return newState;
// } 

// 部門代碼 render()
const deptCenterTd =(newState,action)=>{
    // console.log(action.data);
    newState.deptCenterTdData= action.data.map((v,k)=>({...v,key:k}));
    // console.log(v);
    return newState;
}
// const deptCenterChange =(newState,action)=>{
//     console.log(action.data);
//     newState.deptCenterData= action.data;
//     return newState;
// }
// ---------------
// 上傳確定按鈕
const showBtn=(newState,action)=>{
    // console.log(action.bool)
    newState.showBtn=action.bool;
    return newState;
}

const saveUpLoadFile=(newState,action)=>{
    newState.loadFile =action.file;
    newState.showBtn= true;
    return newState;
}
// -----
// const saveAuthTd = (newState,action)=>{
//     console.log(action.data);
//     newState.deptCenterTdData = action.data;
//      return  newState;
// }





/**
 * 頁面判斷ID
 */
const currPage = (newState, { id }) => {
    newState.page = id;
    return newState;
}
/**
 * 点击单号显示对应签核内容
 */
const formClick = (newState, { data, title }) => {
    newState.page = 2;
    newState.title = title;
    newState.category = data.category;
    newState.formData = { ...data.FlowDetail, ...data.FormDetail };
   
    return newState;
}

const saveAuth = (newState,action)=>{
    // console.log(action);
    newState.deptCenterTdData.forEach((v,k)=>{
        // console.log(v.EmpNo);
        // console.log(typeof'action.data')
        // var str1 = JSON.parse(str);
        var actionData = JSON.parse(action.data)
        // console.log(typeof(actionData));
        // console.log(action.data.EmpNo);
        // console.log(actionData.EmpNo)
        if(v.EmpNo === actionData.EmpNo){
            newState.deptCenterTdData[k] = actionData;
            // console.log(newState.deptCenterTdData[k])
        }
    })
    return newState;
}



 

/**
 * 返回form列表   
 */
const goback = (newState, action) => {
    newState.page = 1;
    return newState;
}
// ----------------------
export default (state = defaultState, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        //頁面初始化數據
        case actionTypes.SIGN_PAGE_DATA:
            return pageData(newState, action);
        // -----------
        case actionTypes.SIGN_PAGE_DATA_B:
        return  getPageDatab(newState,action);

        case actionTypes.IS_AUTH:
        return getIsAuth(newState,action);

        case actionTypes.IS_SHOW:
        return isShowOr(newState,action);
         
        case actionTypes.IS_HIDE:
        return isHideTable(newState,action);

        case actionTypes.DOWNLOAD_CUN:
         return downLoadCun(newState,action);


        //----------
        case actionTypes.DEPTCENTERTd:
          return deptCenterTd(newState,action);

        //返回form列表
        case actionTypes.GO_BACK:
            return goback(newState, action);

        //点击单号显示对应签核内容
        case actionTypes.FORMID_CLICK:
            return formClick(newState, action);

        // 上傳確定button
        case actionTypes.SHOW_BTN:
            return showBtn(newState,action);
        
        case actionTypes.SAVEUPLOAD_FILE:
            return saveUpLoadFile(newState,action)

        // case actionTypes.SAVEAUTH_TD:
        //     return saveAuthTd(newState,action)

        case actionTypes.SAVEAUTH_TD:
            return saveAuth(newState,action);  
            
        case actionTypes.HREFDATA_TD:
            return hrefDataTd(newState,action);

        default:
            return newState;
    }
}