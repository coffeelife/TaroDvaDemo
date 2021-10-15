/**
 * pages模版快速生成脚本,执行命令 npm run tep `文件名`
 */

const fs = require("fs");

const dirName = process.argv[2];

if (!dirName) {
  console.log("文件夹名称不能为空！");
  console.log("示例：npm run tep test");
  process.exit(0);
}

// 页面模版
const indexTep = `import React, { Component } from "react";
 import Taro from '@tarojs/taro'
 import { View } from '@tarojs/components';
 import { connect } from 'react-redux';
 import './index.less';

 @connect(({${dirName}}) => ({
   ${dirName}
 }))
 export default class ${titleCase(dirName)} extends Component {

   componentDidMount() {}

   componentDidShow() {}

   componentDidHide() {}

   componentDidCatchError() {}

   render() {
     return (
       <View className="${dirName}-page">
         ${dirName}
       </View>
     )
   }
 }
 `;

const configTep = `
 export default {
  navigationBarTitleText: '${dirName}',
  backgroundTextStyle: "light",
  navigationBarBackgroundColor: "#fff",
  navigationBarTextStyle: "black"
}`;

// scss文件模版
const lessTep = `

 .${dirName}-page {
 }
 `;

// model文件模版
const modelTep = `import * as ${dirName}Api from './service';

 export default {
   namespace: '${dirName}',
   state: {

   },

   effects: {
     * effectsDemo(_, { call, put }) {
       const { status, data } = yield call(${dirName}Api.demo, {});
       if (status === 'ok') {
         yield put({ type: 'save',
           payload: {
             topData: data,
           } });
       }
     },
   },

   reducers: {
     save(state, { payload }) {
       return { ...state, ...payload };
     },
   },

 };
 `;

// service页面模版
const serviceTep = `import httpRequest from '../../../utils/http';

 export const demo = (data) => {
   return httpRequest.get("",data);
 };
 `;

fs.mkdirSync(`./src/pages/${dirName}`); // mkdir $1
process.chdir(`./src/pages/${dirName}`); // cd $1

fs.writeFileSync("index.js", indexTep);
fs.writeFileSync("index.config.js", configTep);
fs.writeFileSync("index.less", lessTep);
fs.writeFileSync("model.js", modelTep);
fs.writeFileSync("service.js", serviceTep);

console.log(`模版${dirName}已创建,请手动增加models`);

function titleCase(str) {
  const array = str.toLowerCase().split(" ");
  for (let i = 0; i < array.length; i++) {
    array[i] =
      array[i][0].toUpperCase() + array[i].substring(1, array[i].length);
  }
  const string = array.join(" ");
  return string;
}

process.exit(0);
