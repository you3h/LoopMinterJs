import { Spin } from 'antd'
import './PageLoader.css'

const PageLoader = () => {
  return (
    <div className='page-mask loader-page-mask'>
      <div className='loader'>
        <Spin size='large' />
      </div>
    </div>
  )
}

export default PageLoader
