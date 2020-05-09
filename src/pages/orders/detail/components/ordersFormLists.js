import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Tag,Button } from "antd";
import { actionCreators } from "../store";
import NoAuthority from '../../../../commonPages/noAuthority/loadable';
// 
class OrdersFormLists extends Component {
  componentDidMount(){
    this.props.getPageData();   
  }
  render(){
    const columns = [
     {
      title: '工號',
      dataIndex: 'PartyEmpNo',
      align:"center",
      width:45,
    }, 
    {
      title: '姓名',
      dataIndex: 'PartyName',
      align:"center",
      width:30,
    }, {
      title: '金額',
      dataIndex: 'PPMoney',
      align:"center",
      width:30,
    }, {
      title: '懲罰原因',
      dataIndex: 'ApplyReason',
      align:"center",
      width:150,
    }, {
      title: '類別',
      dataIndex: 'ApplyPPContent',
      align:"center",
      type:"",
      width:30,
    },{
      title: '事件發生日期',
      dataIndex: 'ApplyDate',
      align:"center",
      width:40,
      // render: text => <Tag color="blue">{text}</Tag>
    },{
      title: '公告日期',
      dataIndex: 'AnnounceDate',
      align:"center",
      // fixed: 'right',
      width: 50,
      // render: text => <Tag color="blue">{text}</Tag>
    }]
     
    const { 
      signFormListData,
      isAuthority,
      synchronous }
       = this.props;
    return(
      <React.Fragment>
     {this.props.isAuthority? 
    
      <div>
        <Button 
              style={{margin: '20px',height:'26px'}}
              className="button" 
              type="primary" 
              size="small"
              onClick={()=>synchronous
                 ()}
              >
                同步當月懲罰
             </Button>
      <Table 
      columns={columns}
      dataSource={signFormListData}
      pagination={{hideOnSinglePage: true}}
      bordered={true} 
      rowKey={'formIdm'}
      size="middle"
      scroll={{ x: 1100 }}
      />
      </div>
      :<NoAuthority/>
    }
       
      </React.Fragment>
    )
  }
  // 
componentWillMount(){
  this.props.changeAuth();
  // 
}
}
const mapStateToProps = ( state ) => {
  const { signFormListData,isAuthority } = state.ordersReducer.detailReducer;
  // console.log( state.ordersReducer.detailReducer);
  return{
    signFormListData,
    isAuthority
  }
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    getPageData(id){
      dispatch(actionCreators.getPageData(id))
    },
    changeAuth(){
      dispatch(actionCreators.isAuthority(false))
    },
    synchronous(){
      dispatch(actionCreators.synchronous())
    },
  }
}
export default connect( mapStateToProps, mapDispatchToProps )( OrdersFormLists )