// /**
//  * 登陆
//  */
// export const LOGIN = '/Login/UserLogin'; //员工登陆
// export const LOGIN_ADMIN = '/Login/DontLogin'; //员工登陆
// // export const LOGIN = '/api/login/UserLogin.json'; //员工登陆
// export const LOGIN_123 = '/Login/DontLogin'; //

// /**ALL_ORDERS_LIST
//  * 基本資料
//  */
// export const BUDGET_ALLOWANCE_SEARCH = '/Maintain/Search';
// export const BUDGET_ALLOWANCE_AUTH_MONEY = '/Maintain/Auth_Money' ;
// export const SYSTEM_ADMIN_AUTHADD = '/Maintain/authadd';
// export const SYSTEM_ADMIN_AUTHEDIT = '/Maintain/authedit';
// export const BUDGET_ALLOWANCE_AUTH = '/Maintain/Auth';
// export const BUDGET_ALLOWANCE_ALLOWANCE_ADD='/Maintain/AlloWance_ADD';
// // 津貼名冊
// export const PUBLISHING_Info_Page='/Info/Info_Page';





 
//  /**
//   * 机票订购
//   */
//  /////普通机票申请
//  export const GENERAL_APPLY_PAGE_DATA = '/apply/Info_F001'; //获取页面数据
//  export const GENERAL_APPLY_SUBMIT = '/apply/F001_Approve'; //提交表单数据
//  /////助理机票申请
//  export const ASSIT_APPLY_PAGE_DATA = '/apply/Info_F002'; //获取页面数据
//  export const ASSIT_ONE_BY_ONE_ADD = '/Apply/Info_F002_Once'; //逐笔新增
//  export const ASSIT_BATH = '/Apply/Info_F002_Batch'; //批量上传
//  export const ASSIT_DRAFT_DELETE = '/Apply/Info_F002_DraftDelete'; //草稿刪除
//  export const ASSIT_SUBMIT = '/apply/F002_Approve'; //助理机票提交
//  export const EMPNO_OUTNAME = '/apply/info_Person';//带出姓名
//  export const DELETE_DRAFT = '/Apply/Info_F002_DraftDelete';

// /**SING_ORDERS_LIST
//  * 我的訂單
//  */
// export const ALL_ORDERS_LIST = '/MyForm/Index'; //获取所有訂單列表
// export const ALL_ORDERS_LIST = '/api/MyForm/Index.json'; //获取所有訂單列表
// export const SING_ORDERS_LIST = '/MyForm/OngoingFormList'; //获取簽核中訂單列表
// export const SING_ORDERS_LIST = '/api/MyForm/OngoingForm.json'; //获取簽核中訂單列表
// export const SIGN_FORMDETAIL = '/Sign/FormDetail'; //获取所有訂單列表
// // export const SIGN_FORMDETAIL = '/api/Sign/FormDetail.json'; //获取所有訂單列表
// export const WAIT_CHOOSE_LIST = '/MyForm/WaitChooseList'; //获取待確認出票單據
// // export const WAIT_CHOOSE_LIST = '/api/MyForm/WaitChooseList.json'; //获取待確認出票單據
// export const WAIT_CHOOSE_PAGE = '/MyForm/WaitChoosePage'; //获取待確認出票單據
// // export const WAIT_CHOOSE_PAGE = '/api/MyForm/WaitChoosePage.json'; //获取待確認出票單據
// export const CONFIRM_RCLIST = 'MyForm/Confirm_RCList'; //获取待確認出票單據
// // export const CONFIRM_RCLIST = '/api/MyForm/Confirm_RCList.json'; //获取待確認出票單據
// export const ORDERS_TICKET_LIST = '/MyForm/TicketList'; //获取已票單據
// // export const ORDERS_TICKET_LIST = '/api/MyForm/TicketList.json'; //获取已出票單據
// // export const ORDERS_TICKET_DETAIL = '/api/MyForm/TicketDetail.json'; //获取已出票單據
// export const ORDERS_TICKET_DETAIL = '/MyForm/TicketDetail'; //获取已票單據明细
// export const ORDERS_RC_TICKET_DETAIL = '/MyForm/RCTicketDetail'; //退改簽已出票明細
// export const ORDERS_CONFIRM_RCDETAIL = '/MyForm/Confirm_RCDetail'; //退改簽待確認單據內容
// export const ORDERS_CONFIRM_RCDETAIL_REVIEW = '/MyForm/Confirm_RCDetail_Review'; //退改簽待確認查看
// export const ORDERS_CONFIRM_SUBMIT = '/MyForm/Confirm_RCApply_Submit'; //退改簽待確認提交
// // export const ORDERS_RCAPPLY = '/api/MyForm/RCApply.json'; //退改簽頁面數據的顯示
// export const ORDERS_RCAPPLY = '/MyForm/RCApply'; //退改簽頁面數據的顯示
// // export const ORDERS_RCAPPLY_SUBMIT = '/api/MyForm/RCApply_Submit.json'; //退改簽送出數據
// export const ORDERS_RCAPPLY_SUBMIT = '/MyForm/RCApply_Submit'; //退改簽送出數據
// export const WAITCHOOSE_SUBMIT = '/MyForm/WaitChoose_Submint'; //退改簽送出數據



