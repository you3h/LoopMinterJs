import { Result, Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <Result
      status='404'
      title='404'
      subTitle='Sorry, the page you visited does not exist.'
      extra={<Button size='small' type='primary' onClick={() => navigate(-1)}>Go back to previous page</Button>}
    />
  )
}

export default NotFound
