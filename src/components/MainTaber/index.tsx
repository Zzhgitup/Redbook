import React, {FC, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {icon_daily, icon_search} from '../../asset/date/image';
import {TouchableOpacity} from 'react-native-gesture-handler';
interface Props {
  name?: string;
}
const MaintaBar: FC<Props> = () => {
  const [Barselect, Setselect] = useState('关注');
  const onChange = (val: string) => {
    if (Barselect === val) return;
    Setselect(val);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image style={styles.barimg} source={icon_daily} />
      </TouchableOpacity>
      <View style={styles.barmiddle}>
        <View style={styles.barmiddleBT}>
          <TouchableOpacity
            onPress={() => {
              onChange('关注');
            }}>
            <Text
              style={[
                styles.text,
                Barselect === '关注' ? styles.textactive : null,
              ]}>
              关注
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.barmiddleBT}>
          <TouchableOpacity
            onPress={() => {
              onChange('发现');
            }}>
            <Text
              style={[
                styles.text,
                Barselect === '发现' ? styles.textactive : null,
              ]}>
              发现
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.barmiddleBT}>
          <TouchableOpacity
            onPress={() => {
              onChange('河南');
            }}>
            <Text
              style={[
                styles.text,
                Barselect === '河南' ? styles.textactive : null,
              ]}>
              河南
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity>
        <Image style={styles.barimg} source={icon_search} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    height: 50,
  },
  barimg: {
    height: 50,
    transform: [{scale: 0.7}],
    resizeMode: 'contain',
  },
  barmiddle: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  barmiddleBT: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginLeft: 5,
    flex: 1,
  },
  text: {
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 5,
  },
  textactive: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 5,
    borderBottomColor: 'red',
    paddingBottom: 5,
    borderBottomWidth: 2,
  },
});
export default MaintaBar;
