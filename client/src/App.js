import { useEffect } from 'react'
import styled from 'styled-components'
import './App.less'

import { Home } from './pages'
import useStore from './store'
import APIManager from './apiClient'

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const App = () => {
  const apiClient = new APIManager()

  const {
    user,
    setUser
  } = useStore(state => ({
    user: state.user,
    setUser: state.setUser
  }))

  useEffect(() => {
    const getUser = async () => {
      const res = await apiClient.getUser()
      setUser(res.data)
    }

    if (!user) {
      getUser()
    }

  }, []) // eslint-disable-line
  return (
    <Container>
      <Home />
    </Container>
  )
}

export default App
