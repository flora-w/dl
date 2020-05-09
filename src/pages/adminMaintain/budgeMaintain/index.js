import React, { Component } from 'react';
import { connect } from "react-redux";
import { Card, Select, Input, Button, message, Modal,Icon } from "antd";
import { actionCreators } from "../store";
import AuthMaintainTable from "../components/authMaintainTable";
import AddAuth from "../components/addAuth";
import NoAuthority from '../../../commonPages/noAuthority/loadable';
import Upload from '../../../components/upload';
import "./index.less";


const { Option } = Select;
const confirm = Modal.confirm;
class Maintainbudge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: '職務名稱', dataIndex: 'JobName', edit: true, editType: 'SELECT', },
        { title: '職務代碼', dataIndex: 'JobCode', edit: true, editType: 'INPUT' },
        { title: '預算獎金(元)', dataIndex: 'BudgetBound', edit: true, editType: 'INPUT' },
        { title: '獎金上限(元)', dataIndex: 'UpperBouns', edit: true, editType: 'INPUT' },
        { title: '類別', dataIndex: 'Type', edit: true, editType: 'INPUT' },
        {title: '是否有效', dataIndex: 'IsValid', edit: true, editType: 'switch'},
      ],

      authModalPageData: [
        {
          title: '類別', id: 'Type',
          type: 'select',
          props: [{ onBlur: this.props.getName.bind(this) }],
          
        },
        { title: '職務名稱/工號', id: 'JobName', type: 'input' },
        { title: '職務代碼', id: 'JobCode', type: 'input' },
        { title: '預算獎金(元)', id: 'BudgetBound', type: 'input' },
        { title: '獎金上限(元)', id: 'UpperBouns', type: 'input' },
        { title: '是否有效',id: 'IsValid', type: 'radio' },
      ],
      searchBudgedata: [
        {
          companyInfo: {},
          card: ''
        }],
        hostpath: process.env.NODE_ENV === 'development' ? '10.42.21.51:108' : window.location.host
    }
  }
  componentDidMount() {
    this.props.getPageDataSecond();
  }


  //輸入查詢條件 
  handleCardChange = (e) => {
    this.handleCardChange.bind({ card: e.target.value })

  }


  render() {
    const { handleShowModalClick,
      isAuthority,
      showModal2,
      addAuthOk,
      handleHideModalClick,
      budget_allowance_data,
      saveAuthSecond,
      handleUpload,
      handleAddCompanyAndCard,
      empno,
      name,
      onInput,
      upLoad,
      file,
      showBtn
    } = this.props;
    // const { companyAndCard } = this.props.vipAndHobby;
 
    const { columns, authModalPageData, searchBudgedata, card,
     } = this.state;
    // -----
    // const companyOption = company.map(v => (<Option value={v.Code} key={v.Code}>{v.Value}</Option>));
    // ---------
    // console.log(this.state);
    // console.log(columns);
    // console.log(authModalPageData)
    //臨時數據顯示
    // let tableData1 = [
    //   {
    //     JobName: '助理技術員',
    //     JobCode: 'DDF950',
    //     JobCod: 'DDF95',
    //     BudgetBound: '80',
    //     UpperBouns: '120',
    //   },]    
    return (
      <React.Fragment>{
        this.props.isAuthority
          ? <Card title="職務津貼預算維護">
            {/*  */}
            <div className="VIP-and-hobby">
              <div>
                <b>查詢信息:</b>
                <Input
                  className="input"
                  size="small"
                  style={{ width: '130px', margin: '15px' }}
                  onChange={(e) => onInput('jobname', e.target.value)}
                />
                <Button
                  className="button"
                  type="primary"
                  size="small"
                  style={{ margin: '15px' }}
                  onClick={handleAddCompanyAndCard.bind(this, card)}
                // 
                >
                  查詢
             </Button>
              </div>
              {/*  */}

              <div>
                <Button
                  style={{ margin: '15px' }}
                  type="primary"
                  onClick={handleShowModalClick.bind(this)}>
                  新增
            </Button>
                {/* --上傳-- */}
                <Upload  
                  success={handleUpload}
                 path='Maintain/AlloWance_ADD_Batch'
                  /> 
                
                <a
                 url='T:\AW\P82\Sample\Allowance_Sample.xlsx' 
                 name='Allowance_Sample.xlsx'
                href={`http://${this.state.hostpath}/Maintain/Allowance_OpenExcel?path=T:/AW/P82/Sample/Allowance_Sample.xlsx &name=Allowance_Sample.xlsx`}><Icon type="download" 
                size='big' />點此下載模板</a>
                
                  {/* ------ */}
                  {
                    this.props.showBtn
                    ?<Button onClick={()=>upLoad(file)}
                    type='primary'
                    >確定 </Button>
                    :null
                    }
                {/*  */}
                <AddAuth
                  pageData={authModalPageData}
                  showModal={showModal2}
                  addAuthOk={addAuthOk}
                  hideModal={handleHideModalClick}
                  ref="abc" />

                <AuthMaintainTable
                  tableData={budget_allowance_data}
                  //  tableData={tableData1}
                  columns={columns}
                  saveAuth={saveAuthSecond}
                  scroll={{ x: 700 }}
                  rowKey="key"
                />
              </div>
            </div>
            {/*  */}
          </Card>
          : <NoAuthority />
      }
      </React.Fragment>
    )
  }
  componentWillUnmount() {
    this.props.changeAuth();
  }
}

const mapStateToProps = (state) => {
  const { showModal2,
    isAuthority,
    budget_allowance_data,
    searchBudgedata,
    baseInfo,
    file,
    showBtn      } 
    = state.adminMaintainReducer;
  // console.log(state.adminMaintainReducer);
  return {
    showModal2,
    isAuthority,
    budget_allowance_data,
    searchBudgedata,
    baseInfo,
    file,
    showBtn
    // vipAndHobby
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getPageDataSecond() {
      dispatch(actionCreators.getPageDataSecond())
    },
    saveAuthSecond(row, table){
      // console.log(row)
      dispatch(actionCreators.saveAuthSecond(row, table))
    },
    handleShowModalClick() {
      this.refs.abc.resetFields();
      dispatch(actionCreators.showModal2())
      dispatch(actionCreators.addType())
    },
    handleHideModalClick() {
      dispatch(actionCreators.hideModal())
    },
    getName(e) {
      const setName = this.refs.abc.setFieldsValue;
      dispatch(actionCreators.getName(e.target.value, setName))
    },
    addAuthOk(values) {
      dispatch(actionCreators.addAuthOk2(values))
    },
    changeAuth() {
      dispatch(actionCreators.isAuthority(false))
      dispatch(actionCreators.showBtn(false))

    },
    handleAddCompanyAndCard(card) {
      dispatch(actionCreators.searchData(card))
    },
    onInput(type, value) {
      // console.log(onInput(type,value))
      dispatch(actionCreators.onInput({ type, value }))
    },
    handleUpload(file){
      dispatch(actionCreators.saveUpLoadFile(file))
    },
    upLoad(file){
      console.log(file)
      dispatch(actionCreators.upLoad(file))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Maintainbudge)