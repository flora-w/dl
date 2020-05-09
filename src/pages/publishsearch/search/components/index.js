import React,{Component} from 'react';
import { connect } from 'react-redux';
// import    '../index.less';
import  NoAuthority from '../../../../commonPages/noAuthority';
import { Select, Input, Button,Card,Table,Modal,Form } from "antd";
import { actionCreators } from "../store";
import { formatDate } from "../../../../utils";
// import NewTable from './newCardTable';
const confirm = Modal.confirm;
const  Option  = Select.Option;
const { TextArea } = Input;
// const { data }= this.props;


const authModalPageData = [
  // {
  //   title: '#',
  //   dataIndex: 'index[index]',
  //   align:"center"
  // }, 
  {
    title: '計薪周薪',
    dataIndex: 'MoneyDate',
    align:"center"
  }, {
    title: '部門代碼',
    dataIndex: 'DeptCode',
    align:"center"
  }, {
    title: '部門名稱',
    dataIndex:'Dept',
    align:"center"
  }, {
    title: '員工工號',
    dataIndex: 'EmpNo',
    align:"center",
  }, {
    title: '員工姓名',
    dataIndex: 'ChName',
    align:"center",
  },{
    title: '職務代碼',
    align:"center",
    dataIndex: 'JobCode',
  }, {
    title: '津貼預算',
    dataIndex: 'BudgetBound',
    align:"center",
  }, {
    title: '預算上限',
    dataIndex: 'UpperBouns',
    align:"center",
  }, {
    title: '評核否',
    dataIndex: 'Status',
    align:"center",
  },
]

class DownTable1 extends Component {
  constructor(props) {
    super(props);
    this.state = {}
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
    console.log(value)
 }

  componentDidMount(){
    this.props.getPageData();
  } 
  render(){
  let columns= this.state.columns;
  let data = this.state.data; 
  const {
    baseInfo,
    publishSearch,
    jxzq,
    tableData,
    empNoPerson,
    moneyDate,
    hireDate,
    onInput,
    downTableData} =this.props;
  const { dept, areaData,
     deptSelectData 
    } = baseInfo; 
    // console.log(empNoPerson)//----
    return(
      <Card>
        {!this.props.isAuthority &&
        <NoAuthority/>
        }{
          this.props.isAuthority &&
      <React.Fragment>
      <div className="person-info">
        <div 
        style={{margin:10}}
         className="person-info-dept">
          <b>部門:</b>
          <Select
              style={{width:'130px',marginLeft:'35px'}}
              className="area"
              size="small" 
              defaultValue= 'ALL'
              showSearch
              optionFilterProp="chilren"
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onChange= {this.props.personHobbySave.bind(this)}
              filterOption={(input,option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=0
          }
           >
            {
              tableData.map(v=>(
                <Option key={v.key} value={v.Value}>
                  {v.Value}
                </Option>
              ))
            }
          </Select>
        </div>        
           <div
             style={{ margin:10}}
            className="person-info">
             <b>工號:</b>
               <Input 
               style={{width:'130px',marginLeft:'36px'}}
                  className="input"
                  size="small"
                  onChange={(e) => onInput('empNoPersonValue', e.target.value)}
                  // 获取value值
               />
           </div> 
        <div
        style={{ margin:10}}
        > 
        <b>計薪週期:</b>
             <Input 
             style={{width:130,marginLeft:10}}
              className="input" 
              size="small"
              onChange={(e) => onInput('moneyDateValue', e.target.value)}
              // 
            
              />
          </div>
          {/*  */}
          <div   style={{ margin:10}}> 
        <b>入职截止:</b>
             <Input 
             style={{width:130,marginLeft:10}}
              className="input" 
              size="small"
              onChange={(e) => onInput('hireDate', e.target.value)}
              // 
              />
          </div>
          {/*  */}
        <div className="submit-btn">
          <b><Button
            style={{backgroundColor:'#1890ff',color:'#fff',marginLeft:'45%',marginBottom:'10px'}}
           onClick={() => publishSearch(deptSelectData)}>查询</Button></b>
        </div>
      </div>   
      
      <Table
      columns={authModalPageData} 
      dataSource={downTableData}  
      pagination={{hideOnSinglePage: true}}    
      /> 
        </React.Fragment>
      }
       </Card>
    )
}
componentWillUnmount() {
  this.props.changeAuth();
}
}
const mapStateToProps = ( state ) => {
  const { baseInfo, deptSelectData ,isAuthority ,tableData,jxzq,tableDataPublish,downTableData } = state.publishingSearchReducer;
  return{baseInfo, deptSelectData,isAuthority ,tableData,jxzq,tableDataPublish,downTableData}
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    getPageData(){
      dispatch(actionCreators.getPageData());
    },
    // ----
    onInput(type, value){
      dispatch(actionCreators.onInput({type, value}))
    },
// -------
    publishSearch(data){
      dispatch(actionCreators.publishSearch(data))
    },
    personHobbySave(data){
      dispatch(actionCreators.personHobbySave(data));
    },
    changeAuth(){
      dispatch(actionCreators.isAuthority(false));
    }
  }
}
export default connect( mapStateToProps, mapDispatchToProps )( DownTable1 )