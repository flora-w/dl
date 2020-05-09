import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, Input, Button, Card, Table, Modal, Form } from "antd";
import { actionCreators } from "../store";
import { formatDate } from "../../../../utils";
import NoAuthority from '../../../../commonPages/noAuthority';
import '../index.less';

const Option = Select.Option;
const { TextArea } = Input;


class DownTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: '#',
          dataIndex: 'index',
        }, {
          title: '計薪周期',
          dataIndex: 'MoneyDate',
        },
        {
          title: '部門代碼',
          dataIndex: 'DeptCode',
        },
        {
          title: '部門名稱',
          dataIndex: 'Dept',
        },
        {
          title: '員工工號',
          dataIndex: 'EmpNo',
        },
        {
          title: '員工姓名',
          dataIndex: 'ChName',
        },
        {
          title: '職務代碼',
          dataIndex: 'JobCode',
        },
        {
          title: '津貼預算',
          dataIndex: 'BudgetBound',
        },
        {
          title: '預算上限',
          dataIndex: 'UpperBouns',
        },
        {
          title: '評核否',
          dataIndex: 'Status',
        },
      ],
      // --
      authModalPageData: [
        {
          title: '#',
          dataIndex: 'index',
        }, {
          title: '計薪周期',
          dataIndex: 'MoneyDate',
        },
        {
          title: '部門代碼',
          dataIndex: 'DeptCode',
        },
        {
          title: '部門名稱',
          dataIndex: 'Dept',
        },
        {
          title: '員工工號',
          dataIndex: 'EmpNo',
        },
        {
          title: '員工姓名',
          dataIndex: 'ChName',
        },
        {
          title: '職務代碼',
          dataIndex: 'JobCode',
        },
        {
          title: '津貼預算',
          dataIndex: 'BudgetBound',
        },
        {
          title: '預算上限',
          dataIndex: 'UpperBouns',
        },
        {
          title: '評核否',
          dataIndex: 'Status',
        },
      ],
        hostpath: process.env.NODE_ENV === 'development' ? '10.42.21.51:108' : window.location.host
    }

  }
  onChange = (value) => {
    //  console.log(value)
  }
  onBlur = () => {
    // console.log('blur');
  }
  onFocus = () => {
    // console.log('focus');
  }
  handleChange = (value) => {
    // console.log(e.target.value);
    console.log(value)
  }
  componentDidMount() {
    this.props.getPageData();
  }
 
  render() {
    let columns = this.state.columns;
    let data = this.state.data;
    const { baseInfo, deptSelect, personHobbySave, isAuthority, sendMailToBoss, jxzq, tableData, bottomTablesData, personHobbySavebs, tableDataPersonHobby } = this.props;
    const { dept, areaData, deptSelectData } = baseInfo;

    // console.log(tableDataPersonHobby)

    return (
      <Card>
        {
          !this.props.isAuthority &&
          <NoAuthority />
        }
        {
          this.props.isAuthority &&
          <React.Fragment>
            <div className="person-info">
              <div className="Info_Register_Dept">
                <b>部門:</b>
                {/* <Select
                  className="area"
                  style={{ marginLeft: '30px' }}
                  size="small"
                  defaultValue='ALL'
                  showSearch
                  optionFilterProp="children"
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
                  onChange={this.props.personHobbySave.bind(this)}
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {
                    tableData.map(v => (
                      <Option key={v.key} value={v.Value}> {v.Value} </Option>
                    ))
                  }
                </Select> */}
                {/*  */}
                {/* <Select
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
           > */}
              <Select
                  className="area"
                  style={{ marginLeft: '30px' }}
                  size="small"
                  defaultValue='ALL'
                  showSearch
                  optionFilterProp="children"
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
                  onChange={this.props.personHobbySave.bind(this)}
                  filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                {/*    */}
                {
                    // tableData.map
                    tableData.map(v=>( 
                      //  (v => (
                      // < Option key={v.key} value={v.Value}> {v.Value} </Option>
                      < Option key={v.key} value={v.Value}> {v.Value} </Option>
                      // <Option key={v.key} value={v.Value}>{v.Value}</Option>
                    ))
                  }

                {/*  */}

            {/* {
              tableData.map(v=>(
                <Option key={v.key} value={v.Value}>
                  {v.Value}
                </Option>
              ))
            } */}
          </Select>


                {/*  */}
              </div>
              {/*  */}
              <div className="Info_Register_Moneydate">
                <b>計薪週期:</b>
                <Input
                  className="input"
                  size="small"
                  disabled={true}
                  defaultValue={jxzq}
                />
              </div>
              {/*  */}
              <div className="submit-btn">
                <b ><Button onClick={() => personHobbySavebs(deptSelectData)}>生成</Button>
                </b>
                {/* -------------------- */}
                <a 
             style={{margin:'15px'}}
             className="ant-btn ant-btn-primary" 
             type="button"
            href={`http://${this.state.hostpath}/Info/DownLoad_Detail?`} 
            >
            下載明細
            </a>
                {/* ---------------------- */}
                <b><Button onClick={() => sendMailToBoss(data)}>發佈</Button></b>
              </div>
            </div>
            <Table
              columns={columns}
              dataSource={tableDataPersonHobby}
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

// function show_sub(data){console.log(data)};
const mapStateToProps = (state) => {
  const { baseInfo, deptSelectData, isAuthority, jxzq, tableData, bottomTablesData, tableDataPersonHobby } = state.publishingReducer;
  console.log(state.publishingReducer)
  return { baseInfo, deptSelectData, isAuthority, jxzq, tableData, bottomTablesData, tableDataPersonHobby }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getPageData() {
      dispatch(actionCreators.getPageData())
    },
    // 部門
    registerDept(value, key) {
      dispatch(actionCreators.registerDept(value, key))
    },
    // --
    personHobbySave(data) {
      // console.log(data)
      dispatch(actionCreators.personHobbySave(data));
    },

    personHobbySavebs() {
      dispatch(actionCreators.personHobbySavebs())
    },

    bottomTablesData() {
      dispatch(actionCreators.bottomTablesData());
    },
    // --
    sendMailToBoss() {
      dispatch(actionCreators.sendMailToBoss());
    },

    changeAuth() {
      dispatch(actionCreators.isAuthority(false))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DownTable)