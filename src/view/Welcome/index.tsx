/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useEffect} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {icon_logo_main} from '../../asset/date/image';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {load} from '../../utils/Storage';
interface Props {
  name?: string;
}
const Welcome: FC<Props> = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const loaduserinfo = async () => {
    const res = await load('userinfo');
    if (res && JSON.parse(res)) {
      console.log(JSON.parse(res));
      navigation.replace('Home');
    } else {
      navigation.replace('Login');
    }
  };
  useEffect(() => {
    setTimeout(() => {
      loaduserinfo();
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.logoimg} source={icon_logo_main} />
      <Text style={styles.name}>欢迎尊贵的无上至尊！</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    height: '100%',
  },
  name: {
    fontSize: 24,
    marginTop: 200,
  },
  logoimg: {
    width: 200,
    marginTop: 200,
    height: 110,
    resizeMode: 'contain',
  },
});
export default Welcome;
