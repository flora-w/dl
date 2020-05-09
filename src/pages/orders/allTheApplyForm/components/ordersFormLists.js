import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Tag,Button,Form,Input,Popconfirm,InputNumber } from "antd";
import { actionCreators } from "../store";
import NoAuthority from '../../../../commonPages/noAuthority/loadable';
import Upload from '../../../../components/upload/index';
import ModifyTable from "../../../../components/table/modifyTable";

// hostpath

class OrdersFormLists extends Component {
  
  componentDidMount(){
    this.props.getPageData();
  }
  onChange(value) {
    
  }
  state = {
    hostpath: process.env.NODE_ENV === 'development' ? '10.42.21.51:108' : window.location.host
}
  // console.log(hrefData)
  render(){
   
    const columns = [{
        title: '計薪週期',
        dataIndex: 'MoneyDate',
        align:"center",
        // editable: true,
        // style:{backgroundColor:'#3176c9',
        //   color:'white'}
    }, {
      title: '部門代碼',
      dataIndex: 'Dept',
      align:"center",
      render:(text,record)=><a onClick={()=>deptCenter(record)}> {text}</a>,

    }, {
      title: '部門名稱',
      dataIndex: 'DeptName',
      align:"center"
    }, {
      title: '部門主管',
      dataIndex: 'Supervisor',
      align:"center"
    }, 
    {
      title: '狀態',
      dataIndex: 'status',
      align:"center", 
      render:(text,record)=><a  onClick={()=>deptCenter(record)}>待審核 </a>
      // text表示本项内容对应的value，
      // record的值是一个object，
      // 里面存放了这一行数据的内容，
      // index表示当行索引
    }]
    const columnsWeb =[{
    //   title: '#',
    //   dataIndex: 'index',
    //   align:"center",
    // },{
      title: '計薪週期',
      dataIndex: 'MoneyDate',
      align:"center",
    },{
      title: '员工工号',
      dataIndex: 'EmpNo',
      align:"center",
      fixed: 'left',
    },{
      title: '姓名',
      dataIndex: 'ChName',
      align:"center",
      fixed: 'left',
    },
    {
      title: '增加金额(元)',
      dataIndex: 'AddMoney',
      align:"center",
      edit: true,
      editType: 'INPUT',

     
      // render:(text,record)=><a>{text}</a>
    },{
      title: '减少金额(元)',
      dataIndex: 'ReduceMoney',
      align:"center",
      // 
      edit: true,
      editType: 'INPUT',


      //  render:(text,record)=><a>{text}</a>
    }, {
      title: '绩效奖金预算(元)',
      dataIndex: 'BudgetBound',
      align:"center",
    },
    {
      title: '绩效奖金上限(元)',
      dataIndex: 'UpperBouns',
      align:"center",
    },
    {
      title: '部门代码',
      dataIndex: 'DeptCode',
      align:"center",
    },{
      title: '部级代码',
      dataIndex: 'Dept',
      align:"center",
    },{
      title: '职务',
      dataIndex: 'JobName',
      align:"center",
    },{
      title: '原始入职日',
      dataIndex: 'HireDate',
      align:"center",
    },{
      title: '本月在职天数',
      dataIndex: 'WorkDays',
      align:"center",
    },{
      title: '离职日期',
      dataIndex: 'ResignDate',
      align:"center",
    },
    
  
  ]
    const columnsWebT =[{
      //   title: '#',
      //   dataIndex: 'index',
      //   align:"center",
      // },{
        title: '計薪週期',
        dataIndex: 'MoneyDate',
        align:"center",
      },{
        title: '员工工号',
        dataIndex: 'EmpNo',
        align:"center",
       
      },{
        title: '姓名',
        dataIndex: 'ChName',
        align:"center",
       
      },{
        title: '部门代码',
        dataIndex: 'DeptCode',
        align:"center",
      },{
        title: '部级代码',
        dataIndex: 'Dept',
        align:"center",
      },{
        title: '职务',
        dataIndex: 'JobName',
        align:"center",
      },{
        title: '原始入职日',
        dataIndex: 'HireDate',
        align:"center",
      },{
        title: '本月在职天数',
        dataIndex: 'WorkDays',
        align:"center",
      },{
        title: '离职日期',
        dataIndex: 'ResignDate',
        align:"center",
      },{
        title: '绩效奖金预算(元)',
        dataIndex: 'BudgetBound',
        align:"center",
      },{
        title: '增加金额(元)',
        dataIndex: 'AddMoney',
        align:"center",
        edit: true,
        editType: 'INPUT',
        // render:(text,record)=><a>{text}</a>
      },{
        title: '减少金额(元)',
        dataIndex: 'ReduceMoney',
        align:"center",
        // 
        edit: true,
        editType: 'INPUT',
        //  render:(text,record)=><a>{text}</a>
      },{
        title: '绩效奖金上限(元)',
        dataIndex: 'UpperBouns',
        align:"center",
      }]
// state
    const { 
      signTableData,
      isShowOr,
      isAuthority,
      downLoad,
      upLoad,
      isHideTable,
      deptCenterTdData,
      submitButton,
      handleUpload,
      saveAuth,
      deptCenter,//部門render  deptCenter
      file,
      downLoadCunData,
      showBtn,
      hrefData
    } = this.props;
  
    return(
      <React.Fragment>
      {   
        this.props.isAuthority
      ?<div className="first">
        {this.props.isHideTable
        ?<div className="second">
      {/* ---- */}
      <div>
      {/* ---- */}
      <Table 
      columns={columns}
      dataSource={signTableData}
      pagination={{hideOnSinglePage:true}}
      bordered={true} 
      size="middle"
      /> </div>
      {/* --- 管理員和主管權限的不同顯示 --- */}
        { this.props.isShowOr
        ?<div className="first1"> 
        {/* <Button 
            style={{margin:'15px'}}
            type="primary"
            // -----&&&&
            // onClick={()=>downLoad()}
            // window.location.href = yourFilePath
            > */}
            <a 
             style={{margin:'15px'}}
             className="ant-btn ant-btn-primary" 
             type="button"
            href={`http://${this.state.hostpath}/Audit/WaitSignPage_DownLoad?User_ID=${hrefData.User_ID}&MoneyDate=${hrefData.MoneyDate}`} 
            >
            點此下載
            </a>

            {/* </Button>  */}  
              {/*---------- */}
            <Upload
              success={handleUpload} 
              path='/Audit/WaitSignPage_UpLoad'              
              />
              {
               this.props.showBtn
               ?<Button 
                onClick= {() => upLoad(file)}
                type='primary'
                > 确定 </Button>
                :null
              }
            <p>注：主管可將自己名下所有的信息下載成excel,本機完成維護之後上傳至系統 </p>
             </div>
             :null
             }
            </div>
           :<div>
          { this.props.isShowOr
           ?<ModifyTable
            columns={columnsWeb}
            dataSource={deptCenterTdData}
            pagination={{hideOnSinglePage: true}}
            bordered={true} 
            saveSuccess={saveAuth}
            size="middle"
            scroll={{ x: 1800 }}
           />
           :<Table
           columns={columnsWebT}
           dataSource={deptCenterTdData}
           pagination={{hideOnSinglePage: true}}
           bordered={true} 
           size="middle"
           scroll={{ x: 1500 }}
           />}
           {/* --- 判斷主管還是管理員權限--- */}
          {
            this.props.isShowOr
            ?<Button 
              type="primary"
              style={{margin:'15px',marginLeft:'45%'}}
              onClick={()=>submitButton()}
              >
                提交
               </Button>
               :null
               }
               {/* ------ */}
           <p 
           style={{marginBottom:'5px'}}
           >注：主管可單筆維護增加/減少金額，按部門評核完成之後送出</p>
           </div>}
            {/*  */}
          </div>      
          :<NoAuthority/>
          }
      {/* ------------- */}
        </React.Fragment>
    )
  }
// --------
// {this.props.isAuthority
//   // 頁面權限
//   ?<div>
//         {this.props.isHideTable
//           // 點擊隱藏原組件，顯示table組件
//         ?<div>
//           {this.props.isShowOr
//               // 管理員或者主管權限
            // ?<div>//主管可見
                  // </div>
//           :null}
//           </div>
//           :<div>
//         {this.props.isShowOr
//           // 管理員或者主管權限,
//           // 只有管理员才可以修改增加减少金额 
//         ?<ModifyTable/>//主管看到的可編輯table 
//         :<Table/> //管理員看到的只讀table}
//         </div>
//       }
//   </div>
//   :<NoAuthority/>
//   }
// -----------
  componentWillUnmount() {
    this.props.changeAuth();//頁面權限
    this.props.changeShow();//管理員與主管權限
    this.props.changeHideTable();//點擊顯示隱藏的table
  }
}
const mapStateToProps = ( state ) => {
  const { 
    signTableData,
    isAuthority,
    isShowOr,
    webtabledata,
    isHideTable,
    deptCenterTdData,
    deptCenter,//部門render函數
    // tableWeb
    file,
    downLoadCunData,
    showBtn,
    hrefData
   } = state.ordersReducer.allTheApplyFormReducer;
  //  console.log(state.ordersReducer.allTheApplyFormReducer)//signTableData
  return{
    signTableData,
    isAuthority,
    isShowOr,
    isHideTable,
    deptCenterTdData,
    deptCenter,//部門render函數
    // tableWeb
    file,
    downLoadCunData,
    showBtn,
    hrefData
  }
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    getPageData(){
      dispatch(actionCreators.getPageData())
    },
    changeAuth(){
      dispatch(actionCreators.isAuthority(false));
      dispatch(actionCreators.showBtn(false));
    },
    changeShow(){
      dispatch(actionCreators.isShowOr(false));
    },
    changeHideTable(){
      dispatch(actionCreators.isHideTable(true));
    },
    // 批量下載
    downLoad(){
      dispatch(actionCreators.downLoad());
    },
    // 點擊提交
    submitButton(){
      dispatch(actionCreators.submitButton());
    },
    //部門render函數 以獲取table數據
    deptCenter(record){
      // console.log(record)
      dispatch(actionCreators.deptCenter(record));
    },
    saveAuth(row, table){
          // console.log(row,table)
      dispatch(actionCreators.saveAuth(row, table));
    },
    // 批量上傳
    handleUpload(file) {
      dispatch(actionCreators.saveUpLoadFile(file));
    },
    upLoad(file){
      dispatch(actionCreators.upLoad(file));
    },
  }
}
export default connect( mapStateToProps, mapDispatchToProps )( OrdersFormLists )