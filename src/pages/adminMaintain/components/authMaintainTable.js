import React from 'react';
import PropTypes from 'prop-types';
import { ModifyTable } from "../../../components/table";

const AuthorityMaintain = (props) => {
  /**
   * 编辑保存时
   */
  const saveSuccess = row => {
    let table = props.tableData;
    table = table.map( v =>{
      if(v.key === row.key){
        v = {...v, ...row};
      }
      return v;
    })
    props.saveAuth(row, table);
  }
    return (
        <ModifyTable
          rowKey={props.rowKey}
          dataSource={props.tableData}
          columns={props.columns}
          saveSuccess={saveSuccess}
          scroll = {props.scroll}
        />
    )
}

//类型限制
// propTypes能用来检测全部数据类型的变量，
// 包括基本类型的的字符串，布尔值，数字，
// 以及引用类型的对象，数组，函数，甚至还有ES6新增的符号类型
// AuthorityMaintain.propTypes = {
//   tableData: PropTypes.array,
//   columns: PropTypes.array,
//   saveAuth: PropTypes.func,
// }

export default AuthorityMaintain