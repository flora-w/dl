import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Tag, Input,Card ,Button,Popconfirm } from "antd";
import { actionCreators } from "../store";
import { onInput } from '../../../publishsearch/search/store/actionCreators';
import  NoAuthority from '../../../../commonPages/noAuthority';
import index from '../../../adminMaintain/authorityMaintain';

// 
class OrdersFormLists extends Component {
      componentDidMount(){
      this.props.getPageData();   
  }
  onChange = (value)=>{
  }
  render(){
      const columns = [{
      title: '#',
      dataIndex: 'index',
      align:"center",
    }, {
      title: '工號',
      dataIndex: 'EmpNo',
      align:"center"
    }, {
      title: '姓名',
      dataIndex: 'ChName',
      align:"center"
    }, {
      title: '離職日期',
      dataIndex: 'ResignDate',
      align:"center"
    }, {
      title: '處罰金額',
      dataIndex: 'AllMoney',
      align:"center"
    }, {
      title: '已扣金額',
      dataIndex: 'DeleMoney',
      align:"center"
    },{
      title: '剩餘處罰扣款',
      dataIndex: 'ResidueMoney',
      align:"center",
      // render: text => <Tag color="blue">{text}</Tag>
    },{
      title: '更新日期',
      dataIndex: 'TransTime',
      align:"center",
    },{
      title: '處理',
      dataIndex: 'deal',
      align:"center",
      // render: text => <Tag color="blue">{text}</Tag>
      render: (text, record,index) =>
      // this.state.dataSource.length >= 1 ?( 
      <a onClick={()=>residueDelete(index)
      }
      >Delete</a>
      //  ):null,
    },
  ]
    //  
     const { signFormData,
            isAuthority,
            surplusSearch,
            onInput,
            residueDelete
          } = this.props;
     return(
          <React.Fragment>  
          {this.props.isAuthority
          ?  
          <div>  
        <div style={{margin:10}}>    
        <b>查詢信息:</b>
        <Input style={{width:130,margin:10}}
        className="input" 
        size="small"
        onChange={(e) =>onInput('empNoValue',e.target.value)}
         />
        <Button style={{marginLeft:'10px'}}
        className="button" 
        type="primary" 
        size="small"
        onClick ={()=>surplusSearch()}
        >
        查詢
        </Button>
      </div>
      <Table
      columns={columns}
      dataSource={signFormData}
      pagination={{hideOnSinglePage:true}}
      bordered={true} 
      rowKey={'formId'}
      size="middle"
      />
      </div>
      :<NoAuthority/>
          }
      </React.Fragment>
    )
  }
}
const mapStateToProps = ( state ) => {
  const { signFormData,isAuthority } = state.ordersReducer.surplusReducer;
  return{
    signFormData,
    isAuthority,
  }
}
const mapDispatchToProps = ( dispatch ) =>{
  return{
    getPageData(id){
      dispatch(actionCreators.getPageData(id))
    },
    changeAuth(){
      dispatch(actionCreators.isAuthority(false))
    },
    surplusSearch(data){
      dispatch(actionCreators.surplusSearch(data))
  
    },
    onInput(type, value){
      console.log(onInput(type,value))
      dispatch(actionCreators.onInput({type, value}))
    },
    residueDelete(data){
      dispatch(actionCreators.residueDelete(data))
    }
  }
}
export default connect( mapStateToProps, mapDispatchToProps )( OrdersFormLists )