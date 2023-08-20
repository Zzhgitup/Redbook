import React, {FC, useState} from 'react';
import {View, StyleSheet, Image, Text, Button} from 'react-native';
import {
  icon_logo_main,
  icon_selected,
  icon_unselected,
} from '../../asset/date/image';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Linking} from 'react-native';
interface Props {
  name?: string;
}
const Login: FC<Props> = () => {
  const [loginstate, setState] = useState<'quick' | 'common'>('quick');
  const [select, setselect] = useState<boolean>(false);
  const quickcomponent = () => {
    const styles = StyleSheet.create({
      root: {
        width: '100%',
        flexDirection: 'column-reverse',
        paddingHorizontal: 40,
        alignItems: 'center',
        flex: 1,
      },
      protoco: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: 'white',
      },
      selectbt: {
        width: 40,
        height: 40,
      },
      selectimg: {
        transform: [{scale: 0.5}, {translateY: -20}],
        width: 40,
        height: 40,
        resizeMode: 'contain',
      },
      textstype: {
        position: 'relative',
        flex: 1,
        fontSize: 12,
      },
      blodtext: {
        fontWeight: 'bold',
        color: '#1f2f64',
      },
      gowiset: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'red',
        width: 50,
        height: 50,
      },
      otherlogin: {
        width: '100%',
        height: 20,
        marginBottom: 90,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#1f2f64',
      },
      login: {
        width: '100%',
        height: 100,
        marginBottom: 20,
      },
      wechat: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        backgroundColor: 'rgb(5,193,96)',
        borderRadius: 25,
        color: 'white',
        justifyContent: 'center',
      },
      text: {
        color: 'white',
        fontSize: 16,
      },
      quicklogin: {
        backgroundColor: 'rgb(255,36,66)',
        marginBottom: 10,
      },
    });
    return (
      <View style={styles.root}>
        <View style={styles.protoco}>
          <TouchableOpacity
            style={styles.selectbt}
            onPress={() => {
              setselect(!select);
            }}>
            <Image
              style={styles.selectimg}
              source={select ? icon_unselected : icon_selected}
            />
          </TouchableOpacity>
          {/* 条款内容 */}
          <Text
            style={styles.textstype}
            onPress={() => {
              Linking.openURL('https://www.zhaozihao.love/');
            }}>
            我已阅读并同意
            <Text style={styles.blodtext}>
              《用户协议》《隐私协议》《儿童、青少年个人信息保护规则》《中国移动认证服务条款》
            </Text>
          </Text>
        </View>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.otherlogin}>其他登录方式 {' >'}</Text>
        </TouchableOpacity>
        <View style={styles.login}>
          <TouchableOpacity
            style={[styles.wechat, styles.quicklogin]}
            activeOpacity={0.7}>
            <Text style={styles.text}>一键登录</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.wechat} activeOpacity={0.7}>
            <Text style={styles.text}>微信登录</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const commonlogin = () => {
    const styles = StyleSheet.create({
      root: {
        width: '100%',
        height: 200,
      },
    });
    return (
      <View>
        <Text>普通登录</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {loginstate === 'quick' ? (
        <Image style={styles.logoimg} source={icon_logo_main} />
      ) : null}
      {loginstate === 'quick' ? quickcomponent() : commonlogin()}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
  },
  logoimg: {
    width: 200,
    marginTop: 100,
    height: 100,
    resizeMode: 'contain',
  },
});
export default Login;
