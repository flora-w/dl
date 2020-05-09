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
    tableData: [],
    empNoValue: "",
    moneyDateValue: "",
    selectSearch:"ALL",
    hrefData:{}
};
const signFormListData = {
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
    ChangeMoney:'',
    UpperBouns:'',
    DedectMoney:'',
    FinalMoney:'',
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
        formIda: v.SequenceID,
        workNumber:v.WorkNumber,
        formName: v.FormName,
        department:v.department,
        applyNamet:v.ApplyNamet,
        applyNam:v.ApplyNam,
        applyNamw:v.ApplyNamw,
        statu:v.Statu,
        statua:v.Statua,
        statup:v.Statup,
        statuo:v.Statuo,
        statum:v.Statum,
        statun:v.Statun,
        statuy:v.Statuy,
        statut:v.Statut,
        statuts:v.Statuts,
        statuf:v.Statuf,
        //--------------

        serialId: v.SerialID,
        fillDate: v.ApplyDateTime,
        applyName: v.ApplyName,
        status: v.StepName
    })
    )
    return newState;
}

// personHobby  
const isAuthority =(newState,action)=>{
    newState.isAuthority= action.bool;
    return newState;
}

const getPageDataTd = (newState, action) => {
    // console.log(action);
    // action.data.unshift({ Value: "ALL" });
    newState.tableData = action.data.map((v, k) => ({ ...v, key: k }));
    // newState.jxzq = action.data.KEY;
    return newState;
  };

  const onInput = (newState, action) => {
    //   console.log(action.data)
    newState[action.data.type] = action.data.value;
    return newState;
  };


const selectSearch =(newState,action)=>{
    newState.selectSearch = action.data;
    return newState;
}

const summarySearchCun =(newState,action)=>{
    newState.signFormListData =action.data;
    return newState;
}

const hrefTd = (newState,action)=>{
    newState.hrefData = action.data;
    return newState;
}




//  


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


export default (state = defaultState, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        //頁面初始化數據
        case actionTypes.SIGN_PAGE_DATA:
            return pageData(newState, action);
      
        case actionTypes.IS_AUTH:
             return isAuthority(newState,action);

        case actionTypes.SELECTSEARCH:
            return  selectSearch(newState,action)
        case actionTypes.GETPAGE_DATATD:
            return getPageDataTd(newState,action)    
        case actionTypes.SUMMARYSEARCHCUN:
            return summarySearchCun(newState,action);

        case actionTypes.EMPNOPERSON:
            return onInput(newState, action)
            // console.log(action.data);

        case actionTypes.HREF:
            return hrefTd(newState,action)
        

        //点击单号显示对应签核内容
        case actionTypes.FORMID_CLICK:
            return formClick(newState, action);

        default:
            return newState;
    }
}