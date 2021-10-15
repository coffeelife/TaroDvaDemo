import React, { Component } from "react";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { View, Text, OpenData, Button, Textarea } from "@tarojs/components";
import { connect } from "react-redux";
import "./index.less";

@connect(({ index }) => ({
  index
}))
export default class Index extends Component {
  state = {
    userInfo: {},
    hasUserInfo: false
  };

  componentDidMount = () => {
    Taro.hideHomeButton();
    let { router } = getCurrentInstance();
    let { a, b, c } = router.params;
    console.log(router, a, b, c);
  };

  getUserProfile = () => {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    Taro.getUserProfile({
      desc: "用于完善会员资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: res => {
        this.setState(
          {
            userInfo: res.userInfo,
            hasUserInfo: true
          },
          () => {
            Taro.showModal({
              title: "用户信息",
              content: JSON.stringify(res.userInfo),
              showCancel: false,
              confirmText: "确定"
            });
          }
        );
      }
    });
  };

  render() {
    let { hasUserInfo, userInfo } = this.state;
    return (
      <View className="index-page">
        <View className="userInfo">
          <OpenData className="userAvatar" type="userAvatarUrl" />
          <View className="userDetail">
            <OpenData type="userNickName" lang="zh_CN" />
            <View>
              <OpenData type="userGender" lang="zh_CN" />{" "}
              <OpenData type="userCountry" lang="zh_CN" />{" "}
              <OpenData type="userProvince" lang="zh_CN" />{" "}
              <OpenData type="userCity" lang="zh_CN" />
            </View>
          </View>
        </View>
        <Button className="userBtn" onClick={this.getUserProfile}>
          获取用户信息
        </Button>
      </View>
    );
  }
}