// /**
//  * 签核
//  */
//  /////待签核
// export const WAIT_FOR_SIGN_LIST = '/Sign/Index'; //获取未签核列表
// export const WAIT_FOR_SIGN_DETAIL = '/Sign/FormDetail'; //获取未签核明细
// export const WAIT_FOR_SIGN_SUBMIT = '/Sign/Sign_Submit '; //提交签核
// /////已签核
// export const HAD_SIGN_LIST = '/Sign/SignedList'; //获取已签核列表
// export const HAD_SIGN_DETAIL = '/Sign/FormDetail'; //获取已签核明细

// /**
//  * 个人信息维护
//  */
//       /////个人资料
// export const PERSON = '/maintain/UserInfo'; //个人信息获取
// export const SAVE_HOBBY = '/maintain/UserInfo_Hobby'; //保存个人喜好
// export const ADD_VIP_CARD = '/maintain/UserInfo_VIPCard_Add'; //新增会员卡
// export const DELETE_VIP_CARD = '/maintain/UserInfo_VIPCard_Delete'; //删除会员卡
// export const ADD_CARD = '/maintain/UserInfo_CertInfo_Add'; //新增证件信息
// export const DELETE_CARD = '/maintain/UserInfo_CertInfo_Delete'; //删除证件信息
//        /////眷属资料
// export const FAMILY = '/maintain/RelativeInfo'; //眷属信息获取
// export const ADD_FAMILY = '/maintain/RelativeInfo_Add'; //保存眷属信息
// export const DELETE_FAMILY = '/maintain/RelativeInfo_Delete'; //删除眷属信息
//       /////常用联系人资料
//  export const CONTACTS = '/maintain/Linkman'; //常用联系人信息获取
//  export const ADD_CONTACTS = '/maintain/Linkman_Add'; //新增常用联系人信息
//  export const UPDATE_CONTACTS = '/maintain/Linkman_Update'; //更新眷属信息
//  export const DELETE_CONTACTS = '/maintain/Linkman_Delete'; //删除眷属信息


// /**
//  * 后台维护
//  */
// export const MAINTAIN_AUTH = '/Maintain/Auth'; //點擊權限維護
// export const MAINTAIN_AUTH_EDIT = '/Maintain/authedit'; //.編輯確定
// export const MAINTAIN_OUT_NAME = '/Maintain/outname'; //.新增帶出姓名
// export const MAINTAIN_AUTH_ADD = '/Maintain/authadd'; //.新增確定
// export const ORDER_SEARCH_AUTH = '/Maintain/TravelDeatil_Query'; //單據查詢權限獲取;
// export const ORDER_SEARCH = '/Maintain/TravelDeatil_List'; //单据搜索
// export const ORDER_DETAIL = '/Maintain/TravelDeatil'; //具體單據的内容
// export const TRAVEL_AUTHORITY = '/maintain/travelauth';
// export const TRAVEL_AUTH_EDIT = '/maintain/traveledit';
// export const TRAVEL_AUTH_ADD = '/maintain/traveladd';
// export const MAINTAIN_KM = '/maintain/kmauth';
// export const MAINTAIN_KM_UPLOAD = '/maintain/kmadd';
// export const AIRLINE_AUTH = '/maintain/companyauth';
// export const AIRLINE_ADD = '/maintain/companyadd';
// export const AIRLINE_EDIT = '/maintain/companyedit';
// export const FLIGHT_TIME_AUTH = '/maintain/flytimeauth';
// export const FLIGHT_TIME_UPLOAD = '/maintain/flytimeadd';


// ---------------------------------------------------------------
export const LOGIN = '/Login/UserLogin'; //员工登陆
export const LOGIN_ADMIN = '/Login/DontLogin'; //员工登陆
export const LOGIN_123 = '/Login/DontLogin';


export const MAINTAIN_AUTH_EDIT = '/Maintain/authedit'; //.FIRST編輯確定
export const MAINTAIN_ALLOWANCE_EDIT =
'Maintain/AlloWance_Edit';//SECOND編輯確定

/**
 * 基本資料
 */
