import { useState } from 'react'
import styled from 'styled-components'
import { Form, Steps, Button, Card, message } from 'antd'
import { ArrowLeftOutlined, ArrowRightOutlined, SendOutlined } from '@ant-design/icons'

import APIManager from '../../apiClient'
import { useLoader } from '../../hooks/useLoader'
import Collection from './Collection'
import Traits from './Traits'

const { Step } = Steps

const ContentContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  display: flex;
  border-radius: 2px;
`
const ActionContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
`
const ButtonContainer = styled.div`
  ${props => props.visib ? 'visibility: visible;' : 'visibility: hidden;'}
`

const steps = (form, finalValues) => ([
  {
    title: 'Artist and collection information',
    content: <Collection form={form} values={finalValues}/>,
  },
  {
    title: 'Trait names and variations',
    content: <Traits form={form} values={finalValues} />,
  },
  {
    title: 'Confirm the data',
    content: <h1>Third Content</h1>,
  },
])

const CollectionWizard = () => {
  const [form] = Form.useForm()
  const { loader } = useLoader()
  const apiClient = new APIManager()
  const [finalValues, setFinalValues] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)

  const onNext = async () => {
    await form.validateFields()
    .then(async (values) => {
      try {
        loader.show()
        setCurrentStep(currentStep + 1)
        setFinalValues({ ...finalValues, ...values })
      } catch (err) {
        console.log(err)
        message.error('Something went wrong, Please try again')
      } finally {
        loader.hide()
      }
    }).catch(_ => {
      // * Do nothing errors will be shown in the form field
    })
  }

  const onPrev = () => currentStep !== 0 && setCurrentStep(currentStep - 1)

  const onDone = async () => {
    try {
      loader.show()
      const res = await apiClient.generateImageMetadata(finalValues)
      message.success('Image Metadata created')
      return res
    } catch (err) {
      console.log(err)
      message.error('Something went wrong while creating metadata')
    } finally {
      loader.hide()
    }
  };

  return (
    <Card>
      <Steps size='small' current={currentStep}>
        {steps().map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <ContentContainer>{steps(form, finalValues)[currentStep].content}</ContentContainer>
      <ActionContainer>
        <ButtonContainer visib={currentStep > 0}>
          <Button type='secondary' onClick={onPrev} icon={<ArrowLeftOutlined />}>Previous</Button>
        </ButtonContainer>
        <ButtonContainer visib={true}>
        {
          currentStep === steps().length - 1 
          ? <Button type='primary' onClick={onDone} icon={<SendOutlined />}>Create Metadata</Button>
          : <Button type='primary' onClick={onNext} icon={<ArrowRightOutlined />}>Next</Button>
        }
        </ButtonContainer>
      </ActionContainer>
    </Card>
  );
}

export default CollectionWizard