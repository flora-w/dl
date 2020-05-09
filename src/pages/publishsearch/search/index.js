import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from "antd";
import { actionCreators } from "./store";

import BaseInfo from "./components/baseInfo";
// import CardInfo from "./components/cardInfo";
// import Newcardtable from "./components/newCardTable";
import Search from "./components/search";//

// import "./index.less";
import { CONTACTS } from '../../../config/api';

class PersonInfoMaintain extends Component {

  areaSelect = (value,e) => {
    this.props.areaSelect(value)
  }

  componentDidMount(){
    this.props.pageInit();
  }
  render(){
    return(
      <div className="person-info-maintain">
        {/* <Card title=""> */}
          <BaseInfo areaSelect={this.areaSelect} />
        {/* </Card> */}
       
          {/* <CardInfo /> */}
      </div>
    )
  }
}
  




  // 
const mapStateToProps = ( state ) => {

  const { isAuthority }  = state.publishingSearchReducer;


  return{
    isAuthority
  }
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    pageInit(){
      dispatch(actionCreators.getPageData())
    },
    areaSelect(data){
      dispatch(actionCreators.areaData(data))
    },
   
  }
}
export default connect( mapStateToProps, mapDispatchToProps )( PersonInfoMaintain )