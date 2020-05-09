import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import  NoAuthority from '../../../../commonPages/noAuthority';
import { Table, Tag,Input,Select,Button,Modal,Form} from "antd";
import { actionCreators } from "../store";
import { onInput } from '../../../publishsearch/search/store/actionCreators';

const  Option  = Select.Option;
const { TextArea } = Input;

class OrdersFormLists extends Component {
  componentDidMount(){
    //通过id不同判断要请求的页面数据，是所有的單據还是簽核中單據的
    this.props.getPageData();   
  }
  onChange = (value)=>{
    // console.log(value)
  }
   onBlur =() =>{
    // console.log('blur');
  }
   onFocus=()=> {
    // console.log('focus');
  }
   handleChange=(value)=> {
    // console.log(e.target.value);
    // console.log(value)
 }
 state = {
  hostpath: process.env.NODE_ENV === 'development' ? '10.42.21.51:108' : window.location.host
}

  render(){
      // 
      // --
    const columns = [{
          title: '計薪週期',
          dataIndex: 'MoneyDate',
          align:"center",
          // width:50,
    }, {
      title: '員工工號'  ,
      dataIndex: 'EmpNo',
      align:"center"
    }, {
      title:   '姓名' ,
      dataIndex: 'ChName',
      align:"center"
    }, {
      title:   '部門代碼' ,
      dataIndex: 'DeptCode',
      align:"center"
    }, {
      title: '部級代碼'   ,
      dataIndex: 'Dept',
      align:"center"
    }, {
      title:  '職務' ,
      dataIndex: 'JobName',
      align:"center"
    },{
      title:  '原始入職日'   ,
      dataIndex: 'HireDate',
      align:"center"
    },{
        title:  '本月在職天數' ,
        dataIndex: 'WorkDays',
        align:"center"   
      },{
        title:  '離職日期'   ,
        dataIndex: 'ResignDate',
        align:"center"   
      },{
        title:  '績效獎金預算（元）',
        dataIndex: 'BudgetBound',
        align:"center"   
      },{
        title:  '增加金額（元）',
        dataIndex: 'AddMoney',
        align:"center" ,
        editable: true, 
        // style:{backgroundColor:'#00b050'}

        // ------------
        
        // ---------
      },{
        title:'減少金額（元）'   ,
        dataIndex: 'ReduceMoney',
        align:"center",
        editable: true,
        // ---------


        // ---------
      },{
        title: '異動後金額（元）'  ,
        dataIndex: 'ChangeMoney',
        align:"center"   
      },{
        title: '績效獎金上限值'  ,
        dataIndex: 'UpperBouns',
        align:"center"
      },{
        title:  '懲罰扣款',
        dataIndex: 'DedectMoney',
        align:"center"
      },{
          title: '最終津貼金額',
          dataIndex: 'FinalMoney',
          align:"center" ,  
      // render: text => <Tag color="blue">{text}</Tag>
    }]

    const { signFormListData,
            isAuthority,
            tableData,
            summarySearch,
            onInput,
            summarydownload,
            hrefData
          } = this.props;
    return(

      <React.Fragment>
        {this.props.isAuthority
       ?<div>  
      {/* ------------------ */}
      <div style={{margin:10}}>    
        <b >部門:</b>
          <Select  className="area" size="small" 
          style={{width:130,marginLeft:'38px'}}
          size="small"
          defaultValue='ALL'
          showSearch
          optionFilterProp="children"
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          // -------
          onChange= {this.props.selectSearch.bind(this)
          }
          filterOption={(input,option)=>
          option.props.children.toLowerCase().indexOf(input.toLowerCase())>=0
          }  >
          {
          tableData.map(v=>(
          <Option key={v.key} value={v.Value}>
          {v.Value}
          </Option>
          ))
          }
          </Select>
            </div>
            {/* -------------- */}
        <div style={{margin:10}}>    
        <b >工號:</b>
        <Input style={{width:130,marginLeft:'38px'}}
        className="input" 
        size="small"
        // onChange={this.handleCardChange}
        onChange={(e) =>onInput('empNoValue',e.target.value)}
         />
        </div>
        {/* --------------------- */}
        <div style={{margin:10}}>    
        <b >計薪週期:</b>
        <Input style={{width:130,margin:10}}
        className="input" 
        size="small"
        onChange={(e) =>onInput('moneyDateValue',e.target.value)}
        />
            </div>
            {/* ------------------ */}
            <Button 
            style={{margin:'15px'}}
            type="primary"
            onClick={()=>summarySearch()}
            >
            查询
            </Button>
            {/* ---------- */}
            <Button 
            style={{margin:'15px'}}
            type="primary"
            // onClick ={()=>summarydownload()}
            >
            <a href={`http://${this.state.hostpath}/Info/AllowancePage_download?User_ID=${hrefData.User_ID}&MoneyDate=${hrefData.MoneyDate}`} >
           下载明细
           </a>
            </Button>

      




        {/* ----------------------- */}
      <Table 
      columns={columns}
      dataSource={signFormListData}
      pagination={{hideOnSinglePage: true}}
      bordered={true} 
      rowKey={'formIda'}
      size="middle"
      scroll={{ x: 1800 }}
      />

      {/* --- */}

        </div>
        :<NoAuthority/>
        }
      </React.Fragment>

    )
  }
  componentWillMount(){
    this.props.changeAuth();
  }

}

  
const mapStateToProps = ( state ) => {
  const { signFormListData,
    isAuthority,
    tableData ,
    onInput,
    hrefData
    }  = state.ordersReducer.summaryReducer;
  return{
    signFormListData,
    isAuthority,
    tableData,
    onInput,
    hrefData
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
    selectSearch(data){
      dispatch(actionCreators.selectSearch(data))
    },
    summarySearch(data){
      dispatch(actionCreators.summarySearch(data))
    },

    summarydownload(){
      dispatch(actionCreators.summarydownload())
    },
      // 
      onInput(type, value){
        dispatch(actionCreators.onInput({type, value}))
      },
  }
}
export default connect( mapStateToProps, mapDispatchToProps )( OrdersFormLists )