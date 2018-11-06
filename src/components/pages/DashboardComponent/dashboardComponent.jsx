import { Layout, Menu, Breadcrumb, Icon, Badge, Avatar, Dropdown, Skeleton } from 'antd';
import React from "react";
import { Router, NavLink } from 'react-router-dom'
import AddStudentSemesterDetailsComponent from './Admin/AddSemesterDetailsComponent'
import AddStudentBookDetailsComponent from './Admin/AddStudentBooks'
import AddStudentDetailsComponent from './Admin/AddStudentDetails'
import AddStudentFeesDetailsComponent from './Admin/AddStudentFeesComponent'
import AdminProfileComponent from './Admin/AdminProfileComponent'
import './dashboardComponent.css'
import history from '../../middlewares/history'
import AuthService from '../../../services/authService'
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
class DashboardComponent extends React.Component {
  state = {
    collapsed: false,
    loading: true,
    page: 'Admin Profile'
  };


  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  handleMenuClick = event => {
    this.setState({ page: event.key })
    this.setState({ loading: true })
  }

  UserLogout = async event => {
    await this.auth.Adminlogout()
    this.props.history.push('/')
  }

  constructor(props) {
    super(props)
    this.auth = new AuthService()
  }






  render() {
    const UserMenu = (
      <Menu>
        <Menu.Item><Icon type="user" theme="outlined" /> Admin Profile</Menu.Item>
        <Menu.Item><Icon type="setting" theme="outlined" /> Account Settings</Menu.Item>
        <Menu.Divider />
        <Menu.Item onClick={this.UserLogout}><Icon type="logout" theme="outlined" /> Logout</Menu.Item>
      </Menu>
    );

    return (
      <Router history={history}>
        <Layout style={{ minHeight: '100vh' }} >
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div className="logo"></div>
            <Menu theme="dark" defaultSelectedKeys={['Admin_profile']} mode="inline">
              <Menu.Item key="Admin_profile" onClick={this.handleMenuClick}>
                <Icon type="user" theme="outlined" />
                <span>Admin Profile</span>
              </Menu.Item>
              <SubMenu
                key="sub1"
                title={<span><Icon type="usergroup-add" theme="outlined" /><span>Student details</span></span>}
              >
                <Menu.Item key="Semester_details" onClick={this.handleMenuClick}>
                  <Icon type="deployment-unit" theme="outlined" />
                  <span>Semester Details</span>
                </Menu.Item>
                <Menu.Item key="Fees_result" onClick={this.handleMenuClick}>
                  <Icon type="money-collect" theme="outlined" />
                  <span>Fees result</span>
                </Menu.Item>
                <Menu.Item key="add_books" onClick={this.handleMenuClick}>
                  <Icon type="read" theme="outlined" />
                  <span>Add books</span>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="notification_count" onClick={this.handleMenuClick}>
                <Icon type="notification" theme="outlined" />
                <span>Notification</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <div className="header-index-right">
                <span className="Header-portion">
                  <Badge count={1} dot>
                    <Icon type="notification" />
                  </Badge>
                </span>
                <Dropdown overlay={UserMenu}>
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"></Avatar>
                </Dropdown>
              </div>
            </Header>
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Admin</Breadcrumb.Item>
                <Breadcrumb.Item>Profile</Breadcrumb.Item>
              </Breadcrumb>
              <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                <Skeleton active >
                </Skeleton>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Aliance App ©2018 Created by Ronit Sarma
          </Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}


export default DashboardComponent;
