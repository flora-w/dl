import React from 'react';
import { withRouter } from "react-router-dom";
import { Menu, Dropdown, Icon, Avatar } from "antd";

const UserLogin = props => {
  /**
   * 退出登录
   */
  const loginOut = () => {
    sessionStorage.setItem('Index','1');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('category');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    props.history.push('/');
  }
  /**
   * 旅行社或用戶登陸
   */
  const handleLoginClick = e => {
    props.history.push('/login?category=staff');
  }
  const menu1 = (
    <Menu onClick={handleLoginClick}>
      <Menu.Item>
        <span>
          員工登陸
        </span>
      </Menu.Item>
    </Menu>
  )
  const menu2 = (
    <Menu>
      <Menu.Item>
        <span onClick={loginOut}>
          <Icon type="logout" />&nbsp;
          退出登录
        </span>
      </Menu.Item>
    </Menu>
  )
  const user = sessionStorage.getItem('user');
  if(!user){
    return (
        <div onClick={handleLoginClick} className="user-login1">
          登陆
          {/*<Icon type="down" className="icon" />*/}
        </div>
    )
  }else{
    return(
        <Dropdown overlay={menu2} className="user-login2">
          <div>
          <Avatar className="avatar" size="small" icon="user" />
            &nbsp;
            <span className="name">
              {user}
              <Icon type="down" className="icon" />
            </span>
          </div>
        </Dropdown>
    )
  }
}


export default withRouter(UserLogin)