export const BUDGET_ALLOWANCE_SEARCH = '/Maintain/Search';
export const BUDGET_ALLOWANCE_AUTH_MONEY = '/Maintain/Auth_Money';
export const BUDGET_ALLOWANCE_ALLOWANCE_ADD = '/Maintain/AlloWance_ADD';
export const MAINTAIN_OUT_NAME = '/Maintain/outname'; //.新增帶出姓名
export const MAINTAIN_AUTH = '/Maintain/Auth'; //點擊權限維護

// 權限新增點擊確認
export const BUDGET_ALLOWANCE_ADD=
'Maintain/authadd' 
// 單筆新增
// Maintain/AlloWance_ADD_Once//路由
export const BUDGET_ALLOWANCE_ADDONCE
= 'Maintain/AlloWance_ADD_Once'
// 批量新增
// Maintain/AlloWance_ADD_Batch
export const BUDGET_ALLOWANCE_ADDBATCH
='Maintain/AlloWance_ADD_Batch'

// 津貼名冊
export const PUBLISHING_Info_Page='/Info/Info_Page';
export const PUBLISHING_INfO_REGISTER='Info/Info_Register';
export const PUBLISHING_SEARCH ='Info/Info_Page';
export const PUBLISHING_SENDEMAIL ='Info/SendMailToBoss';
export const  PUBLISHING_SEARCH_PAGE ='Info/InfoPage_Query';
export const PUBLISHING_SEARCH_PAGE_INFO= 'Info/Info_Query';

// 津貼評核
export const ALL_ORDERS_LIST = '/MyForm/Index'; //获取所有訂單列表
// export const ALL_ORDERS_LIST = '/api/MyForm/Index.json'; //获取所有訂單列表
export const SING_ORDERS_LIST = '/MyForm/OngoingFormList'; //获取簽核中訂單列表
// export const SING_ORDERS_LIST = '/api/MyForm/OngoingForm.json'; //获取簽核中訂單列表


// 评核 
// 未審核
export const  ALLOWANCE_ASSESS_SIGN = '/Audit/WaitSignPage';
// 已審核
export const  ALLOWANCE_ASSESS_CLOSED = 'HRControl/SignedPage_Auth'; //closed页面登录权限
// HRControl/SignedPage_Dept
// 點擊部門顯示出對應的部門數據
export  const  ALLOWANCE_ASSESS_DEPT =
'HRControl/SignedPage_Dept';
// HRControl/HR_UpdateDay
// hr確認
export const  ALLOWANCE_ASSESS_UPDATEDAY
='HRControl/HR_UpdateDay';


// Audit/WaitSignPage_DownLoad 
// allowance-assess/sign-download
export const ALLOWANCE_SIGN_DOWNLOAD=
'Audit/WaitSignPage_DownLoad';//页面点击下载  
// Audit/WaitSignPage_WithWB_Dept
export const ALLOWANCE_SIGN_DEPT = 'Audit/WaitSignPage_WithWB_Dept';


//本月抵扣明細表     allowance-assess/deducted-report
export const  ALLOWANCE_ASSESS_DEDUCTED_REPORT ='HRControl/HR_Page';// 登錄權限

export const  DEDUCTED_REPORT_SYNCH='HRControl/HR_Synch';//同步當月獎懲


// 津貼總會     allowance-assess/summary-report
export  const  ALLOWANCE_ASSESS_SUMMARY_REPORT =
'Info/AllowancePage';

export const SUMMARY_REPORT =
'Info/AllowancePage_Query';

export const SUMMARY_REPORT_DOWNLOAD =
'Info/AllowancePage_download';

// WaitSignPage_WithWB_Submit
export const ALLOWANCE_SIGN_SUBMIT =
'Audit/WaitSignPage_WithWB_Submit';

// HRControl/SignedPage_Auth
// HRControl/HR_Page
// HRControl/HR_Synch
// Info/AllowancePage
// Info/AllowancePage_Query

// 剩餘待抵扣  
// allowance-assess/remained-report
 export const  ALLOWANCE_ASSESS_REMAINED_REPORT=
 'HRControl/HR_Residue_Page';

// HRControl/HR_Residue_Query 
// 點擊查詢
export const REMAINED_REPORT_QUERY
 = 'HRControl/HR_Residue_Query';
// 點擊刪除更新--HRControl/HR_Residue_Delete
// remained-report-Delete
export const REMAINED_REPORT_DELETE
= 'HRControl/HR_Residue_Delete'

export const  WAITSIGNPAGE_WITHWB  
= 'Audit/WaitSignPage_WithWB'

export const  WAITSIGNPAGE_UPLOAD
='Audit/WaitSignPage_UpLoad'












