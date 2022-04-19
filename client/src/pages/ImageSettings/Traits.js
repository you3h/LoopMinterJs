import { useState } from 'react'
import { Alert, Form, Divider, Select, Space, Input, Button } from 'antd'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'

import useStore from '../../store'
import { useLoader } from '../../hooks/useLoader'
import { PopoverColorPicker } from '../../components'

const { Option } = Select
const { Item } = Form

const CollectionDescription = ({ values }) => {
  const {
    collection_name: collectionName,
    artist_name: artistName,
    royalty_address: royaltyAddress,
    royalty_percentage: royaltyPercentage
  } = values

  return (
    <Alert
      description={<>
        <ul>
          <li>Collection Name: &emsp; <b>{collectionName}</b></li>
          {artistName && <li>Artist Name: &emsp; <b>{artistName}</b></li>}
          {royaltyAddress && <li>Royalty Address: &emsp; <b>{royaltyAddress}</b></li>}
          {royaltyAddress && <li>Royalty: &emsp; <b>{royaltyPercentage}%</b></li>}
        </ul>
        <span>Define number of traits and how many variation each will have</span>
      </>}
      type='info'
    />
  )
}

const BackgroundLayers = ({ savedColor, changeColor }) => {
  return (
  <>
    <Divider>Setup Background Color</Divider>
    <Form.List name='backgrounds'>
      {(fields, { add, remove, move }) => (
          <>
            {fields.map(({ key, name, ...restField }, idx) => (
              <Space key={key} style={{ display: 'flex', flexWrap: 'wrap', marginBottom: 8, justifyContent: 'space-between' }} align='baseline'>
                <Item {...restField} name={[name, 'name']} label='Name' rules={[{ required: true }]}>
                  <Input placeholder={`Background name ${idx + 1}`} />
                </Item>
                <Item {...restField} name={[name, 'rarity']} label='Rarity' rules={[{ required: true }]}>
                  <Select placeholder='Select rarity'>
                    <Option value='4'>Common</Option>
                    <Option value='3'>Uncommon</Option>
                    <Option value='2'>Rare</Option>
                    <Option value='1'>Legendary</Option>                        
                  </Select>
                </Item>
                <Item {...restField} name={[name, 'color']} label='Color' rules={[{ required: true }]}>
                  <PopoverColorPicker color={savedColor[idx]} onChange={(color) => changeColor(color, idx)} />
                </Item>
                <DeleteOutlined onClick={() => {
                  delete savedColor[idx]
                  remove(name)
                }} />
              </Space>
            ))}
            <Item>
              <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
                Add Background
              </Button>
            </Item>
          </>
        )}
    </Form.List>
  </>
  )
}

const InitTraits = ({ traits, traitNames, setTraitNames }) => {
  if (!traits) return null

  const traitsComponent = []

  for (let x = 0; x < traits; x++) {
    traitsComponent.push(
      <div key={x}>
        <Divider style={{ fontSize: '12px' }}>{traitNames && traitNames[x] ? `Trait - ${traitNames[x]}` : ''}</Divider>
        <Item name={['traits', `trait-${x}`]} label='Name' rules={[{ required: true, message: 'Trait name is required' }]}>
          <Input placeholder={`Trait name ${x + 1}`} onChange={(e) => {
            setTraitNames({
              ...traitNames,
              [x]: e.target.value
            })
          }} />
        </Item>
        <Variants 
          traitId={x} 
          traitNames={traitNames}
        />
      </div>
    )  
  }

  return traitsComponent
}

const Variants = ({ traitId, traitNames = {} }) => {
  return (
    <Form.List name={`trait-${traitId}-variants`}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }, idx) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align='baseline'>
                <DeleteOutlined onClick={() => remove(name)} />
                <Item {...restField} name={[name, 'name']} label='Variant Name' rules={[{ required: true, message: 'Variant name is required' }]}>
                  <Input placeholder='Variant Name' />
                </Item>
                <Item {...restField} name={[name, 'rarity']} label='Rarity' rules={[{ required: true, message: 'Rarity is required' }]}>
                  <Select placeholder='Select rarity'>
                    <Option value='4'>Common</Option>
                    <Option value='3'>Uncommon</Option>
                    <Option value='2'>Rare</Option>
                    <Option value='1'>Legendary</Option>                        
                  </Select>
                </Item>
                <Item {...restField} name={[name, 'filename']} label='File Name' rules={[{ required: true, message: 'File name is required' }]}>
                  <Input placeholder='File name' />
                </Item>
              </Space>
            )
          )}
          <Form.Item>
            <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
              {traitNames && traitNames[traitId] ? `Add Variation for ${traitNames[traitId]}` : 'Add Variation'}
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  )
}

const Traits = ({ form, values }) => {
  const { loader } = useLoader()
  const [traitNames, setTraitNames] = useState({})

  const {
    savedColor,
    setSavedColor
  } = useStore(state => ({
    savedColor: state.savedColor,
    setSavedColor: state.setSavedColor
  }))

  if (!values) return loader.show()

  const changeColor = (color, idx) => {
    setSavedColor({
      ...savedColor,
      [idx]: color
    })
  }

  return (
    <div style={{ width: '100%' }}>
      <CollectionDescription values={values} />
      <Form form={form} autoComplete='off'>
        { values && values.background && <BackgroundLayers savedColor={savedColor} changeColor={changeColor}/> }
        <Divider>Setup Traits</Divider>
        <InitTraits 
          traits={values && values.numOftraits} 
          traitNames={traitNames} 
          setTraitNames={setTraitNames}
        />
      </Form>
    </div>
  )
}

export default Traits
