import React from 'react';
import { Modal, Input, Form, Radio, DatePicker,Select} from "antd";

const { Option } = Select;
const AddAuth = (props) => {
  /**
   * 要显示的表单元素
   */
  const renderItem = (v) => {
    switch (v['type'].toUpperCase()) {
      case 'INPUT':
        return <Input type="small" {...v.props} autoComplete='off'/>      
       case 'RADIO':
        return (
          <Radio.Group>
            <Radio value="Y">Y</Radio>
            <Radio value="N">N</Radio>
          </Radio.Group>
        )
        case 'SELECT':
        return (
          <Select>
           {/* {  v.props.map(p => (
                 <Select.Option value={p.props}>{p.props}</Select.Option>                 
               ))} */}
               <Option value='按工號'>按工號</Option>
                <Option value='按職務'>按職務</Option>
           </Select>
              )                    
      case 'DATEPICKER':
        return (
          <DatePicker type="small"/>
        )
      default:
        break;
    }
  }
  /**
   * 确定  /
   */
  const handleAddAuthOk = () => {
    props.form.validateFields((err, values) => {
      if(!err){
        props.addAuthOk(values)
        
      }
    });
  }

 
  /**
   * 布局
   */
  const formItemLayout = {
    labelCol: {span: '5'},
    wrapperCol: {span: '15'}
  }
  const { getFieldDecorator } = props.form;
  let name = props.name;
  return (
      <Modal
        title="新增"
        visible={props.showModal}
        onOk={handleAddAuthOk}
        onCancel={props.hideModal}
        centered={true}
        bodyStyle={{marginLeft:40}}
      >
        <Form className='formStyle'>
          {
            props.pageData.map((v, k) => {
              return (
                <Form.Item 
                label={v.title} 
                key={k}
                labelCol={{span: 7, offset: 12}}
                {...formItemLayout}>
                  {
                    getFieldDecorator(
                      v.id,
                      {
                        rules: [{ required: true, message: '必填' }],
                        initialValue:v.id === 'ChName' ? name : ''
                      })(
                        renderItem(v)
                    )
                  }
                </Form.Item>
              )
            })
          }
        </Form>  
      </Modal>
  )
}
  
export default Form.create()(AddAuth) 