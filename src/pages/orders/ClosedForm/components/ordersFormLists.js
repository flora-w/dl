import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Tag,Button } from "antd";
import { actionCreators } from "../store";
import NoAuthority from '../../../../commonPages/noAuthority/loadable';

class OrdersFormLists extends Component {
  componentDidMount(){
    this.props.getPageData();
       //this.props.id
  }
  state = {
    hostpath: process.env.NODE_ENV === 'development' ? '10.42.21.51:108' : window.location.host
}
  render(){
    const columns = [{
      title: '計薪週期',
      dataIndex: 'MoneyDate',
      align:"center",
    
    }, {
      title: '部門代碼',
      dataIndex: 'Dept',
      align:"center",
      render:(text,record)=><a  
       onClick={()=>statesTable(record)}
       > {text}</a>,

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
      render:(text,record)=><a  
      onClick={()=>statesTable(record)}
      >已審核 </a>,
    }]
    // 签核人web操作页面table
    const columnsWeb =[{
      title: '#',
      dataIndex: 'index',
      align:"center",
    },{
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
    },{
      title: '减少金额(元)',
      dataIndex: 'ReduceMoney',
      align:"center",
    },{
      title: '绩效奖金上限(元)',
      dataIndex: 'UpperBouns',
      align:"center",
    }]

    const { signFormData,
            isAuthority,
            statesTable,
            isHideTable,
            statesTableTdData,
            hrSure,
            isShowBtn
          } = this.props;
    return(
     <React.Fragment>
    {this.props.isAuthority   
      ?<div className="first">
        { this.props.isHideTable  
         ?
         <div className="second">
      <Table 
      columns={columns}
      dataSource={signFormData}
      pagination={{hideOnSinglePage: true}}
      bordered={true} 
      rowKey="formIdq"
      size="middle"
      />
      {
        this.props.isShowBtn
        ?
        <div>
             <Button 
            style={{margin:'15px'}}
            type="primary"
            onClick={()=>hrSure()}
            >
            HR 確認
            </Button>
            {/* ---- */}
            <a 
             style={{margin:'15px'}}
             className="ant-btn ant-btn-primary" 
             type="button"
            href={`http://${this.state.hostpath}/HRControl/HRconfirm_DownLoad?`} 
            >
            點此下載
            </a>
            
          {/* ------ */}
        </div>
            :null
            }
                </div>
                :<Table
            columns={columnsWeb}
            dataSource={statesTableTdData}
            pagination={{hideOnSinglePage: true}}
            bordered={true} 
            rowKey="formWeb"
            size="middle"
            scroll={{ x: 1500 }}
                />
              }
            </div>
            :<NoAuthority/>
                }
     </React.Fragment>
    )
  }
// 
componentWillUnmount() {
  this.props.changeAuth();
  // this.props.changeShow();
  this.props.changeHideTable();//點擊顯示隱藏的table
  this.props.changeisShowBtn();//管理員權限才能看到此按鈕
}
// 
}
  
const mapStateToProps = ( state ) => {
  const { 
    signFormData,
    isAuthority,
    statesTable,
    isHideTable,
    statesTableTdData,
    isShowBtn }
   = state.ordersReducer.closedFormReducer;
// 
  //  console.log(state.ordersReducer.closedFormReducer);
  return{
    signFormData,
    isAuthority,
    statesTable,
    isHideTable,
    statesTableTdData,
    isShowBtn
  }
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    getPageData(id){
      dispatch(actionCreators.getPageData(id));
    },
    changeAuth(){
      dispatch(actionCreators.isAuthority(false));
    },
    // 部門render函數 以獲取table數據
    statesTable(record){
      dispatch(actionCreators.statesTable(record))
    },
    changeHideTable(){
      dispatch(actionCreators.isHideTable(true))
    },
    // HR確認
    hrSure(){
      dispatch(actionCreators.hrSure())
    },
    changeisShowBtn(){
      dispatch(actionCreators.isShowBtn(false))
    }
  }
}
export default connect( mapStateToProps, mapDispatchToProps )( OrdersFormLists )