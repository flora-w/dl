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
    isAuthority:'false',
    isHideTable:'true',
    showBtn:'false'
};
const  signFormData ={
    MoneyDate:'',
    Dept:'',
    DeptName:'',
    Supervisor:'',

}
//
// 點擊之後，需要顯示的table  deptCenterTdData
 // 點擊之後，需要顯示的table  deptCenterTdData
const statesTableTdData ={
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
    UpperBouns:''
}


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
        status: v.StepName
    })
    )
    return newState;
}

const getPageDatab = (newState,action)=>{
    // console.log(action.data);
    newState.signFormData =action.data;
    return newState;
}
  
const isAuthority = (newState, action) => {
    // console.log(action.bool);
    newState.isAuthority = action.bool;
    return newState;
  };
  const isShowBtn = (newState,action) =>{
    newState.isShowBtn = action.bool;
      return newState;
  }

const isHideTable = (newState,action) =>{
    // console.log(action.bool);
    newState.isHideTable = action.bool;
    return newState;
}  

const statesTableTd = (newState,action)=>{
    // console.log(action.data);
    newState.statesTableTdData=action.data;
    return newState;
}


export default (state = defaultState, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        //頁面初始化數據  
        case actionTypes.SIGN_PAGE_DATA:
            return pageData(newState, action);

        case actionTypes.IS_AUTH:
            return isAuthority(newState, action);
        case actionTypes.SHOW_BTN:
            return isShowBtn(newState,action);

        case actionTypes.GET_PAGE_DATA_B:
           return getPageDatab(newState,action);

        case actionTypes.STATESTBLE_TD:
             return statesTableTd(newState,action);

        case actionTypes.IS_HIDE:
             return isHideTable(newState,action)

        default:
            return newState;
    }
}