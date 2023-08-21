import React, {FC, useEffect} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {icon_logo_main} from '../../asset/date/image';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
interface Props {
  name?: string;
}
const Welcome: FC<Props> = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
  }, [navigation]);
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
