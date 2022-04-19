import { useEffect } from 'react'
import { Form, Card, Radio, Input, InputNumber, Button, message } from 'antd'

import useStore from '../store'
import APIManager from '../apiClient'
import { useLoader } from '../hooks/useLoader'

const { Item } = Form

const layout = {
  layout: 'vertical'
};

const Mint = () => {
  const [form] = Form.useForm()
  const apiClient = new APIManager()
  const { loader } = useLoader()

  const {
    mintSettings,
    setMintSettings
  } = useStore(state => ({
    mintSettings: state.mintSettings,
    setMintSettings: state.setMintSettings
  }))


  useEffect(() => {
    if (mintSettings) {
      form.setFieldsValue(mintSettings)
    } else {
      form.setFieldsValue({
        tokenToUse: 'LRC',
        nftType: 0,
        nftAmount: 1,
        royaltyPercentage: 5
      })
    }
  }, []) // eslint-disable-line

  const onFinish = async (values) => {
    try {
      loader.show()
      const res = await apiClient.mintNFT(values)
      setMintSettings(values)
      message.success('NFT Minting successful')
      return res
    } catch (err) {
      console.log(err)
      message.error('Something went wrong while updating user')
    } finally {
      loader.hide()
    }
  };

  return (
    <Card title='Mint NFT' size='small' className='default-form'>
      <Form form={form} {...layout} onFinish={onFinish} autoComplete='off'>
        <Item name='tokenToUse' label='Payment Token' rules={[ { required: true } ]}>
        <Radio.Group buttonStyle='solid' size='small'>
          <Radio.Button value='ETH'>ETH</Radio.Button>
          <Radio.Button value='LRC'>LRC</Radio.Button>
          <Radio.Button value='USDT'>USDT</Radio.Button>
          <Radio.Button value='DAI'>DAI</Radio.Button>
          <Radio.Button value='USDC'>USDC</Radio.Button>
        </Radio.Group>
        </Item>
        <Item name='ipfsCid' label='Metadata CID' rules={[ { required: true } ]}>
          <Input />
        </Item>
        <Item name='nftType' label='NFT Type' rules={[ { required: true } ]}>
        <Radio.Group buttonStyle='solid' size='small'>
            <Radio.Button value={0}>ERC1155</Radio.Button>
            <Radio.Button value={1}>ERC720</Radio.Button>
          </Radio.Group>
        </Item>
        <Item name='nftAmount' label='# of NFT to Mint' rules={[{ type: 'number', min: 1, max: 10000 }, { required: true }]}>
          <InputNumber />
        </Item>
        <Item name='royaltyPercentage' label='Royalty Percentage' rules={[{ type: 'number', min: 5, max: 10 }, { required: true }]}>
          <InputNumber />
        </Item>
        <Button type='primary' htmlType='submit'>
          Mint
        </Button>
      </Form>
    </Card>
  );
}

export default Mint