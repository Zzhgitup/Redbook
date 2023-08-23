import React, {FC, useRef, useState} from 'react';
import {View, Text, StyleSheet, Image, Animated} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {icon_heart, icon_heart_empty} from '../../../../../asset/date/image';
interface Props {
  name?: string;
  defaultfoucus: boolean;
  size?: number;
}
const Headr: FC<Props> = ({defaultfoucus, size = 20}) => {
  const animtedwidth = useRef(new Animated.Value(0)).current;
  const [heartstate, setheart] = useState(defaultfoucus);
  const opatial = useRef(new Animated.Value(1)).current;
  const pointheadr = () => {
    setheart(!heartstate);
    if (heartstate) {
      animtedwidth.setValue(0);
      opatial.setValue(1);
    } else {
      const port1 = Animated.timing(animtedwidth, {
        toValue: 1.5,
        duration: 300,
        useNativeDriver: false,
      });
      const port2 = Animated.timing(opatial, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      });
      Animated.parallel([port1, port2]).start();
    }

    //TODU
  };
  return (
    <View
      style={{
        position: 'relative',
        width: 20,
        height: 20,
        marginRight: 5,
      }}>
      <TouchableOpacity onPress={pointheadr}>
        <Image
          source={heartstate ? icon_heart : icon_heart_empty}
          style={[styles.viewimg, {width: size, height: size}]}
        />
      </TouchableOpacity>
      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          zIndex: -1,
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: size / 20,
          borderColor: '#ff2442',
          transform: [{scale: animtedwidth}],
          opacity: opatial,
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  viewimg: {
    marginRight: 5,
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
export default Headr;
