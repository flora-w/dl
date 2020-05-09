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

};
const signFormListData ={
    PartyEmpNo:'',
    PartyName:'',
    PPMoney:'',
    ApplyReason:'',
    ApplyPPContent:'',
    ApplyDate:'',
    AnnounceDate:'',
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
        status: v.StepName,
        formNumber:v.FormNumber,
        fillName:v.FillName,
        applyCatefory:v.ApplyCatefory,
        statusdate:v.StatusDate,
        statusdates:v.StatusDates,
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
  const isAuthority = (newState,action) =>{

      newState.isAuthority=action.bool;
      return newState;
  }
// 
  const getPageDatab = (newState,action)=>{
    // console.log(action.data);
    newState.signFormListData =action.data;
    return newState;
}
// 
  const synchronousTd = (newState,action)=>{
      newState.signFormListData = action.data;
      return newState;
  }




export default (state = defaultState, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case actionTypes.SIGN_PAGE_DATA:
            return pageData(newState, action);


        case actionTypes.IS_AUTH:
            return isAuthority(newState,action);

        case actionTypes.GETPAGE_DATAB:
            return getPageDatab(newState,action)

        case actionTypes.SYNCHRONOUSTD:
        return synchronousTd(newState,action)   


        default:
            return newState;
    }
}