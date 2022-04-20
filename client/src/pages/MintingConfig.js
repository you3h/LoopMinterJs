import { useEffect } from 'react'
import { Form, Card, Input, Button, message } from 'antd'

import useStore from '../store'
import APIManager from '../apiClient'
import { useLoader } from '../hooks/useLoader'

const { Item } = Form

const layout = {
  layout: 'vertical'
};

const MintingConfig = () => {
  const apiClient = new APIManager()
  const { loader } = useLoader()
  const [form] = Form.useForm();

  const {
    user,
    setUser
  } = useStore(state => ({
    user: state.user,
    setUser: state.setUser
  }))

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        alias: user.alias,
        minterId: user.minterId,
        minterAddress: user.minterAddress,
        apiKey: user.apiKey,
        privateKey: user.privateKey
      })
    }
  }, [user]) // eslint-disable-line

  const onFinish = async (values) => {
    try {
      loader.show()
      const res = await apiClient.setUser(values)
      setUser(res.data)
      message.success('User settings updated')
    } catch (err) {
      message.error('Something went wrong while updating user')
    } finally {
      loader.hide()
    }
  };

  return (
    <Card title='Setup User' size='small' className='default-form'>
      <Form form={form} {...layout} onFinish={onFinish} autoComplete='off'>
        <Item name='alias' label='Alias' rules={[ { required: true } ]}>
          <Input />
        </Item>
        <Item name='minterId' label='User Id' rules={[ { required: true } ]}>
          <Input />
        </Item>
        <Item name='minterAddress' label='User Address' rules={[ { required: true } ]}>
          <Input />
        </Item>
        <Item 
          name='apiKey' 
          label='Api Key'
          tooltip={{ title: 'If an API KEY is provided, it will not show here anymore.' }}
        >
          <Input />
        </Item>
        <Item 
          name='privateKey' 
          label='Private Key'
          tooltip={{ title: 'If a PRIVATE KEY is provided, it will not show here anymore.' }}
        >
          <Input />
        </Item>
        <Button type='primary' htmlType='submit'>
          Update User Settings
        </Button>
      </Form>
    </Card>
  );
}

export default MintingConfig