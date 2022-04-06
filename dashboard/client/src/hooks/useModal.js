import React, { useState, useMemo, useContext } from 'react'
import {
  Modal
} from '../components'

const ModalContext = React.createContext()

export const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState({
    visible: false,
    title: null,
    footer: null,
    content: null
  })

  const hideModal = () => {
    setShowModal({ visible: false, title: null, footer: null, content: null })
  }

  const modal = useMemo(() => ({
    show: (props) => {
      setShowModal({
        ...props,
        close: () => hideModal()
      })
    },
    hide: () => hideModal()
  }), [])

  return (
    <>
      <Modal {...showModal} />
      <ModalContext.Provider
        value={{
          modal
        }}
      >
        {children}
      </ModalContext.Provider>
    </>
  )
}

export const useModal = () => {
  const contextValue = useContext(ModalContext)
  return contextValue
}
