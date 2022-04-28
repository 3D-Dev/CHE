import React, { useState, useEffect, Fragment} from 'react';
import {Select, Col, Form} from "antd";
import {FormLabel} from "./FormLabel";

const children = []
// for(let i = 0; i < 100; i ++) {
//   children.push(<Option key></Option>)
// }
export const FormList = (props) => {
  const {Option} = Select;

  function onChange(value) {
    console.log(`selected ${value}`);
  }
  
  function onSearch(val) {
    console.log('search:', val);
  }

  return (
    <Fragment>
        <div>
        <FormLabel label={props.label} required={props.required}/>
            <Col lg={16} className={"p-0 lg:ml-24"} >
                <Form.Item
                    name={props.name}
                    rules={[{required: props.required, message: props.intl.formatMessage({id: 'alert.fieldRequired'})}]}
                >
                    <Select
                        size='large'
                        showSearch
                        placeholder={props.placeholder}
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                    </Select>
                </Form.Item>
            </Col>
        </div>
    </Fragment>
  )
}