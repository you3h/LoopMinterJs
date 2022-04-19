import { useState } from 'react'
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate
} from 'react-router-dom'
import styled from 'styled-components'
import { Layout, Tag, Menu } from 'antd'
import {
  HddOutlined,
  RocketOutlined,
  SendOutlined,
  SettingOutlined, 
  TagOutlined, 
  TagsOutlined, 
  UserOutlined,
  CheckOutlined
} from '@ant-design/icons'

import useStore from '../store'
import {
  Mint,
  BatchMint,
  Transfer,
  BatchTransfer,
  IPFSExplorer,
  UserSettings,
  ImageSettings,
  NotFound
} from '../pages'

const { Footer, Content, Sider } = Layout
const { SubMenu } = Menu

const FooterTextContainer = styled.div`
  display: flex;
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
    icon: <TagOutlined />,
    show: true
  },
  {
    url: '/batchmint',
    text: 'Batch NFT Mint',
    icon: <TagsOutlined />,
    show: false
  },
  {
    url: '/transfer',
    text: 'Single NFT Transfer',
    icon: <SendOutlined />,
    show: false
  },
  {
    url: '/batchtransfer',
    text: 'Batch NFT Transfer',
    icon: <RocketOutlined />,
    show: false
  },
  {
    url: '/ipfs',
    text: 'IPFS',
    icon: <HddOutlined />,
    show: false
  },
  {
    url: '/settings',
    text: 'Setting',
    icon: <SettingOutlined />,
    subMenu: [
      {
        url: '/settings-user',
        text: 'User Credentials',
        icon: <UserOutlined />,
      },
      {
        url: '/settings-image',
        text: 'Image Generation',
        icon: <SettingOutlined />,
      }
    ]
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
    <Menu theme='dark' selectedKeys={[setSelectedKey()]} defaultOpenKeys={[setSelectedKey().split('-')[0]]} mode='inline'>
      {
        ROUTES.map(route => {
          const {
            url,
            icon,
            text,
            subMenu
          } = route

          if (subMenu && subMenu.length) {
            return (
              <SubMenu key={url} icon={icon} title={text}>
                {
                  subMenu.map(sub => (
                    <Menu.Item key={sub.url} onClick={() => onClick(sub.url)} icon={sub.icon}>
                      {sub.text}
                    </Menu.Item>
                  ))
                }
              </SubMenu>
            )
          }

          return (
            <Menu.Item key={url} onClick={() => onClick(url)} icon={icon}>
              {text}
            </Menu.Item>
          )
        })
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
    <Layout style={{ height: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
        <SiderLogo collapsed={collapsed}/>
        <MenuList navigate={navigate} location={location} />
      </Sider>
      <Layout>
        <Content className='content-container'>
          <Routes>
            <Route path='*' element={<NotFound />} />
            <Route path='/mint' element={<Mint />} />
            <Route path='/batchmint' element={<BatchMint />} />
            <Route path='/transfer' element={<Transfer />} />
            <Route path='/batchtransfer' element={<BatchTransfer />} />
            <Route path='/ipfs' element={<IPFSExplorer />} />
            <Route path='/settings-user' element={<UserSettings />} />
            <Route path='/settings-image' element={<ImageSettings />} />
            <Route path='/' element={<Navigate replace to='/mint' />} />
          </Routes>
        </Content>
        <Footer style={{ position: 'sticky', bottom: '0', }}>
          <FooterTextContainer>
            <>User:&emsp; {
              user && user.alias
                ? <>
                  <b>{user.alias}</b>&emsp;
                  {user.apiKey && (
                    <Tag icon={<CheckOutlined />} color='blue'>
                      API Key
                    </Tag>
                  )}
                  {user.privateKey && (
                    <Tag icon={<CheckOutlined />} color='blue'>
                      Private Key
                    </Tag>
                  )}
                  </>
                : 'No current user, update settings!'
              }
            </>
          </FooterTextContainer>
        </Footer>
      </Layout>
    </Layout>
  )
}

export default Home