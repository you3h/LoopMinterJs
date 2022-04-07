import { useState } from 'react'
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate
} from 'react-router-dom'
import styled from 'styled-components'
import { Layout, Menu } from 'antd'
import {
  HddOutlined,
  RocketOutlined,
  SendOutlined,
  SettingOutlined, TagOutlined, TagsOutlined
} from '@ant-design/icons'

import useStore from '../store'
import {
  Mint,
  BatchMint,
  Transfer,
  BatchTransfer,
  IPFSExplorer,
  Settings,
  NotFound
} from '../pages'

const { Footer, Content, Sider } = Layout

const FooterTextContainer = styled.div`
  display: flex;
  justify-content: space-between
`


const LogoContainer = styled.div`
  width: 100%;
  height: 50px; 
  display: flex; 
  justify-content: center; 
  align-items: center;
`
const Logo = styled.div`
  color: #fff; 
  height: 25px; 
  border-radius: 5px;
  background-color: #fff;
  width: ${props => props.width || '25px'};
`


const ROUTES = [
  {
    url: '/mint',
    text: 'Single NFT Mint',
    icon: <TagOutlined />
  },
  {
    url: '/batchmint',
    text: 'Batch NFT Mint',
    icon: <TagsOutlined />
  },
  {
    url: '/transfer',
    text: 'Single NFT Transfer',
    icon: <SendOutlined />
  },
  {
    url: '/batchtransfer',
    text: 'Batch NFT Transfer',
    icon: <RocketOutlined />
  },
  {
    url: '/ipfs',
    text: 'IPFS',
    icon: <HddOutlined />
  },
  {
    url: '/settings',
    text: 'Setting',
    icon: <SettingOutlined />
  }
]

const SiderLogo = ({ collapsed }) => {
  return (
    <LogoContainer>
      <Logo width={collapsed ? '45px': '175px' }/>
    </LogoContainer>
  )
}

const MenuList = ({ navigate, location }) => {
  const setSelectedKey = () => {
    const path = location.pathname.split('/')
    return `/${path[1]}`
  }

  const onClick = (navigateTo) => {
    navigate(navigateTo)
  }

  return (
    <Menu theme='dark' selectedKeys={[setSelectedKey()]} mode='inline'>
      {
        ROUTES.map(route => (
          <Menu.Item key={route.url} onClick={() => onClick(route.url)} icon={route.icon}>
            {route.text}
          </Menu.Item>
        ))
      }
    </Menu>
  )
}

const Home = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  const {
    user
  } = useStore(state => ({
    user: state.user
  }))

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
        <SiderLogo collapsed={collapsed}/>
        <MenuList navigate={navigate} location={location} />
      </Sider>
      <Layout>
        <Content style={{ margin: '20px 16px' }}>
          <Routes>
            <Route path='*' element={<NotFound />} />
            <Route path='/mint' element={<Mint />} />
            <Route path='/batchmint' element={<BatchMint />} />
            <Route path='/transfer' element={<Transfer />} />
            <Route path='/batchtransfer' element={<BatchTransfer />} />
            <Route path='/ipfs' element={<IPFSExplorer />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/' element={<Navigate replace to='/mint' />} />
          </Routes>
        </Content>
        <Footer style={{ position: 'sticky', bottom: '0', }}>
          <FooterTextContainer>
            <span>User: <b>{
              user && user.alias
                ? user.alias 
                : 'No current user, update settings!'}</b></span>
          </FooterTextContainer>
        </Footer>
      </Layout>
    </Layout>
  )
}

export default Home