import React from 'react'
import { Modal } from 'antd'

import './Modal.css'

const DefaultModal = ({ visible, title, footer, content, closable = false, maskClosable = true, centered = true, close, className }) => {
  return (
    <Modal
      visible={visible}
      onCancel={close}
      closable={closable}
      maskClosable={maskClosable}
      title={title}
      footer={footer}
      centered={centered}
      className={`modal-container ${className || ''}`}
    >
      {content}
    </Modal>
  )
}

export default DefaultModal
