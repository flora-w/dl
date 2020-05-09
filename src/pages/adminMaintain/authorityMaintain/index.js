import React, { Component } from 'react';
import { connect } from "react-redux";
import { Card, Button, Select, Input,  message, Modal  } from "antd";
import { actionCreators } from "../store";
import AuthMaintainTable from "../components/authMaintainTable";
import AddAuth from "../components/addAuth";
 import NoAuthority from '../../../commonPages/noAuthority/index';

class AuthorityMaintain extends Component  {
  state = {
    columns:[
      {title: '工號', dataIndex: 'EmpNo'},
      {title: '姓名', dataIndex: 'ChName'},
      {title: '資料維護權限', dataIndex: 'InfoAdm', edit: true, editType: 'switch'},
      {title: '名冊維護權限', dataIndex: 'CardAdm', edit: true, editType: 'switch'},
      {title: '報表查詢權限', dataIndex: 'SearchAdm', edit: true, editType: 'switch'},
      {title: '是否有效', dataIndex: 'IsValid', edit: true, editType: 'switch'},
    ],
   authModalPageData:[
      {title: '工號', id: 'EmpNo', type: 'input',
       props: {onBlur: this.props.getName.bind(this)}},
      {title: '姓名', id: 'ChName', type: 'input',props: {disabled: true} },
      {title: '資料維護', id: 'InfoAdm', type: 'radio'},
      {title: '名冊維護', id: 'CardAdm', type: 'radio'},
      {title: '報表查詢', id: 'SearchAdm', type: 'radio'},
      {title: '是否有效', id: 'IsValid', type: 'radio'},
    ],
  }
  componentDidMount(){
    this.props.getPageData();
  } 
  render(){
    const { 
      handleShowModalClick, 
      showModal, 
      addAuthOk, 
      handleHideModalClick,
      tableData, 
      saveAuth,
      FirstTable
    } = this.props;
    const { columns,authModalPageData} = this.state;
  
    return (
      <div>
        {
          this.props.isAuthority 
          ? <Card title="權限維護">
              <Button 
              style={{margin: '15px'}}
              type="primary"
              onClick={handleShowModalClick.bind(this)}>
              新增
              </Button>
              {/* 模态框 */}
              <AddAuth
                pageData={authModalPageData}
                showModal={showModal}
                addAuthOk={addAuthOk}
                hideModal={handleHideModalClick}
                name={this.props.name}
                ref="abc"/>
                {/* 下面table */}
              <AuthMaintainTable 
                // rowKey='key'
                tableData={tableData}
                columns={columns}
                saveAuth={saveAuth}
                scroll={{x:850}}/>
            </Card>
          :<NoAuthority/>
        } 
      </div>
    )
  }  

  componentWillUnmount() {
    this.props.changeAuth();
  }

}

const mapStateToProps = (state) => {
  // console.log(state);
  const { tableData,
     showModal ,
     isAuthority ,
     name, 
     FirstTable} = state.adminMaintainReducer;
  //  console.log(state.adminMaintainReducer)//
  return {
    FirstTable,
    tableData, 
    showModal, 
    isAuthority, 
    name
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPageData(){
      dispatch(actionCreators.getPageData())
    },
    saveAuth(row, table){
      dispatch(actionCreators.saveAuth(row, table))
      // console.log(row,table)
    },
    handleShowModalClick(){
      this.refs.abc.resetFields();
      dispatch(actionCreators.showModal())
    },
    handleHideModalClick(){
      dispatch(actionCreators.hideModal());
      dispatch(actionCreators.asyncGetName(''))
    },
    getName(e){
      dispatch(actionCreators.getName(e.target.value))
    },
    addAuthOk(values){
      console.log(values)
      dispatch(actionCreators.addAuthOk1(values))
      // console.log(values)
    },
    changeAuth(){
      dispatch(actionCreators.isAuthority(false))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AuthorityMaintain)