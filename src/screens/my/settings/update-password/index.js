import React, { Component } from "react";
import { View } from "react-native";
import { Button, ListItem } from "react-native-elements";
import Theme from "../../../../styles/theme";
import commonStyles from "../../../../styles/commonStyles";
import Toast from "../../../../components/toast";
import userAction from "../../../../actions/user";

/**
 * Created by supervons on 2019/09/06.
 * 修改密码页面
 * update password page
 */
export default class UpdatePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      saveButtonShow: false,
    };
  }

  getUserInfo() {
    const userInfoJson = [
      {
        key: "oldPassword",
        title: "原密码",
        placeholder: "输入原密码",
        rightTitle: this.state.userInfo.oldPassword,
        editable: false,
      },
      {
        key: "newPassword",
        title: "新密码",
        placeholder: "输入新密码",
        rightTitle: this.state.userInfo.newPassword,
        editable: true,
      },
      {
        key: "confirmPassword",
        title: "确认密码",
        placeholder: "再次输入新密码",
        rightTitle: this.state.userInfo.confirmPassword,
        editable: false,
      },
    ];
    return userInfoJson;
  }

  updatePassword() {
    if (
      !this.state.userInfo.oldPassword ||
      !this.state.userInfo.newPassword ||
      !this.state.userInfo.confirmPassword
    ) {
      Toast.showToast("请输入原密码和新密码!");
    } else {
      if (
        this.state.userInfo.newPassword !== this.state.userInfo.confirmPassword
      ) {
        Toast.showToast("两次输入新密码不一致!");
      } else {
        if (
          this.state.userInfo.oldPassword === this.state.userInfo.newPassword
        ) {
          Toast.showToast("请输入不同的新密码噢!");
        } else {
          this.state.userInfo.loginId = userInfo.loginId;
          userAction.updatePassword(this.state.userInfo).then((resp) => {
            Toast.showToast(resp.msg);
            this.props.navigation.pop(2);
          });
        }
      }
    }
  }

  render() {
    const userInfo = this.getUserInfo();
    return (
      <View style={{ flex: 1, backgroundColor: Theme.commonBackColor }}>
        {userInfo.map((item, i) => (
          <ListItem bottomDivider key={i}>
            <ListItem.Content
              key={i}
              containerStyle={commonStyles.itemPadding}
              bottomDivider={true}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <ListItem.Title>{item.title}</ListItem.Title>
              </View>
              <ListItem.Input
                onChangeText={(text) =>
                  this.setState({
                    userInfo: { ...this.state.userInfo, [item.key]: text },
                  })
                }
                placeholder={item.placeholder}
                secureTextEntry={true}
                value={this.state.userInfo[item.key]}
                input={{
                  inputStyle: {
                    paddingTop: 0,
                    alignItems: "center",
                    fontSize: 15,
                  },
                }}
              />
            </ListItem.Content>
          </ListItem>
        ))}
        <Button
          icon={{
            name: "done",
            color: "white",
          }}
          buttonStyle={{
            marginTop: 15,
          }}
          title="确认"
          onPress={() => this.updatePassword()}
        />
      </View>
    );
  }
}
