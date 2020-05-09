import * as actionTypes from "./actionTypes";

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
    empNoValue:'',
    signFormData:[],
};

// const signFormData ={
//     EmpNo:'',
//     ChName:'',
//     ResignDate:'',
//     AllMoney:'',
//     DeleMoney:'',
//     ResidueMoney:'',
//     TransTime:'',
//     deal:'',
// }

/**
 * 頁面初始化數據
 */
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
        //
        penalty:v.Penalty,
        buckle:v.Buckle,
        payCycle:v.PayClick,
        deal:v.Deal
        //
    })
    )
    return newState;
}
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
/**

/**
 * 返回form列表
 */
const goback = (newState, action) => {
    newState.page = 1;
    return newState;
}
// --------
const surplusSearchTd =(newState,action)=>{
    // console.log(action.data)
    newState.signFormData= action.data;
    return newState;
}





const onInput = (newState,action) =>{
    // console.log(action.data)
    newState[action.data.type] = action.data.value;
    return newState;
}



 
const isAuthority =(newState,action) =>{
    newState.isAuthority = action.bool;
    return newState;
}

const getPageDataTd =(newState,action) =>{
    newState.signFormData =action.data;
    return newState;
}

const residueDeleteFn =(newState,action) =>{
    console.log(action.data)
    newState.residueDeleteFn=action.data;
    return newState;
}

const deleteOK = (newState,action)=>{
    console.log(action.data)
    const prevState = newState.signFormData
    prevState.splice(action.index,1)
    newState.signFormData= prevState
    return newState;
}



export default (state = defaultState, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        //頁面初始化數據
        case actionTypes.SIGN_PAGE_DATA:
            return pageData(newState, action);
      
        //返回form列表
        case actionTypes.GO_BACK:
            return goback(newState, action);

        case actionTypes.IS_AUTH:
             return isAuthority(newState,action);
        case actionTypes.GETPAGEDATA_TD:
             return  getPageDataTd(newState,action);
        case actionTypes.ONINPUT:
             return  onInput(newState,action)
             console.log(action.data);
        case actionTypes.SURPLUSSEARCH_TD:
             return surplusSearchTd(newState,action)
        case actionTypes.RESIDUEDELETE_FN:
             return residueDeleteFn(newState,action)
        case actionTypes.DELETE_OK:
             return deleteOK(newState,action)    

        default:
            return newState;
    }
}