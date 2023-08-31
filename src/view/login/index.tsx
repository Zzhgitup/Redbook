import React, {FC, useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, Image, Text, ToastAndroid} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Linking} from 'react-native';
import {
  icon_close_modal,
  icon_exchange,
  icon_eye_close,
  icon_eye_open,
  icon_logo_main,
  icon_qq,
  icon_selected,
  icon_triangle,
  icon_unselected,
  wechat,
} from '../../asset/date/image';
import {Handerphone, backHander} from '../../utils/Phonehandler';
import {getgoods} from '../../server/modules/Goods';
import {login} from '../../server/modules/user';
import UserStore from '../../store/UserStore';
import Toast from '../../components/widget/Toast';
interface Props {
  name?: string;
}
const Login: FC<Props> = () => {
  const navigaytion = useNavigation<StackNavigationProp<any>>();
  const [loginstate, setState] = useState<'quick' | 'common'>('quick');
  const [passwordshow, seteary] = useState(true);
  const [telphone, setphone] = useState('');
  const [password, setPassword] = useState('');
  const [select, setselect] = useState<boolean>(false);

  const protiext = () => {
    const styles = StyleSheet.create({
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
    });
    return (
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
    );
  };
  const quickcomponent = () => {
    const styles = StyleSheet.create({
      root: {
        width: '100%',
        flexDirection: 'column-reverse',
        paddingHorizontal: 40,
        alignItems: 'center',
        flex: 1,
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
        flexDirection: 'row',
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
      wechatimg: {
        height: 40,
        width: 40,
      },
    });
    return (
      <View style={styles.root}>
        {protiext()}
        <TouchableOpacity
          onPress={() => {
            loginstate === 'quick' ? setState('common') : setState('quick');
          }}>
          <Text style={styles.otherlogin}>其他登录方式 {' >'}</Text>
        </TouchableOpacity>
        <View style={styles.login}>
          <TouchableOpacity
            style={[styles.wechat, styles.quicklogin]}
            activeOpacity={0.7}>
            <Text style={styles.text}>一键登录</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.wechat} activeOpacity={0.7}>
            <Image style={styles.wechatimg} source={wechat} />
            <Text style={styles.text}>微信登录</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const canlogin = useCallback((): boolean => {
    const length = backHander(telphone).length;
    const passlen = password.length;
    if (length === 11 && passlen !== 0 && passlen <= 16) return true;
    return false;
  }, [password, telphone]);
  const commonlogin = () => {
    const styles = StyleSheet.create({
      viewclose: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 56,
        marginBottom: 20,
      },
      buttonclose: {
        width: 30,
        height: 30,
      },
      root: {
        width: '100%',
        height: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 20,
      },
      textpassword: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 5,
      },
      desc: {
        color: 'rgb(178, 178, 178)',
      },
      inputview: {
        width: '100%',
        height: 'auto',
        paddingHorizontal: 56,
        flexDirection: 'column',
        marginTop: 20,
      },
      inputacount: {
        width: '100%',
        height: 46,
        borderBottomWidth: 1,
        borderColor: 'rgb(216, 216, 216)',
        flexDirection: 'row',
      },
      inputacount2: {
        width: '100%',
        height: 46,
        marginTop: 15,
        borderBottomWidth: 1,
        borderColor: 'rgb(216, 216, 216)',
        flexDirection: 'row-reverse',
        justifyContent: 'flex-end',
      },
      acountheader: {
        fontSize: 24,
      },
      acountheader1: {
        width: 'auto',
        height: 46,
        flexDirection: 'column',
        justifyContent: 'center',
      },
      acountheaderimg: {
        height: 46,
        resizeMode: 'contain',
        transform: [{scale: 0.6}],
      },
      acountheaderimg2: {
        height: 46,
        width: 46,
        resizeMode: 'contain',
        transform: [{scale: 0.6}],
      },
      acountinput: {
        fontSize: 20,
        paddingLeft: 10,
        height: 46,
      },
      passwordshowbox: {
        width: 46,
        height: 46,
      },
      options: {
        width: '100%',
        height: 20,
        marginTop: 25,
        paddingHorizontal: 56,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      optionimg: {
        height: 20,
        width: 40,
        resizeMode: 'cover',
        transform: [{scale: 0.5}, {translateX: -5}],
      },
      loginbt: {
        width: '100%',
        height: 56,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(255,36,66)',
      },
      bt: {
        marginTop: 24,
        width: '100%',
        height: 'auto',
        paddingHorizontal: 56,
      },
      textlogin: {
        fontSize: 22,
        color: 'white',
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
      quicklogin: {
        width: '100%',
        height: 300,
        paddingHorizontal: 56,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      },
      unsatisfied: {
        backgroundColor: '#b7b7b7',
      },
    });
    return (
      <View style={styles.root}>
        <View style={styles.viewclose}>
          <TouchableOpacity
            onPress={() => {
              loginstate === 'common' ? setState('quick') : setState('common');
            }}>
            <Image style={styles.buttonclose} source={icon_close_modal} />
          </TouchableOpacity>
        </View>
        <Text style={styles.textpassword}>密码登录</Text>
        <Text style={styles.desc}>未注册的手机号登陆成功后将自动生成</Text>
        <View style={styles.inputview}>
          <View style={styles.inputacount}>
            <TouchableOpacity style={styles.acountheader1}>
              <Text style={styles.acountheader}>+86</Text>
            </TouchableOpacity>
            <Image style={styles.acountheaderimg} source={icon_triangle} />
            <TextInput
              value={telphone}
              maxLength={13}
              // eslint-disable-next-line @typescript-eslint/no-shadow
              onChangeText={(telphone: string) =>
                setphone(Handerphone(telphone))
              }
              keyboardType="number-pad"
              placeholder="请输入手机号"
              style={styles.acountinput}
            />
          </View>
          <View style={styles.inputacount2}>
            <TouchableOpacity
              onPress={() => {
                seteary(!passwordshow);
              }}
              style={styles.passwordshowbox}>
              <Image
                style={styles.acountheaderimg2}
                source={passwordshow ? icon_eye_close : icon_eye_open}
              />
            </TouchableOpacity>
            <TextInput
              keyboardType="default"
              secureTextEntry={passwordshow}
              value={password}
              onChangeText={value => setPassword(value)}
              placeholder="请输入密码"
              style={[styles.acountinput, {width: '80%', paddingLeft: 0}]}
            />
          </View>
        </View>
        <View style={styles.options}>
          <TouchableOpacity style={{flexDirection: 'row'}}>
            <Image style={styles.optionimg} source={icon_exchange} />
            <Text>验证码登录</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>忘记密码?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bt}>
          <TouchableOpacity
            activeOpacity={canlogin() ? 0.7 : 1}
            style={[styles.loginbt, canlogin() ? null : styles.unsatisfied]}
            onPress={() => {
              if (!canlogin()) {
                Toast.show('请填写对应信息', 1000);
              } else {
                console.log(backHander(telphone), password);
                UserStore.login(backHander(telphone), password, res => {
                  if (res) {
                    navigaytion.push('Home');
                  } else {
                    Toast.show('登录失败', 1000);
                  }
                });
              }
            }}>
            <Text style={[styles.textlogin]}>登录</Text>
          </TouchableOpacity>
        </View>
        <View style={{paddingHorizontal: 40, paddingTop: 20}}>
          {protiext()}
        </View>
        <View style={styles.quicklogin}>
          <TouchableOpacity>
            <Image style={{width: 50, height: 50}} source={wechat} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={{width: 50, height: 50}} source={icon_qq} />
          </TouchableOpacity>
        </View>
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
