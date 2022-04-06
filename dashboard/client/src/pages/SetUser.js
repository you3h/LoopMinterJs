import { Form, Card, Input, Button, message } from 'antd'

import useStore from '../store'
import APIManager from '../apiClient'

const { Item } = Form

const layout = {
  layout: 'vertical'
};

const SetUser = () => {
  const apiClient = new APIManager()

  const {
    setUser
  } = useStore(state => ({
    setUser: state.setUser
  }))


  const onFinish = async (values) => {
    try {
      const res = await apiClient.setUser(values)
      setUser(res.data)
    } catch (err) {
      message.error('Something went wrong while updating user')
    }
  };

  return (
    <Card title='Setup User' size='small' className='user-form'>
      <Form {...layout} onFinish={onFinish}>
        <Item name={'minterId'} label='User Id' rules={[ { required: true } ]}>
          <Input />
        </Item>
        <Item name={'minterAddress'} label='User Address' rules={[ { required: true } ]}>
          <Input />
        </Item>
        <Item name={'apiKey'} label='Api Key'>
          <Input />
        </Item>
        <Item name={'privateKey'} label='Private Key'>
          <Input />
        </Item>
        <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
          Submit
        </Button>
      </Form>
    </Card>
  );
}

export default SetUser