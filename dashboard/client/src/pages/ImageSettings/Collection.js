import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Form, Alert, Radio, Input, Divider, InputNumber, Switch } from 'antd'

const CollectionContainer = styled.div`
  width: 100%
`
const InlineItemContainer = styled.div`
  display: flex;
  justify-content: ${props => props.alignment ? props.alignment : 'flex-start'};
  flex-wrap: wrap;
`

const VERTICAL_FORM_LAYOUT = { layout: 'vertical', autoComplete: 'off' }
const REQUIRED = message => ({ required: true, message })

const { Item } = Form
const { TextArea } = Input

const Collection = ({ form, values }) => {
  const [showThumbnail, setShowThumbnail] = useState(values && values.thumbnails)
  const [isAnimated, setIsAnimated] = useState(values && values.animation)
  const [withBackground, setWithBackground] = useState(values && values.background)
  
  useEffect(() => {
      if (!values) {
        form.setFieldsValue({
          'royalty_percentage': 1,
          numOftraits: 3,
          'animated_format': '.gif'
        })
      } else {
        form.setFieldsValue(values)
      }
  }, [values]) // eslint-disable-line

  const onChangeThumbnail = () => setShowThumbnail(!showThumbnail)
  const onChangeAnimated = () => setIsAnimated(!isAnimated)
  const onChangeWithBackground = () => setWithBackground(!withBackground)

  return (
    <CollectionContainer>
      <Alert description='Fill in the following collection and artist information' type='info'/>
      <Form form={form} {...VERTICAL_FORM_LAYOUT}>
        <Divider>Collection Information</Divider>
        <Item name='collection_name' label='Name' rules={[ REQUIRED('Collection name is required') ]}>
          <Input placeholder='My love for cats..' />
        </Item>
        <Item name='description' label='Description' rules={[ REQUIRED('Collection description is required') ]}>
          <TextArea />
        </Item>
        <InlineItemContainer alignment='space-between'>
          <Item 
            name='numOftraits' 
            label='# of Traits' 
            rules={[{ type: 'number', min: 1, max: 10 }, REQUIRED('# of Traits Required')]}
            style={{  width: '15%' }}
          >
            <InputNumber style={{ width: '100%' }} />
          </Item>
          <Item 
            name='royalty_percentage' 
            label='Royalty Percentage' 
            rules={[{ type: 'number', min: 1, max: 10 }, REQUIRED('Royalty % is required')]}
            style={{  width: '30%' }}
          >
            <InputNumber style={{ width: '100%' }} />
          </Item>
          <Item name='seed' label='Seed' style={{ width: '50%' }}>
            <Input placeholder='Example seed..' />
          </Item>
        </InlineItemContainer>
        <Divider>Artist Information</Divider>
        <Item name='artist_name' label='Artist Name'>
          <Input placeholder='John Doe' />
        </Item>
        <Item name='royalty_address' label='Royalty Address'>
          <Input placeholder='0x0000000000000000000000000000dEad'/>
        </Item>        
        <Divider>Others</Divider>
           <InlineItemContainer>
            <Item name='background' label='Generate Background' style={{ width: '25%' }}>
              <Switch 
                onChange={onChangeWithBackground}
                checkedChildren='Yes'
                unCheckedChildren='No'            
                defaultChecked={values && values.background} 
              />
            </Item>
            { withBackground &&
              <InlineItemContainer style={{ width: '75%' }}>
                <Item 
                  name='background_name' 
                  label='Layer Name' 
                  rules={[REQUIRED('Background name is required.')]} 
                  style={{ marginRight: '10px' }}
                >
                  <Input placeholder='Background layer name' />
                </Item>
                <Item 
                  name='background_size_width' 
                  label='Background Width'
                  rules={[{ required: withBackground, message: 'Background width is required' }]}
                  style={{ marginRight: '10px' }}
                >
                  <Input />
                </Item>
                <Item name='background_size_height' label='Background Height' rules={[REQUIRED('Background width is required')]}>
                  <Input />
                </Item>
              </InlineItemContainer>
            }
          </InlineItemContainer> 
          <InlineItemContainer>
            <Item name='thumbnails' label='Generate Thumbnail' style={{ width: '25%' }}>
              <Switch 
                onChange={onChangeThumbnail}
                checkedChildren='Yes'
                unCheckedChildren='No'            
                defaultChecked={values && values.thumbnails} 
              />
            </Item>
            { showThumbnail &&
              <>
                <Item 
                  name='thumbnail_size_width' 
                  label='Thumbnail Width'
                  rules={[{ required: showThumbnail, message: 'Thumbnail width is required' }]}
                  style={{ marginRight: '10px' }}
                >
                  <Input />
                </Item>
                <Item name='thumbnail_size_height' label='Thumbnail Height' rules={[REQUIRED('Thumbnail height is required')]}>
                  <Input />
                </Item>
              </>
            }
          </InlineItemContainer>          
          <InlineItemContainer>
            <Item name='animation' label='Animated Collection' style={{ width: '25%' }}>
              <Switch 
                onChange={onChangeAnimated}
                checkedChildren='Yes'
                unCheckedChildren='No'            
                defaultChecked={values && values.animation} 
              />
            </Item>
            { isAnimated &&
              <Item name='animated_format' label='Animation Output Format' rules={[{ required: isAnimated, message: 'Animated format is required' }]}>
                <Radio.Group buttonStyle='solid' size='small'>
                  <Radio.Button value='.gif'>GIF</Radio.Button>
                  <Radio.Button value='.webm'>WEBM</Radio.Button>
                  <Radio.Button value='.mp4'>MP4</Radio.Button>
                </Radio.Group>
              </Item>
            }
          </InlineItemContainer>
      </Form>
    </CollectionContainer>
  )
}

export default Collection