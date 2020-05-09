import * as actionTypes from "./actionTypes";

const defaultState = {
  baseInfo: {
    dept: "",
    empno: "",
    name: "",
    enName: "",
    ziDeng: "",
    hireDate: "",
    birthDate: "",
    sex: "",
    phone: "",
    eMail: "",
    areaData: [],
    seat: [],
    eat: [],
    areaSelectData: "",
    seatSelectData: "",
    hobbySelectData: "",
    remark: "",
    hobby: {}
  },
  vipAndHobby: {
    company: [],
    companyAndCard: []
  },
  cardInfo: {
    cardCategory: [],
    data: []
  },
  tableData: [],
  // jxzq: ''
  empNoPersonValue: "",
  moneyDateValue: "",
  hireDate: "",
  personHobby:"ALL",
};
const downTableData={
  MoneyDate:'',
  DeptCode:'',
  Dept:'',
  EmpNo:'',
  ChName:'',
  JobCode:'',
  BudgetBound:'',
  UpperBouns:'',
  Status:'',
}
// console.log   publishSearchCun
// 
const getPageDatab = (newState, action) => {
  // console.log(action.data);
  action.data.unshift({ Value: "ALL" });
  newState.tableData = action.data.map((v, k) => ({ ...v, key: k }));
  // newState.jxzq = action.data.KEY;
  return newState;
};

const publishSearchCun = (newState, action) => {
  // console.log(action.data);
  // newState.downTableData = action.data;
  newState.downTableData = action.data.map((v, k) => ({ ...v, key: k}));
  // console.log(downTableData )
  return newState;
};
//
const onInput = (newState, action) => {
  newState[action.data.type] = action.data.value;
  return newState;
};

//備註
const remarkChange = (newState, { data }) => {
  newState.baseInfo.remark = data;
  return newState;
};
const getIsAuth = (newState, action) => {
  newState.isAuthority = action.bool;
  return newState;
};
//card信息增加
// const cardNewAdd =(newState, {data}) => {
//     return newState;
// }
const personHobbySave = (newState, action) => {
  newState.personHobby = action.data;
  return newState;
};

//

export default (state = defaultState, action) => {
  const newState = JSON.parse(JSON.stringify(state)); //
  // console.log(action);
  switch (action.type) {
    //頁面數據
    // case actionTypes.PAGE_DATA:
    //   return pageData(newState, action);

    case actionTypes.GET_PAGE_DATAB:
      return getPageDatab(newState, action);

    // case actionTypes.GET_PAGE_DATA:
    // return getPageData(newState,action);

    case actionTypes.IS_AUTH:
      return getIsAuth(newState, action);

    //備註
    case actionTypes.REMARK_CHANGE:
      return remarkChange(newState, action);

    case actionTypes.PERSONHOBBY_SAVE:
      return personHobbySave(newState, action);

    case actionTypes.EMPNOPERSON:
      return onInput(newState, action);

    case actionTypes.PUBLISHING_SEARCH_CUN:
      return publishSearchCun(newState, action);
    default:
      return newState;
  }
};
