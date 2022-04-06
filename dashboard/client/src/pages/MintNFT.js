import { Form, Card, Radio, Input, InputNumber, Button, message } from 'antd'

import APIManager from '../apiClient'
import { useLoader } from '../hooks/useLoader'

const { Item } = Form

const layout = {
  layout: 'vertical'
};

const MintNFT = () => {
  const apiClient = new APIManager()
  const { loader } = useLoader()

  const onFinish = async (values) => {
    try {
      loader.show()
      const res = await apiClient.mintNFT(values)
      message.success('NFT Minting successful')
      // TODO: Show a successfull message on the screen
      return res
    } catch (err) {
      console.log(err)
      message.error('Something went wrong while updating user')
    } finally {
      loader.hide()
    }
  };

  return (
    <Card title='Mint NFT' size='small' className='user-form'>
      <Form {...layout} onFinish={onFinish}>
        <Item name='tokenToUse' label='Payment Token' rules={[ { required: true } ]}>
        <Radio.Group buttonStyle='solid' value='LRC' size='small'>
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
        <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
          Mint
        </Button>
      </Form>
    </Card>
  );
}

export default MintNFT