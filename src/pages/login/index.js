import React, { Component } from "react";
import Taro from '@tarojs/taro'
import { View, Text,Button } from "@tarojs/components";
import "./index.less";
import { connect } from "react-redux";
import { AtButton } from "taro-ui";

@connect(({ login, index }) => ({
  login,index
}))
export default class Login extends Component {

  componentDidMount() {
    console.log(this.props)
  }

  goMain = () => {
    Taro.redirectTo({url:'/pages/index/index?a=1&b=2&c=3'})
  }

  render() {
    return (
      <View className="login-page">
        登录页面
        <Button className="loginBtn" onClick={this.goMain}>登录</Button>
      </View>
    );
  }
}
