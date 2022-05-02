import React, { useState, useEffect, Fragment} from 'react';
import {Select, Col, Form} from "antd";
import {FormLabel} from "./FormLabel";


export const FormList = (props) => {
  const {Option} = Select;

  const children = []
const list = [
  '名古屋中央兔子俱乐部',
  '神戸兔子俱乐部',
  '大阪梅田兔俱乐部',
  '仙名古屋南兔俱乐部',
  '岐阜白川兔子俱乐部',
  '香草兔子俱乐部',
  '樱花兔子俱乐部',
  'HBR兔子俱乐部',
  '爱心兔子俱乐部',
  '笑顔兔子俱乐部',
  '兼尾張兔子俱乐部',
  'TP札幌兔子俱乐部',
  'PLUSMILE',
  'はじめラビット倶楽部',
  '未来ラビットぐ乐部',
  'TPB  HBY兔子俱乐部',
  'KKGHBY兔子俱乐部',
  '富士山HBY兔子俱乐部',
  '浅草HBY-兔子俱乐部',
  'ひふみ兔子俱乐部',
  '台东兔子俱乐部',
  'Goku Luck HBY兔子俱乐部',
  '群馬HBY兔子俱乐部',
  '神奈川HBY兔子俱乐部',
  '好朋友兔子俱乐部',
  '和歌山幸作兔子俱乐部',
  '高知HBY兔子俱乐部',
  '鹿児島HBY兔子俱乐部',
  'nory1045HBY兔子俱乐部',
  '柴山兔子俱乐部' ,
  '三重県松阪 兔子俱乐部',
  'HBY蓝隆兔俱乐部',
  'Smile Earth俱乐部',
  '名古屋光子兔子俱乐部',
  '北海道札幌兔子俱乐部',
  '倶楽部オーナー番号',
]
for(let i = 0; i < list.length-1; i ++) {
  children.push(<Option key={list[i]}>{list[i]}</Option>);

}

  function onChange(value) {
    console.log(`selected ${value}`);
  }
  
  function onSearch(val) {
    console.log('search:', val);
  }

  return (
    <Fragment>
        <div>
            <Select
                size='middle'
                showSearch
                placeholder={props.placeholder}
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {children}
            </Select>
        </div>
    </Fragment>
  )
}