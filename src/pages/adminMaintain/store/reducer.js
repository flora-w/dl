import * as actionTypes from "./actionTypes";

const defaultState = {
  tableData:[],
  showModal: false,
  showModal2: false,
  name: '',
  searchData: [],
  orderData:[],
  isAuthority:false,
  // searchCondition:{formstatus:null,travel:null},
  travelData:[],
  kmPageData:{
    fly:[],
    flyrecord:[],
  },
  kmFile:[],
  showBtn:false,
  airlineCompanyData:[],
  flightTimeData:{
    fly:[],
    flyrecord:[],
  },
  flightTimeFile:[],
  budget_allowance_data: [],
  upLoad:[],
}
/**
 * 獲取權限維護頁面數據 signFormData
 */

const getPageDataTd = (newState, action) => {
  newState.tableData = action.data.map((v,k) => ({...v, key: k}));
  newState.showModal = false;  
  // console.log(newState.tableData)
  return newState;
}


// const getPageDataSecond = (newState, action) => {
//   newState.tableData = action.data.map((v,k) => ({...v, key: k}));
//   newState.showModal = false;
//   console.log(newState.tableData)
//   return newState;
// }

// -----------------
const getPageDataSceondb =(newState,action)=>{
   newState.budget_allowance_data=action.data.map((v,k) => ({...v,key:k}));
   newState.showModal2 = false;
   return newState;
}


// --------
const getPagesDataa = (newState,action) =>{
  // console.log(action.data);
  newState.budget_allowance_data.push(action.data);
  newState.showModal = false;
  // console.log(newState.tableData)
  return newState;
}

// const getDatab = (newState,action) =>{
//   console.log(action);
//   newState.budget_allowance_data.push(action.data);
//   newState.showModal = false;
//   // console.log(newState.tableData)
//   return newState;
// }

// 
// const getPageDatabm =(newState,action) =>{
//   console.log(action);
//   newState.
// }
/**
 * first權限維護編輯保存
 */
const saveAuth = (newState, action) => {
  let temp = newState.tableData;
  temp.map((v,k)=>{
    if(v.key === action.data.key){
      temp[k] = action.data;
    }
  })
  newState.tableData = temp;
  return newState;
}
// Second權限維護編輯保存
const saveAuthSecond = (newState, action) => {
  let temp = newState.budget_allowance_data;
  temp.map((v,k)=>{
    if(v.key === action.data.key){
      temp[k] = action.data;
    }
  })
  newState.budget_allowance_data = temp;
  return newState;
}



// 
/**
 * 显示模态框
 */
const showModal = (newState, action) => {
  newState.showModal = true;
  return newState;
}
/**
 * 隐藏模态框
 */
const hideModal = (newState, action) => {
  newState.showModal = false;
  newState.showModal2 = false;
  return newState;
}


const showModal2 = (newState,action) => {
  // console.log(action)
  newState.showModal2 = true;
  return newState;
}


/**
 *  獲取名字
 */
const getName = (newState, action) => {
    newState.name = action.name;
    return newState;
}
/**
 * 获取搜索内容
 */
const getSearchData = (newState,action) => {
  newState.searchData = action.data
  return newState;
}

// 
const getIsAuth = (newState,action) => {
  // console.log(action.bool)
  newState.isAuthority = action.bool;
  return newState;
}

const getSearchSelect = (newState,action) =>{
  newState.searchCondition = {...action.data};
  return newState;
}

const addData = (newState, action) => {

  //  console.log(action.data)
return {
  ...newState,tableData:action.data,
  showModal:false
}
}



// input的數據
 const onInput=(newState,action)=>{
  //  console.log(action.data)
   newState[action.data.type]=action.data.value;
   return newState;
 }


const serachDataa=(newState,action)=>{
  // console.log(action.data);
  newState.budget_allowance_data=action.data.map((v,k) => ({...v,key: k}))
  return newState;
}

const addAuthOk2Td=(newState,action)=>{
  newState.budget_allowance_data=action.data;
  newState.showModal2 = false;
  return newState;
}
// saveAuthSecond

// budget_allowance_data
// 上傳
const saveUpLoadFile = (newState,action)=>{
  newState.upLoad =action.file;
  newState.showBtn= true;
  return newState;
}
// 上傳確定按鈕
 const showBtn = (newState,action)=>{
   newState.showBtn =action.bool;
   return newState;
 }



export default (state = defaultState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {


    case actionTypes.GET_PAGE_DATA_SECOND:
        return getPageDataSceondb(newState,action);

    case actionTypes.GET_PAGE_DATATD:
      return getPageDataTd(newState, action);
      // 上傳
    case actionTypes.SAVEUPLOAD_FILE:
        return saveUpLoadFile(newState,action);
    case actionTypes.SHOW_BTN:
        return showBtn(newState,action);
    //AddData
    // case actionTypes.GET_PAGE_DATA_SECOND:
    //   return getPageDataSecond(newState, action);
    //

    // case actionTypes.GET_DATAB:
    //   return getDatab(newState, action);

    //AddData
    case actionTypes.GET_PAGE_DATAA:
      return getPagesDataa(newState, action);

    case actionTypes.SEARCH_SELECT:
      return getSearchSelect(newState, action);

    case actionTypes.SAVE_AUTH:
      return saveAuth(newState, action);

    case actionTypes.SAVE_AUTH_SECOND:
      return saveAuthSecond(newState,action)

    case actionTypes.SHOW_MODAL:
      return showModal(newState, action);

    case actionTypes.SHOW_MODAL2:
      return showModal2(newState, action);

    case actionTypes.HIDE_MODAL:
      return hideModal(newState, action);

    case actionTypes.GET_NAME:
      return getName(newState, action);

    case actionTypes.SEARCH_RESULT:
      return getSearchData(newState, action);

    case actionTypes.IS_AUTH:
      return getIsAuth(newState, action);

    case actionTypes.ADD_DATA:
      return addData(newState, action);

    case actionTypes.ONINPUT:
      return onInput(newState,action);
    case                   actionTypes.BUDGET_ALLOWANCE_SEARCH:
      return serachDataa(newState,action)
      
    case actionTypes.ADDAUTHOK2_TD:
      return addAuthOk2Td(newState,action)
    default:
      break;
  }
  return newState;
  
}