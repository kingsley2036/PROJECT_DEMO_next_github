import { useState, useCallback } from 'react'
import getConfig from 'next/config'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import axios from 'axios'
import {loginout} from '../store/store'

import { Layout, Icon, Input, Avatar, Tooltip, Dropdown, Menu } from 'antd'

import Container from './Container'

const { publicRuntimeConfig } = getConfig()
const { Header, Content, Footer } = Layout

const githubIconStyle = {
  color: 'white',
  fontSize: 40,
  display: 'block',
  paddingTop: 10,
  marginRight: 20
}

const footerStyle = {
  textAlign: 'center'
}

// const Comp = ({color, children, style}) => (<div style={{color,...style}}>{children}</div>)

function MyLayout({ children, user, loginout, router }) {
  const [search, setSearch] = useState('')

  // 监听搜索框内容变化
  const handleSearchChange = useCallback(e => {
    setSearch(e.target.value)
    console.log('TCL: handleSearchChange -> e.target.value', e.target.value)
  }, [])

  // 搜索仓库
  const handleOnSearch = useCallback(() => {}, [])

  // 登出
  const handleloginout = (e) => {
    loginout()
    e.preventDefault()
  }

  // 记录登录前的页面
  // const handleGotoOAuth = (e) => {
  //   axios.get(`/prepare-auth?url=${router.asPath}`).then(resp => {
  //     if(resp.status === 200) {
  //       location.href = publicRuntimeConfig.OAUTH_URL
  //     } else {
  //       console.log("TCL: prepare auth fail", resp)
  //     }
  //   }).catch(err => {
  //     console.log("TCL: prepare auth fail", err)
  //   }) 
  //   e.preventDefault()
  // }

  // 用户下拉菜单
  const userDropDown = () => {
    return (
      <Menu>
        <Menu.Item>
          <a onClick={handleloginout}>登 出</a>
        </Menu.Item>
      </Menu>
    )
  }

  return (
    <Layout>
      <Header>
        <Container renderer={<div className="header-inner" />}>
          <div className="header-left">
            <div className="logo">
              <Icon type="github" style={githubIconStyle} />
            </div>
            <div>
              <Input.Search
                placeholder="搜索仓库"
                value={search}
                onChange={handleSearchChange}
                onSearch={handleOnSearch}
              ></Input.Search>
            </div>
          </div>
          <div className="header-right">
            <div className="user">
              {user && user.id ? (
                <Dropdown overlay={userDropDown}>
                  <a href="/">
                    <Avatar size={40} src={user.avatar_url}></Avatar>
                  </a>
                </Dropdown>
              ) : (
                <Tooltip title="点击进行登录">
                  <a href={`/prepare-auth?url=${router.asPath}`}>
                    <Avatar size={40} icon="user"></Avatar>
                  </a>
                </Tooltip>
              )}
            </div>
          </div>
        </Container>
      </Header>

      <Content>
        <Container>{children}</Container>
      </Content>

      <Footer style={footerStyle}>
        develop by imooc @
        <a href="https://github.com/IFreeOvO">https://github.com/IFreeOvO</a>
      </Footer>

      <style jsx>
        {`
          .header-inner {
            display: flex;
            justify-content: space-between;
          }
          .header-left {
            display: flex;
          }
        `}
      </style>
      <style jsx global>
        {`
          #__next {
            height: 100%;
          }
          .ant-layout {
            height: 100%;
          }
          .ant-layout-header {
            padding-left: 0;
            padding-right: 0;
          }
        `}
      </style>
    </Layout>
  )
}

export default connect(function mapState(state) {
  return {
    user: state.user
  }
},function mapReducer(dispatch){
  return {
    loginout: () => dispatch(loginout())
  }
})(withRouter(MyLayout))
