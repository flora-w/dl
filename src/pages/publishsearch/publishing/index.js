import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from "antd";
import { actionCreators } from "./store";
import BaseInfo from "./components/index";
// import CardInfo from "./components/cardInfo";
// import Newcardtable from "./components/newCardTable";
// import Search from "./components/search";//
import "./index.less";
import NoAuthority from '../../../commonPages/noAuthority';

class PersonInfoMaintain extends Component {
  areaSelect = (value,e) => {
    this.props.areaSelect(value)
  }

  componentDidMount(){
    // this.props.pageInit();
  }
  render(){
    return(
      <div>  
      {
        !this.props.isAuthority && 
      <NoAuthority />
      }
      {
        this.props.isAuthority &&
        <Card title="權限維護">
      <div className="person-info-maintain">
          <BaseInfo areaSelect={this.areaSelect}/>
          {/* <CardInfo /> */}
      </div>
      </Card>
      }
      </div>
    )
  }
}
  // 



  // 
const mapStateToProps = ( state ) => {
    // const { isAuthority }  = state.publishingComponentsReducer;


  return{
    // isAuthority
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
   changeAuth(){
     dispatch(actionCreators.isAuthority(false))
   }


  }
}
export default connect( mapStateToProps, mapDispatchToProps )( PersonInfoMaintain )